const flat = require('flat')

const data = {
  en: {
    path: 'en',
    locale: 'English (United Kingdom)',
    default: true
  },
  fr: {
    path: 'fr',
    locale: 'French (Baguette)'
  }
}

Object.keys(data).forEach((key) => {
  data[key].data = flat(require(`./${key}.json`))
})

module.exports = data;
