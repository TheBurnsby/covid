export default function (title, cases, dates, colors) {
    var datasets = [];
    var colors = colors ? colors : ['#153aff', '#ffda15', '#ff153e'];

    for (var variable in cases) {

        var dataset = {
            name: "Total " + variable, type: "line",
            values: cases[variable]
        }

        datasets.push(dataset);
    }

    var graphData = {
        labels: dates,
        datasets
    };

    return new frappe.Chart("#graph", {
        title,
        colors,
        data: graphData,
        type: 'line',
        height: 500,
        lineOptions: {
            hideDots: true,
            // heatline: true,
            regionFill: true
        },
        axisOptions: {
            xIsSeries: 1,
            xAxisMode: 'tick'
        },
    });
}
