export default `

    <div class="row">
        <div class="col-xs">
            <h1>Total in USA</h1>
            <a href="/countries">All Countries</a>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-6">
            <div class="row card">
                <div class="title blue-bg">
                    <div class="col-xs-12">
                        <h3>USA</h3>
                        <span>Country</span>
                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <div class="col-xs">
                            <h3>{{usCurrent.positive}}</h3>
                            <span>cases</span>
                        </div>
                        <div class="col-xs">
                            <h3>{{usCurrent.death}}</h3>
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
                            <h4>{{usCurrent.total}}</h4>
                            <span>total</span>
                        </div>
                        <div class="col-xs">
                            <h4>{{usCurrent.negative}}</h4>
                            <span>negative</span>
                        </div>
                        <div class="col-xs">
                            <h4>{{usCurrent.pending}}</h4>
                            <span>pending</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xs-12 col-md-6">
            <div id="graph" stye="width: 100%;"></div>
        </div>
    </div>


    <div class="row">
        <div class="col-xs">
            <h1>Totals by State</h1>
            <p>Updates daily at 4p ET</p>
        </div>
    </div>
    <div class="row" o-each-state="states">
        <div class="col-xs-12 col-sm-6">
            <div class="row card">
                <div class="title red-bg center-xs">
                    <div class="col-xs-12">
                        <h3>{{$state.state}}</h3>
                        <span>State</span>
                    </div>
                </div>
                <div class="content">
                    <div class="row center-xs">
                        <div class="col-xs">
                            <h3>{{$state.positive}}</h3>
                            <span>cases</span>
                        </div>
                        <div class="col-xs">
                            <h3>{{$state.death}}</h3>
                            <span>deaths</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs">
                            <h3>Testing Results</h3>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs">
                            <h4>{{$state.total}}</h4>
                            <span>total</span>
                        </div>
                        <div class="col-xs">
                            <h4>{{$state.negative}}</h4>
                            <span>negative</span>
                        </div>
                        <div class="col-xs">
                            <h4>{{$state.pending}}</h4>
                            <span>pending</span>
                        </div>
                    </div>
                    <div class="update">
                        last update: <em>{{$state.lastUpdateEt}}</em>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <h3>Source</h3>
        <button type="button" class="button" o-on-click="sources">See Sources</button>
    </div>
    <div class="row">
        <p><a href="https://covidtracking.com/">COVID Tracking Project</a></p>
    </div>

    <div class="row">
        <div class="col-xs">
            <ul class="sources"></ul>
        </div>
    </div>
`
