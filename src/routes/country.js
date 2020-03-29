import Graph from '../modules/graph.js';
import template from '../templates/country.js';
import countries from '../assets/countries.js';

const model = {
    countryByDay: [],
    country: {},
    increase: 0,
    start: '',
    end: '',
}

const attached = function () {
    const model = this.model;

    let country = Oxe.router.location.query.country;
    if (country.includes('%20')) country = country.replace(/%20/g, ' ');

    const countryByDay = countries.filter(function (location) { return location.location === country });

    model.country = countryByDay[countryByDay.length -1];
    model.start = countryByDay[countryByDay.length - 2].date.slice(5);
    model.end = countryByDay[countryByDay.length - 1].date.slice(5);

    model.countryByDay = countryByDay;

    const options = {
        dates: [],
        title: model.country.location + ' Daily Cases Vs Deaths',
        colors: ['#153aff','#31b843','#ff153e'],
        datasets: [ { name: 'Total Cases', chartType: 'line', values: [] }, { name: 'Daily New Cases', chartType: 'bar', values: [] }, { name: 'Total Deaths', chartType: 'line', values: [] } ],
    };

    for (var day of model.countryByDay) {
        day.date = day.date.slice(5);
        options.dates.push(day.date);

        options.datasets[0].values.push(day.total_cases);
        options.datasets[1].values.push(day.new_cases);
        options.datasets[2].values.push(day.total_deaths);
    }

    Graph(options);
}

export default {
    title: 'Dashboard - Country',
    name: 'r-country',
    attached, template, model,
    methods: {}
};
