const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('Discord_Fork JSON Data', () => {
  describe('Bots', () => {
    it('all.json should be valid JSON', () => {
      const json = fs.readFileSync(path.join('_site', 'api', 'bots', 'all.json'));
      JSON.parse(json);
    });
  });
  describe('Servers', () => {
    it('all.json should be valid JSON', () => {
      const json = fs.readFileSync(path.join('_site', 'api', 'servers', 'all.json'));
      JSON.parse(json);
    });
  });
  describe('Footer Messages', () => {
    const json = fs.readFileSync(path.join('_site', 'assets', 'json', 'random.json'));
    let parsed;
    it('random.json should be valid JSON', () => {
      parsed = JSON.parse(json);
    });
    it('random.json should be an array of strings', () => {
      assert.equal(parsed.every(string => typeof string === 'string'), true)
    });
  });
});
