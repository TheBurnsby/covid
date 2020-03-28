export default `
<div class="row">
    <div class="col-xs">
        <h1>Country Details</h1>
        <a class="button" href="./">All Countries</a>
    </div>
</div>

<div class="row">
    <div class="col-xs-12 col-sm-6">
        <div class="row card">
            <div class="title blue-bg">
                <div class="col-xs-12">
                    <h3>{{country.location}}</h3>
                    <span>State</span>
                </div>
            </div>
            <div class="content">
                <div class="row">
                    <div class="col-xs">
                        <h3>{{country.total_cases}}</h3>
                        <span>cases</span>
                    </div>
                    <div class="col-xs">
                        <h3 style="color: crimson">+ {{country.new_cases}}</h3>
                        <span>new cases</span>
                        <div class="range">({{start}} - {{end}})</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs">
                        <h3>{{country.total_deaths}}</h3>
                        <span>deaths</span>
                    </div>
                    <div class="col-xs">
                        <h3 style="color: crimson">+ {{country.new_deaths}}</h3>
                        <span>new deaths</span>
                        <div class="range">({{start}} - {{end}})</div>
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
`
