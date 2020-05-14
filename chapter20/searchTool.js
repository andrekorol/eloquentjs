const chalk = require('chalk');
const { stat, readdir, readFile } = require('fs').promises;

// define colors for the output based on the colors used by grep on
// Ubuntu's terminal
const filePathOut = chalk.rgb(117, 80, 123);
const colonOut = chalk.rgb(6, 152, 153);
const matchedExpOut = chalk.rgb(204, 0, 0).bold;

async function grep(entryPath, pattern, showPath) {
  const stats = await stat(entryPath);
  if (stats.isDirectory()) {
    const files = await readdir(entryPath);
    for (const file of files) {
      await grep(`${entryPath}/${file}`, pattern, showPath);
    }
  } else {
    const fileContents = await readFile(entryPath, 'utf-8');
    const lines = fileContents.split('\n');
    for (const line of lines) {
      const found = line.match(pattern);
      if (found !== null) {
        const outputStr = `${
          showPath ? filePathOut(entryPath) + colonOut(':') : ''
        }${line.replace(pattern, matchedExpOut(found[0]))}`;
        console.log(outputStr);
      }
    }
  }
}

async function grepFromArgv() {
  const regex = new RegExp(process.argv[2], 'g');
  const entries = process.argv.slice(3);

  for (const entry of entries) {
    await grep(entry, regex, entries.length > 1);
  }
}

grepFromArgv();
