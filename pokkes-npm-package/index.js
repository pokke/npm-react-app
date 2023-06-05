const fetch = require('node-fetch');
const _ = require('lodash');

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return _.chunk(data, 10);
    } catch (error) {
        console.error(error);
        return [];
    }
}

module.exports = fetchData;
