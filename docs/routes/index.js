import Graph from '../modules/graph.js';
import countries from '../assets/countries.js';
import template from '../templates/index.js';

let CurrentCountries;

const model = {
    search: '',
    world: {},
    countries: {},
    currentByCountry: []
}

const attached = function () {
    var location;

    var resultCurrent = [];
    var resultCountries = {};

    for (var country of countries) {
        if (location && location !== country.location) {
            if (country.location === 'World') {
                this.model.world = country;
                continue;
            };

            var data = countries.filter(function (each) { return each.location === location; });
            resultCurrent.push(data[data.length - 1]);

            resultCountries[location] = data;
        }

        location = country.location;
    }

    var world = countries.filter(function (each) { return each.location === "World"; });

    const options = {
        dates: [],
        title: 'Word Wide Cases',
        colors: ['#153aff','#ff153e'],
        datasets: [ { name: 'Total Cases', chartType: 'line', values: [] }, { name: 'Daily New Cases', chartType: 'bar', values: [] } ]
    };
    
    for (var day of world) {
        day.date = day.date.slice(5);
        options.dates.push(day.date);

        options.datasets[1].values.push(day.new_cases);
        options.datasets[0].values.push(day.total_cases);
    };

    Graph(options);

    CurrentCountries = resultCurrent;
    this.model.countries = resultCountries;
    this.model.currentByCountry = CurrentCountries;
}

const country = function (country) {
    Oxe.router.route('./country/' + '?country=' + country.location);
}

const search = function (data) {
    var search = data.target.value;

    var result = CurrentCountries.filter(function (country) {
        return country.location.toLowerCase().includes(search.toLowerCase());
    });

    this.model.currentByCountry = result;
}

export default {
    title: 'Dashboard',
    name: 'r-index',
    attached, template, model,
    methods: { search, country }
};
