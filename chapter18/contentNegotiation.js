const mediaTypes = [
  'text/plain',
  'text/html',
  'application/json',
  'application/rainbows+unicorns',
];

const resource = 'author';

for (const type of mediaTypes) {
  fetch(resource, { headers: { Accept: type } }).then(resp => {
    resp.text().then(text => {
      console.log(`Requested ${resource} as ${type}`);
      console.log(`Got:\n response status code: ${resp.status}`);
      console.log(`Response body: ${text}`);
    });
  });
}
