const request = require('request');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const invalidAvatar = fs.readFileSync(path.join(__dirname, '..', 'static', 'assets', 'images', 'logo', 'logo128.png'));
const invalidAvatarBuffer = Buffer.from(invalidAvatar);
const invalidAvatarBase64 = invalidAvatarBuffer.toString('base64');

const sizes = [
  1024,
  512,
  256,
  128,
  64
];

module.exports = (node, base64callback) => {
  const imageError = (size) => {
    fs.createReadStream(
      path.join(__dirname, '..', 'static', 'assets', 'images', 'logo', `logo${size}.png`)
    )
      .pipe(
        fs.createWriteStream(
          path.join(__dirname, '..', 'public', 'userassets', `${node.fields.filelink}-${size}.png`)
        )
      );
  };
  
  if (node.frontmatter.avatar) {
    const sharpreader = sharp();
  
    sizes.forEach((size) => {
      if (node.frontmatter.nsfw) {
        sharpreader
          .clone()
          .resize(size, size)
          .blur(5)
          .toFile(path.join(__dirname, '..', 'public', 'userassets', `${node.fields.permalink}-${size}.png`))
          .catch(() => {
            // If there is an error resizing a specific image, copy the default image for every size
            imageError(size);
          });
      } else {
        sharpreader
          .clone()
          .resize(size, size)
          .toFile(path.join(__dirname, '..', 'public', 'userassets', `${node.fields.permalink}-${size}.png`))
          .catch(() => {
            // If there is an error resizing a specific image, copy the default image for every size
            imageError(size);
          });
      }
    });

    if (typeof base64callback === 'function') {
      if (node.frontmatter.nsfw) {
        sharpreader
          .clone()
          .resize(128, 128)
          .blur(5)
          .png()
          .toBuffer()
          .then(data => {
            base64callback(`data:image/png;base64,${data.toString('base64')}`);
          })
          .catch(() => {
            base64callback(`data:image/png;base64,${invalidAvatarBase64}`);
          });
      } else {
        sharpreader
          .clone()
          .resize(128, 128)
          .png()
          .toBuffer()
          .then(data => {
            base64callback(`data:image/png;base64,${data.toString('base64')}`);
          })
          .catch(() => {
            base64callback(`data:image/png;base64,${invalidAvatarBase64}`);
          });
      }
    }
    
    request({
      url: node.frontmatter.avatar,
      encoding: null
    })
      .on('error', () => {
        // If there is an error requesting an image, copy the default image for every size
        sizes.forEach(size => imageError(size));
      })
      .pipe(sharpreader);
  } else {
    // If there is no avatar, copy the default image for every size
    sizes.forEach(size => imageError(size));
  }
  
};
