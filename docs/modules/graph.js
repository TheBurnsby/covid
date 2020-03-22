export default function (cases, dates) {
    var xresult = [];
    var yresult = [];

    for (var i = 0; i < dates.length; i++) {
        yresult.push(cases[i]);
        xresult.push(dates[i]);
    }

    var x = xresult;
    var y = yresult;

    var graph = document.getElementById('graph');
    var layout = {
        yaxis: { fixedrange: true },
        xaxis: { fixedrange: true },
        showlegend: false
    }

    var data = [{ x, y }];

    return Plotly.newPlot( graph, data, layout, {displayModeBar: false, editable: false, scrollZoom: false});
}
