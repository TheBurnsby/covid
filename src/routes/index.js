import template from '../templates/index.js';

const model = {
    increase: '',
    states: [],
    usDaily: [],
    usCurrent: {}
}

const attached = function () {
    var model = this.model;

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
