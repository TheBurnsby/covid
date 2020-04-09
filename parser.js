'use strict';

const Fs = require('fs');

// (async function(file, csv) {
(async function () {
    // const location = 'counties';
    const location = 'countries';
    // const file = './nytimes/covid-19-data/us-counties.csv';
    const file = './wod/covid-19-data/public/data/ecdc/full_data.csv';
    // const file = file;
    const results = [];

    const result = await Fs.promises.readFile(file, 'utf8');

    const rows = result.split('\n');
    let headers;

    rows.forEach((row, i) => {
        const items = row.split(',');

        const result = {};

        if (i === 0) {
            headers = items;
        } else {
            headers.forEach((header, i) => result[header] = items[i]);
            results.push(result);
        };

    });

    const stringified = 'export default ' + JSON.stringify(results);
    await Fs.promises.writeFile(`./src/assets/${location}.js`, stringified);

    // Fs.promises.writeFile(`./src/assets/${file}.js`, results)
}());
