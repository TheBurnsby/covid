export default `

    <div class="row">
        <div class="col-xs">
            <h1>Total in USA</h1>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-12 col-sm-6">
            <div class="row card middle-md center-xs">
                <div class="title blue-bg">
                    <div class="col-xs-12">
                        <h3>USA</h3>
                        <span>Country</span>
                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <div class="col-xs-12 col-sm">
                            <h3>{{usCurrent.positive}}</h3>
                            <span>positive</span>
                        </div>
                        <div class="col-xs-12 col-sm">
                            <h3>{{usCurrent.death}}</h3>
                            <span>deaths</span>
                        </div>
                        <div class="col-xs-12 col-sm">
                            <h3 style="color: crimson">+ {{increase}}</h3>
                            <span>daily</span>
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
        </div>
    </div>
    <div class="row" o-each-state="states">
        <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="row card middle-md center-xs">
                <div class="title red-bg">
                    <div class="col-xs-12">
                        <h3>{{$state.state}}</h3>
                        <span>State</span>
                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <div class="col-xs-12 col-sm">
                            <h3>{{$state.positive}}</h3>
                            <span>cases</span>
                        </div>
                        <div class="col-xs-12 col-sm">
                            <h3>{{$state.death}}</h3>
                            <span>deaths</span>
                        </div>
                    </div>
                    <div class="update">
                        last update: <em>{{$state.lastUpdateEt}}</em>
                    </div>
                </div>
            </div>
        </div>
    </div>
`
