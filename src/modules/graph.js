export default function (title, cases, dates) {
    var datasets = [];

    if (cases.total.length) {
        var dataset = {
            name: "Total Tests", type: "line",
            values: cases.total
        }

        datasets.push(dataset);
    }
    if (cases.negative.length) {
        var dataset = {
            name: "Total Negative", type: "line",
            values: cases.negative
        }

        datasets.push(dataset);
    }
    if (cases.cases.length) {
        var dataset = {
            name: "Total Cases", type: "line",
            values: cases.cases
        }

        datasets.push(dataset);
    }

    var graphData = {
        labels: dates,
        datasets
    };
    
    return new frappe.Chart("#graph", {
        title,
        data: graphData,
        type: 'line',
        height: 500,
        colors: ['#153aff', '#ffda15', '#ff153e'],
        lineOptions: {
            hideDots: true,
            heatline: true,
            regionFill: true
        },
        axisOptions: {
            xIsSeries: 1,
            xAxisMode: 'tick'
        },
    });
}
