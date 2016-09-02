const fs = require('fs');

const writeError = (output) => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth();
  const year = date.getYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const nowDate = `${month}/${day}/20${year-100} | ${hour}:${minutes}`;
  const errorBreak = '\n\n========================================\n\n'
  const output = `\nERROR @ ${nowDate}:\n${output}\n\n${errorBreak}\n\n`

  fs.readFile('error.log', 'utf-8', (err, data) => {
    if (err) { // file does not exist. create file and write.
      console.log('ejeje');
      fs.writeFile('error.log', output + errorBreak, (err) => {
        if (err) {
          console.log('Error creating error.log.');
          return;
        };
      });
    }

    else {
      // file exists. append new error info to file.
      fs.appendFile('error.log', output + errorBreak, (err) => {
        if (err) console.log('Error writing to file.');
      });
    };
  });
};

module.exports = writeError;
