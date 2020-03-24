import Graph from '../modules/graph.js';
import template from '../templates/state.js';

const model = {
    stateByDay: [],
    state: {},
    increase: 0,
    start: '',
    end: '',
    source: {},
    showSource: false
}

const attached = function () {
    var model = this.model;
    var state = Oxe.router.location.query.state;

    Promise.all([
        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/states/daily?state=' + state }).then(function (data) {
            data.body.reverse();
            var stateByDay = data.body;
            
            var dates = [];
            var cases = { total: [], negative: [], cases: [] };

            for (var stateDay of stateByDay) {
                if (!stateDay.death) stateDay.death = 0;
                if (!stateDay.total) stateDay.total = 0;
                if (!stateDay.pending) stateDay.pending = 0;
                if (!stateDay.negative) stateDay.negative = 0;
                if (!stateDay.hospitalized) stateDay.hospitalized = 'na';

                var year = stateDay.date.toString().slice(0,4);
                var month = stateDay.date.toString().slice(4, 6);
                var day = stateDay.date.toString().slice(6, 8);
                var date = year + '-' + month + '-' + day;

                dates.push(date);
                cases.total.push(stateDay.total);
                cases.cases.push(stateDay.positive);
                cases.negative.push(stateDay.negative);
            }

            model.state = stateByDay[stateByDay.length - 1];
            model.stateByDay = stateByDay;

            var title = model.state.state + ' Testing Results';
            Graph(title, cases, dates);

            var position = model.stateByDay.length;
            var last = model.stateByDay[position - 1];
            var secondLast = model.stateByDay[position - 2];

            model.increase = last.positive - secondLast.positive;

            model.start = secondLast.date.toString().slice(4, 6) + '-' + secondLast.date.toString().slice(6, 8);
            model.end = last.date.toString().slice(4, 6) + '-' + last.date.toString().slice(6, 8);
        }),

        Oxe.fetcher.get({ url: 'https://covidtracking.com/api/states/info?state=' + state }).then(function (data) {
            if (data.body.covid19Site) {
                model.source = data.body;
                model.showSource = true;
            }

        })

    ]);


}

export default {
    title: 'Dashboard - State',
    name: 'r-state',
    attached, template, model,
    methods: {}
};
