'use strict';

const Fs = require('fs');

// (async function(file, csv) {
(async function () {
    const [ ,,counties, countries ] = process.argv;
    const locations = [ counties, countries ];

    for (const location of locations) {
        const results = [];
        const result = await Fs.promises.readFile(location, 'utf8');

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

        const save = location.includes('nytimes') ? 'counties' : 'countries';

        const stringified = 'export default ' + JSON.stringify(results);
        await Fs.promises.writeFile(`./src/assets/${save}.js`, stringified);
    }

}());
