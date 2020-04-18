function asTabs(node) {
  const children = Array.from(node.children);
  const tabs = [];
  for (const childNode of children) {
    const button = document.createElement('button');
    button.textContent = childNode.getAttribute('data-tabname');
    node.insertBefore(button, children[0]);
    tabs.push({ childNode, button });
  }
  function changeTab(event) {
    const selectedTab = tabs.filter(tab => tab.button === event.target)[0];
    selectedTab.childNode.style.display = 'block';
    selectedTab.button.style.color = 'lightseagreen';

    const otherTabs = tabs.filter(tab => tab.button !== event.target);
    for (const tab of otherTabs) {
      tab.childNode.style.display = 'none';
      tab.button.style.color = 'black';
    }
  }
  for (const tab of tabs) {
    tab.button.addEventListener('click', changeTab);
  }

  function setInitialState() {
    tabs[0].button.style.color = 'lightseagreen';
    for (const tab of tabs.slice(1)) {
      tab.childNode.style.display = 'none';
    }
  }

  setInitialState();
}

asTabs(document.querySelector('tab-panel'));
