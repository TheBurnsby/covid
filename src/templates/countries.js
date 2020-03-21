export default `
<div class="row">
    <div class="col-xs">
        <h1>Total World</h1>
        <a href="./">View USA Numbers</a>
    </div>
</div>

<div class="row">
    <div class="col-xs-12 col-sm">
        <div class="row card">
            <div class="title blue-bg col-xs-12 col-sm-4">
                <div class="col-xs-12">
                    <h3>World Wide</h3>
                    <span>Country</span>
                </div>
            </div>
            <div class="content">
                <div class="row">
                    <div class="col-xs">
                        <h3>{{world.total_cases}}</h3>
                        <span>total cases</span>
                    </div>
                    <div class="col-xs">
                        <h3>{{world.total_deaths}}</h3>
                        <span>deaths</span>
                    </div>
                    <div class="col-xs">
                        <h3 style="color: crimson">+ {{world.new_cases}}</h3>
                        <span>new cases</span>
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
            <h1>Totals by Country</h1>
            <p>Updates daily at 12p PST</p>
        </div>
    </div>
    <div class="row" o-each-country="currentByCountry">

        <div class="col-xs-12 col-sm-6">
            <div class="row card">
                <div class="title red-bg center-xs col-xs-12 col-sm-4">
                    <!-- <div class="col-xs-12"> -->
                        <h3>{{$country.location}}</h3>
                        <span>State</span>
                    <!-- </div> -->
                </div>
                <div class="content col-xs">
                    <div class="row center-xs">
                        <div class="col-xs">
                            <h3>{{$country.total_cases}}</h3>
                            <span>total cases</span>
                        </div>
                        <div class="col-xs">
                            <h3 style="color: crimson">+ {{$country.new_cases}}</h3>
                            <span>new cases</span>
                        </div>
                        <div class="col-xs">
                            <h3>{{$country.total_deaths}}</h3>
                            <span>deaths</span>
                        </div>
                    </div>
                    <div class="update">
                        last update: <em>{{$country.date}}</em>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-xs">
            <h3>Source</h3>
            <p><a href="https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases">https://www.ecdc.europa.eu/en/geographical-distribution-2019-ncov-cases</a></p>
        </div>
    </div>
`
