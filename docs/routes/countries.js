import countries from '../assets/countries.js';
import template from '../templates/countries.js';

const model = {
    world: {},
    countries: {},
    currentByCountry: []
}

const attached = function () {
    var location;

    var resultCountries = {};
    var resultCurrent = [];

    for (var country of countries) {
        // location = country.location;
        if (location && location !== country.location) {
            if (country.location === 'World') {
                this.model.world = country;
                continue;
            };

            var data = countries.filter(function (each) {
                return each.location === location;
            });
            resultCurrent.push(data[data.length - 1]);

            resultCountries[location] = data;
        }

        location = country.location;
    }

    var xresult = [];
    var yresult = [];
    var world = countries.filter(function (each) {
        return each.location === "World";
    });
    // console.log(world);
    for (var day of world) {
        yresult.push(day.total_cases);
        xresult.push(day.date);
    }
    
    var x = xresult;
    var y = yresult;

    var graph = document.getElementById('graph');
    var layout = {
        yaxis: { fixedrange: true },
        xaxis: { fixedrange: true },
        showlegend: false
    }

    var data = [{ x, y }];

    Plotly.newPlot( graph, data, layout, {displayModeBar: false, editable: false, scrollZoom: false});

    this.model.countries = resultCountries;
    this.model.currentByCountry = resultCurrent;
    // console.log(resultCountries);
}

export default {
    title: 'Dashboard - Countries',
    name: 'r-countries',
    attached, template, model,
    methods: {}
};
