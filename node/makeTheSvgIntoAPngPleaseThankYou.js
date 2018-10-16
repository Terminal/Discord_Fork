const sharp = require('sharp');
const path = require('path');

module.exports = (node, svg) => {
  // Turn the input SVG into a PNG
  sharp(Buffer.from(svg))
    .png()
    .toFile(path.join(__dirname, '..', 'public', 'api', `${node.fields.filelink}.png`))
    .catch(() => {
      throw new Error(`Error in turning svg to bitmap bot card!: ${node.fields.filelink}`);
    });
};
