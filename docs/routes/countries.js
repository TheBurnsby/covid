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


}

const sources = function () {

}

export default {
    title: 'Dashboard',
    name: 'r-countries',
    attached, template, model,
    methods: { sources }
};
