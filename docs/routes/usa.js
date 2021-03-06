import Graph from '../modules/graph.js';
import template from '../templates/usa.js';
import Abbreviations from '../modules/abbreviations.js';

let States;

const model = {
    increase: '',
    start: '',
    end: '',
    states: [],
    usDaily: [],
    usCurrent: {},
    sources: {}
}

const attached = function () {
    var model = this.model;

    var x = [];
    var y = [];

    Promise.all([
        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/states' }).then(function (data) {

            for (var state of data.body) {
                const name = Abbreviations(state.state);
                state.name = name;

                if (!state.death) state.death = 0;
                if (!state.negative) state.negative = 0;
                state.total = state.negative + state.positive;
            }

            States = data.body;
            model.states = data.body;
        }),

        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/us/daily' }).then(function (data) {
            data.body.reverse();

            model.usDaily = data.body;

            const options = {
                dates: [],
                title: 'USA Testing Results',
                colors: ['#153aff','#ff153e', '#31b843'],
                datasets: [ { name: 'Total Tested', chartType: 'line', values: [] }, { name: 'Total Positive', chartType: 'line', values: [] }, { name: 'Total Negative', chartType: 'line', values: [] } ]
            };

            for (var day of data.body) {
                day.negative = day.negative ? day.negative : 0;
                options.datasets[1].values.push(day.positive);
                options.datasets[2].values.push(day.negative);
                options.datasets[0].values.push(day.positive + day.negative);

                var year = day.date.toString().slice(0,4);
                var month = day.date.toString().slice(4, 6);
                var day = day.date.toString().slice(6, 8);
                var date = year + '-' + month + '-' + day;

                options.dates.push(date);
            }
            // console.log(options);
            Graph(options);
        }),

        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/us' }).then(function (data) {
            var result = {};
            for (var current of data.body) result = data.body[0];

            model.usCurrent = result;
        })

    ]).then(function (data) {

        var position = model.usDaily.length;
        var last = model.usDaily[position - 1];
        var secondLast = model.usDaily[position - 2];

        model.increase = last.positive - secondLast.positive;

        model.start = secondLast.date.toString().slice(4, 6) + '-' + secondLast.date.toString().slice(6, 8);
        model.end = last.date.toString().slice(4, 6) + '-' + last.date.toString().slice(6, 8);

    });

}

const sources = function () {
    var model = this.model;
    Oxe.fetcher.get({ url: 'https://covidtracking.com/api/urls' }).then(function (data) {
        model.sources = data.body;

        var sources = document.querySelector('.sources');
        for (var source of data.body) {
            var anchor = document.createElement('a');
            var li = document.createElement('li');

            anchor.setAttribute('href', source.url);
            anchor.setAttribute('target', '_blank');
            anchor.innerText = source.url;
            //
            // var row = document.createElement('div');
            // row.setAttribute('class', 'row');

            li.appendChild(anchor);
            sources.appendChild(li);
        }
    });
}

const state = function (state) {
    Oxe.router.route('./state/' + '?state=' + state.state);
}

const search = function (data) {
    var search = data.target.value;

    var result = States.filter(function (state) {
        return state.name.toLowerCase().includes(search.toLowerCase());
    });

    this.model.states = result;
}

export default {
    title: 'Dashboard - USA',
    name: 'r-usa',
    attached, template, model,
    methods: { sources, state, search }
};
