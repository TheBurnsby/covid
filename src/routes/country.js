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

    const title = model.country.location + ' Daily Cases Vs Deaths';
    var colors = colors ? colors : ['#153aff','#ff153e','#31b843' ];

    const options = [ { name: 'Total Cases', tpye: 'line', values: [] }, { name: 'Total Deaths', tpye: 'line', values: [] }, { name: 'Daily New Cases', tpye: 'line', values: [] } ];
    const dates = [];

    for (var day of model.countryByDay) {
        day.date = day.date.slice(5);

        dates.push(day.date);
        options[0].values.push(day.total_cases);
        options[1].values.push(day.total_deaths);
        options[2].values.push(day.new_cases);
    }

    var graphData = { labels: dates, datasets: options };

    return new frappe.Chart("#graph", {
        title,
        colors,
        data: graphData,
        type: 'axis-mixed',
        height: 500,
        lineOptions: {
            hideDots: true,
            // heatline: true,
            regionFill: true
        },
        axisOptions: {
            xIsSeries: 1,
            xAxisMode: 'tick',
        },
    });

    // Graph(title, cases, dates, ['#153aff', '#ff153e']);
}

export default {
    title: 'Dashboard - Country',
    name: 'r-country',
    attached, template, model,
    methods: {}
};
