const request = require('request')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const sizes = [
  1024,
  512,
  256,
  128,
  64
]

module.exports = (node) => {
  const imageError = (size) => {
    fs.createReadStream(
      path.join(__dirname, '..', 'static', 'assets', 'images', 'logo', `logo${size}.png`)
    )
      .pipe(
        fs.createWriteStream(
          path.join(__dirname, '..', 'public', 'assets', node.fields.template, `${node.fields.filename}-${size}.png`)
        )
      )
  }
  
  if (node.frontmatter.avatar) {
    const sharpreader = sharp()
  
    sizes.forEach((size) => {
      sharpreader
        .clone()
        .resize(size, size)
        .toFile(path.join(__dirname, '..', 'public', 'assets', node.fields.template, `${node.fields.filename}-${size}.png`))
        .catch(() => {
          // If there is an error resizing a specific image, copy the default image for every size
          imageError(size)
        })
    })
    
    request({
      url: node.frontmatter.avatar,
      encoding: null
    })
      .on('error', () => {
        // If there is an error requesting an image, copy the default image for every size
        sizes.forEach(size => imageError(size))
      })
      .pipe(sharpreader)
  } else {
    // If there is no avatar, copy the default image for every size
    sizes.forEach(size => imageError(size))
  }
  
}