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

    const countryByDay = countries.filter(function (location) {
        return location.location === country;
    });
    model.country = countryByDay[countryByDay.length -1];
    model.start = countryByDay[countryByDay.length - 2].date.slice(5);
    model.end = countryByDay[countryByDay.length - 1].date.slice(5);

    model.countryByDay = countryByDay;

    var title = model.country.location + ' Daily Cases Vs Deaths';
    var cases = { cases: [], deaths: [] };
    const dates = [];

    for (var day of model.countryByDay) {
        day.date = day.date.slice(5);
        
        dates.push(day.date);
        cases.cases.push(day.total_cases);
        cases.deaths.push(day.total_deaths);
    }

    Graph(title, cases, dates, ['#153aff', '#ff153e']);
}

export default {
    title: 'Dashboard - Country',
    name: 'r-country',
    attached, template, model,
    methods: {}
};
