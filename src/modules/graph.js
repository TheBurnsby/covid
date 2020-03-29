export default function (data) {
    const options = data || {};
    // console.log(options);

    var graphData = {
        labels: options.dates,
        datasets: options.datasets
    };

    return new frappe.Chart("#graph", {
        title: options.title,
        colors: options.colors,
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
        barOptions: {
            spaceRatio: 0.2
        }
    });
}
