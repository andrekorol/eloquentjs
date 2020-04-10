function parseINI(string) {
  // Start with an object to hold the top-level fields
  const result = {};
  let section = result;
  string.split(/\r?\n/).forEach(line => {
    const matchSetting = line.match(/^(\w+)=(.*)$/);
    const matchSection = line.match(/^\[(.*)\]$/);
    if (matchSetting) {
      const settingName = matchSetting[1];
      const settingValue = matchSetting[2];
      section[settingName] = settingValue;
    } else if (matchSection) {
      const sectionName = matchSection[1];
      result[sectionName] = {};
      section = result[sectionName];
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error(`Line '${line}' is not valid.`);
    }
  });
  return result;
}

console.log(
  parseINI(`
name=Vasilis
[address]
city=Tessaloniki`)
);
// → {name: "Vasilis", address: {city: "Tessaloniki"}}

const fs = require('fs');

const configFile = './configuration.ini';

fs.readFile(configFile, 'utf-8', (err, data) => {
  if (err) throw err;
  console.log(parseINI(data));
});
