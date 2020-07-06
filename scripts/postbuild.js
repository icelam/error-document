const fs = require('fs');
const path = require('path');

console.log('Cleaning assets folder after build...');
fs.rmdir(path.resolve(__dirname, '../dist/assets'), { recursive: true }, (err) => {
  if (err) {
    throw err;
  }

  console.log('Assets folder removed.');
});
