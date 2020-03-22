import Graph from '../modules/graph.js';
import countries from '../assets/countries.js';
import template from '../templates/index.js';

const model = {
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
    var dates = [];
    var cases = [];

    for (var day of world) {
        dates.push(day.date);
        cases.push(day.total_cases);
    };

    Graph(cases, dates);

    this.model.countries = resultCountries;
    this.model.currentByCountry = resultCurrent;
}

export default {
    title: 'Dashboard - Countries',
    name: 'r-countries',
    attached, template, model,
    methods: {}
};
