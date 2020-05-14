const { toByteArray } = require('base64-js');
const yallist = require('yallist');
// const { parse, stringify } = require('flatted/cjs');

// Helper function to fill the document's textarea element with the
// content of the resource found at a given URL
function fillTextArea(filePath, textareaElement) {
  fetch(filePath)
    .then(res => res.text())
    .then(text => (textareaElement.value = text));
}

// Helper function to mark a given option as selected on the
// drop-down list of a select element, that also updates values of
// selected and previously selected files on the local storage
function selectOption(filePath, selectElement) {
  Array.from(selectElement.options).forEach(option => {
    if (option.textContent === filePath) {
      option.selected = true;
    } else {
      option.selected = false;
    }
  });
}

// Helper function to add a value to top of a given stack
function updateStack(value) {
  const selectedFiles = JSON.parse(localStorage.getItem('selectedFiles'));
  const selectedFilesStack = yallist(selectedFiles);
  selectedFilesStack.push(value);
  const newSelectedFiles = [];
  selectedFilesStack.forEach(file => newSelectedFiles.push(file));
  localStorage.setItem('selectedFiles', JSON.stringify(newSelectedFiles));
}

function lastSelectedFile() {
  const selectedFiles = JSON.parse(localStorage.getItem('selectedFiles'));
  const [lastSelected] = selectedFiles.slice(-1);
  return lastSelected;
}

// Helper function to remove all instances of a deleted file from a
// given stack
function removeOptions(filename) {
  const selectedFiles = JSON.parse(localStorage.getItem('selectedFiles'));
  const newSelectedFiles = selectedFiles.filter(value => value !== filename);
}

// Run this function when the document is loaded
window.onload = () => {
  const indexPathName = window.location.pathname;
  const { body } = document;

  // Add a div element to the document's body
  // The div element should fit in the viewport allowing space for
  // buttons on its bottom part
  const div = body.appendChild(document.createElement('div'));
  div.style.width = '100%';
  div.style.height = '75vh'; // allow space for buttons

  // Add a textarea element to the div
  // The user should interact with files' content through this textarea
  const textarea = div.appendChild(document.createElement('textarea'));
  textarea.style.height = '100%';
  textarea.style.width = '100%';

  // Make the textarea fill the whole wrapping div element
  // Property names vary on different browsers:

  // Safari/Chrome, other WebKit
  textarea.style['-webkit-box-sizing'] = 'border-box';
  // Firefox, other Gecko
  textarea.style['-moz-box-sizing'] = 'border-box';
  // Opera/IE 8+
  textarea.style['box-sizing'] = 'border-box';

  // Add a select element for choosing the file to be viewed/edited
  const select = div.appendChild(document.createElement('select'));
  // Listen for when a file is chosen from the drop-down list and then,
  // make its content fill the textarea element
  select.addEventListener('change', () => {
    const fileToDisplay = select.value;
    selectOption(fileToDisplay, select);
    fillTextArea(fileToDisplay, textarea);
    updateStack(fileToDisplay);
  });
  // Add options to the select element for resources found under the
  // document's top directory
  fetch('./', {
    method: 'GET',
  })
    .then(res => res.text())
    .then(result => {
      const files = result.split('\n');
      for (const file of files) {
        const option = select.appendChild(document.createElement('option'));
        option.textContent = file;
      }
      // Make the last chosen option (if any) show up as selected on
      // the drop-down list
      if (localStorage.getItem('selectedFiles') !== null) {
        const selectedValue = lastSelectedFile();
        selectOption(selectedValue, select);
      }
    });

  // Add a button for updating the content of the
  // currently selected file
  const updateButton = div.appendChild(document.createElement('button'));
  updateButton.textContent = 'Update file';
  // Listen for when the updateButton is clicked, and then send
  // a PUT request to update the currently selected file with the
  // content present on the textarea
  updateButton.addEventListener('click', event => {
    event.preventDefault();
    const currentFile = select.value;
    fetch(currentFile, {
      method: 'PUT',
      body: textarea.value,
    })
      .then(res => res.text())
      .then(result => {
        console.log('Success:', result);
        // Reload the window
        window.location.replace(indexPathName);
      })
      .catch(err => console.error('Error:', err));
  });

  // Hide a multiple file input button under a labeled button with text
  // different from the browser's default
  const loadFilesLabel = div.appendChild(document.createElement('label'));
  const loadFilesButton = loadFilesLabel.appendChild(
    document.createElement('button')
  );
  loadFilesButton.textContent = 'Add Local Files';
  const fileInput = loadFilesLabel.appendChild(document.createElement('input'));
  fileInput.type = 'file';
  fileInput.multiple = true;
  fileInput.style.display = 'none';
  // Listen for clicks on the ad hoc button, and then emit the click
  // event on the actual file input element
  loadFilesButton.addEventListener('click', event => {
    event.preventDefault();
    fileInput.click();
  });
  // Listen for local files being selected
  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      for (const file of Array.from(fileInput.files)) {
        // Create a file reader to read the file's content
        const reader = new FileReader();
        // eslint-disable-next-line no-loop-func
        reader.addEventListener('loadend', () => {
          // Remove the Data-URL declaration from the blob's result
          // and then decode the Base64 data string
          const base64Str = reader.result.replace(/data:.*;base64,/, '');
          const binaryData = toByteArray(base64Str);

          // Send a PUT request to the server with the filename and its
          // binary data
          fetch(file.name, {
            method: 'PUT',
            body: binaryData,
          })
            // Update selectedFilesStack
            .then(res => res.text())
            .then(result => {
              console.log('Success:', result);
              updateStack(file.name);
            })
            .catch(err => console.error('Error:', err));
        });
        // Read the file as a Data URL in order to extract and decode
        // its binary data
        reader.readAsDataURL(file);
      }
      // Reload the window
      window.location.replace(indexPathName);
    }
  });

  // Add a button for removing files from the server
  const removeButton = div.appendChild(document.createElement('button'));
  removeButton.textContent = 'Remove file';
  // Listen for when the removeButton is clicked, and then send
  // a DELETE request to remove the currently selected file from
  // the server
  removeButton.addEventListener('click', event => {
    event.preventDefault();
    const currentFile = select.value;
    fetch(currentFile, {
      method: 'DELETE',
    })
      .then(res => res.text())
      .then(result => {
        console.log('Success:', result);
        // Update selectedFilesStack
        localStorage.setItem(
          'selectedFile',
          localStorage.getItem('prevSelectedFile')
        );
        // Reload the window
        window.location.replace(indexPathName);
      })
      .catch(err => console.error('Error:', err));
  });

  if (localStorage.getItem('selectedFiles') === null) {
    console.log('null');
    const indexFile = indexPathName.split('/').pop();

    // Initialize a stack to control the order of selected files
    // and save it in the localStorage
    const selectedFiles = [indexFile];
    localStorage.setItem('selectedFiles', JSON.stringify(selectedFiles));

    // Set the initial textarea content and the respective selected
    // option from the drop-down file list
    selectOption(indexFile, select);
    fillTextArea(indexFile, textarea);
  } else {
    console.log('not null');
    const optionToDisplay = lastSelectedFile();
    selectOption(optionToDisplay, select);
    fillTextArea(optionToDisplay, textarea);
  }
};
