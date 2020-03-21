import template from '../templates/index.js';

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
    //
    // Oxe.fetcher.get({ url: 'https://covid.ourworldindata.org/data/ecdc/full_data.csv' }).then(function (data) {
    // });

    Promise.all([
        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/states' }).then(function (data) {
            for (var state of data.body) {
                if (!state.death) state.death = 0;
                if (!state.pending) state.pending = 0;
                if (!state.negative) state.negative = 0;
                if (!state.total) state.total = 0;
            }
            model.states = data.body;
        }),

        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/us/daily' }).then(function (data) {
            console.log(data);
            model.usDaily = data.body;

            var xresult = [];
            var yresult = [];

            for (var day of data.body) {
                yresult.push(day.positive);

                var year = day.date.toString().slice(0,4);
                var month = day.date.toString().slice(4, 6);
                var day = day.date.toString().slice(6, 8);
                var date = year + '-' + month + '-' + day;
                xresult.push(date);
            }

            x = xresult;
            y = yresult;

            var graph = document.getElementById('graph');
            var layout = {
                yaxis: { fixedrange: true },
                xaxis: { fixedrange: true },
                showlegend: false
            }

            var data = [{ x, y }];

            Plotly.newPlot( graph, data, layout, {displayModeBar: false, editable: false, scrollZoom: false});

        }),

        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/us' }).then(function (data) {

            var result = {};
            for (var current of data.body) result = data.body[0];

            model.usCurrent = result;
        }),
    ]).then(function () {

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

export default {
    title: 'Dashboard',
    name: 'r-index',
    attached, template, model,
    methods: { sources }
};
