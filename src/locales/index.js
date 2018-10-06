const flat = require('flat');

const data = {
  en: {
    path: 'en',
    locale: 'English (United Kingdom)',
    native: 'English (United Kingdom)',
    flag: 'twa-britain-british-cornwall-england-great-britain-ireland-northern-ireland-scotland-uk-union-jack-united-united-kingdom-wales-flag',
    default: true
  },
  fr: {
    path: 'fr',
    locale: 'French',
    native: 'Français',
    flag: 'twa-fr'
  },
  de: {
    path: 'de',
    locale: 'German',
    native: 'Deutsch',
    flag: 'twa-de'
  }
};

Object.keys(data).forEach((key) => {
  data[key].data = flat(require(`./${key}.json`));
});

module.exports = data;
