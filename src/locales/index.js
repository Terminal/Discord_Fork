const flat = require('flat');

const data = {
  en: {
    path: 'en',
    locale: 'English (United Kingdom)',
    flag: 'twa-britain-british-cornwall-england-great-britain-ireland-northern-ireland-scotland-uk-union-jack-united-united-kingdom-wales-flag',
    default: true
  },
  fr: {
    path: 'fr',
    locale: 'French (Baguette)',
    flag: 'twa-fr'
  }
};

Object.keys(data).forEach((key) => {
  data[key].data = flat(require(`./${key}.json`));
});

module.exports = data;
