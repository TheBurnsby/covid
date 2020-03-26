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
    var dates = [];
    var cases = [];

    for (var day of world) {
        day.date = day.date.slice(5);
        dates.push(day.date);
        cases.push(day.total_cases);
    };

    var graphData = {
        labels: dates,
        datasets: [
            {
                name: "Total Cases", type: "line",
                values: cases
            }
        ]
    };

    const chart = new frappe.Chart("#graph", {
        title: "Word Wide Cases",
        data: graphData,
        type: 'line',
        height: 500,
        colors: ['#ff153e'],
        lineOptions: {
            hideDots: true,
            heatline: true,
            regionFill: true
        },
        axisOptions: {
            xIsSeries: 1,
            xAxisMode: 'tick'
        },
    });

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
