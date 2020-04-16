const MOUNTAINS = [
  { name: 'Kilimanjaro', height: 5895, place: 'Tanzania' },
  { name: 'Everest', height: 8848, place: 'Nepal' },
  { name: 'Mount Fuji', height: 3776, place: 'Japan' },
  { name: 'Vaalserberg', height: 323, place: 'Netherlands' },
  { name: 'Denali', height: 6168, place: 'United States' },
  { name: 'Popocatepetl', height: 5465, place: 'Mexico' },
  { name: 'Mont Blanc', height: 4808, place: 'Italy/France' },
];

const table = {};
const properties = Array.from(Object.keys(MOUNTAINS[0]));
for (const property of properties) {
  table[property] = [];
}

for (const mountain of MOUNTAINS) {
  for (const property of properties) {
    table[property].push(mountain[property]);
  }
}

const mountains = document.getElementById('mountains');
const mountainsTable = mountains.appendChild(document.createElement('table'));

const headersRow = mountainsTable.appendChild(document.createElement('tr'));
for (const property of properties) {
  const headerCell = headersRow.appendChild(document.createElement('th'));
  headerCell.textContent = property;
}

const numMountains = MOUNTAINS.length;
for (let i = 0; i < numMountains; i++) {
  const mountainRow = mountainsTable.appendChild(document.createElement('tr'));
  for (const property of properties) {
    const value = table[property][i];
    const valueCell = mountainRow.appendChild(document.createElement('td'));
    valueCell.textContent = value;
  }
}
const numberValues = Array.from(document.getElementsByTagName('td')).filter(
  valueCell => !Number.isNaN(Number(valueCell.textContent))
);
for (const numberCell of numberValues) {
  numberCell.style.textAlign = 'right';
}
