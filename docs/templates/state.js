export default `
<div class="row">
    <div class="col-xs">
        <h1>State Details</h1>
        <a class="button" href="./usa">All States</a>
    </div>
</div>

<div class="row">
    <div class="col-xs-12 col-sm-9">
        <div class="row card">
            <div class="title blue-bg">
                <div class="col-xs-12">
                    <h3>{{state.state}}</h3>
                    <span>State</span>
                </div>
            </div>
            <div class="content">
                <div class="row">
                    <div class="col-xs">
                        <h3>{{state.positive}}</h3>
                        <span>cases</span>
                    </div>
                    <div class="col-xs">
                        <h3>{{state.hospitalized}}</h3>
                        <span>hospitalized</span>
                    </div>
                    <div class="col-xs">
                        <h3>{{state.death}}</h3>
                        <span>deaths</span>
                    </div>
                    <div class="col-xs">
                        <h3 style="color: crimson">+ {{increase}}</h3>
                        <span>new cases</span>
                        <div class="range">({{start}} - {{end}})</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs">
                        <h3>Testing Results</h3>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs">
                        <h4>{{state.total}}</h4>
                        <span>total</span>
                    </div>
                    <div class="col-xs">
                        <h4>{{state.negative}}</h4>
                        <span>negative</span>
                    </div>
                    <div class="col-xs">
                        <h4>{{state.pending}}</h4>
                        <span>pending</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-xs">
        <div id="graph" stye="width: 100%;"></div>
    </div>
</div>

<div class="row card" o-show="showSource">
    <div class="col-xs">
        <h3>Source</h3>
        <p><a o-href="source.covid19Site" target="_blank">{{source.covid19Site}}</a></p>
        <p>{{source.notes}}</p>
    </div>
</div>
`
