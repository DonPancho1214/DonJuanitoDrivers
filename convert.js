const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dir = path.join(__dirname, 'public');

fs.readdir(dir, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (file.endsWith('.png') || file.endsWith('.jpg')) {
      const input = path.join(dir, file);
      const output = path.join(dir, file.replace(/\.(png|jpg)$/, '.webp'));
      sharp(input)
        .webp({ quality: 80 })
        .toFile(output)
        .then(() => {
          console.log(`Converted ${file} to ${path.basename(output)}`);
          fs.unlinkSync(input); // remove old file
        })
        .catch(err => console.error(`Error converting ${file}:`, err));
    }
  });
});
