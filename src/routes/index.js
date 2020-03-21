import template from '../templates/index.js';

const model = {
    increase: '',
    states: [],
    usDaily: [],
    usCurrent: {}
}

const attached = function () {
    var model = this.model;

    var x = [];
    var y = [];

    Promise.all([
        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/states' }).then(function (data) {
            for (var state of data.body) {
                if (!state.death) {
                    state.death = 0;
                }
            }
            model.states = data.body;
        }),

        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/us/daily' }).then(function (data) {
            var position = data.body.length;

            var last = data.body[position - 1];
            var secondLast = data.body[position - 2];

            model.increase = last.positive - secondLast.positive;

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
            model.usDaily = data.body;
        }),

        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/us' }).then(function (data) {

            var result = {};
            for (var current of data.body) result = data.body[0];

            model.usCurrent = result;
        }),
    ]);

}

export default {
    title: 'Dashboard',
    name: 'r-index',
    attached, template, model,
    methods: {}
};
