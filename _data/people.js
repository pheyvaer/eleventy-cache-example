const useCache = require('../cache');

const data = [
  {
    name: 'Ash',
    location: 'Pallet Town'
  },
  {
    name: 'Misty',
    location: 'Cerulean City'
  },
  {
    name: 'Brock',
    location: 'Pewter City'
  }
];

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 10000);
  });
}

module.exports = async () => {
  return useCache(getData, 'people.json');
};
