var initialDatas = {"client_id": client_id, "isClientorSeller": "client"};

$.ajax({
    url: 'http://api.overcart.com/api/marketplace/salesfigure',
    type: 'POST',
    data: JSON.stringify(initialDatas),
    crossDomain: true,
    dataType: 'json',
    beforeSend: function () {
        //$('.graph-loader').show();
    },
    success: function (data) {
        $('#loader').fadeOut(2000);

        var today = parseInt(data.today[0].sum) ? parseInt(data.today[0].sum) : 0;
        var yesterday = parseInt(data.yesterday[0].sum) ? parseInt(data.yesterday[0].sum) : 0;
        var this_week = parseInt(data.this_week[0].sum) ? parseInt(data.this_week[0].sum) : 0;
        var this_month = parseInt(data.this_month[0].sum) ? parseInt(data.this_month[0].sum) : 0;
        var last_month = parseInt(data.last_month[0].sum) ? parseInt(data.last_month[0].sum) : 0;


        $('.upper-analytics .blocks').eq(0).find('.tile-body').append('<div class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' + (today.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g, '') + '</div><div class="col-sm-5"><span class="sale">Products</span>' + data.today[0].count + '</div></div>');
        $('.upper-analytics .blocks').eq(1).find('.tile-body').append('<div class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' + (yesterday.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g, '') + '</div><div class="col-sm-5"><span class="sale">Products</span>' + data.yesterday[0].count + '</span></div></div>');
        $('.upper-analytics .blocks').eq(2).find('.tile-body').append('<div class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' + (this_week.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g, '') + '</div><div class="col-sm-5"><span class="sale">Products</span>' + data.this_week[0].count + '</span></div></div>');
        $('.upper-analytics .blocks').eq(3).find('.tile-body').append('<div class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;' + (this_month.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g, '') + '</div><div class="col-sm-5"><span class="sale">Products</span>' + data.this_month[0].count + '</span></div></div>');
        $('.upper-analytics .blocks').eq(4).find('.tile-body').append('<div' +
            ' class="row"><div class="col-sm-7"><span class="sale">Sale' +
            ' Value</span><i class="fa fa-inr"' +
            ' aria-hidden="true"></i>&nbsp;' + (last_month.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g, '') + '</div><div class="col-sm-5"><span class="sale">Products</span>' + data.last_month[0].count + '</span></div></div>');

    },
    error: function (err) {
        $('.alert').text('Please Check Your INTERNET Connection !!');
    }
});


var startDate = moment().subtract(3, "months").format("YYYY-MM-DD");

var endDate = moment().format("YYYY-MM-DD");

function cb(start, end) {
    $('#daterangepicker1').val(moment().subtract(3, "months").format("MM/DD/YYYY") + ' - ' + moment().format("MM/DD/YYYY"));
}

cb(startDate, endDate);


var initialData = {
    "client_id": client_id,
    "start_date": startDate,
    "end_date": endDate
};

$('#order-grid').hide();

callGraph(initialData);


function callGraph(data) {
    $.ajax({
        url: 'http://api.overcart.com/api/analytics/orders/graph',
        type: 'POST',
        data: JSON.stringify(data),
        crossDomain: true,
        dataType: 'json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            $('.date-range').removeClass('hide').addClass('show');
            $('#loading').hide();
            render_salesgraph(data);
        },
        error: function (err) {
            $('.no-product').removeClass('hide').addClass('show');
            $('#loading').hide();
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
}


$('#daterangepicker1').daterangepicker({
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    },
    function (start, end, label) {

        var selectedRange = $("#daterangepicker1").val();
        startDate = start.format('YYYY-MM-DD');
        endDate = end.format('YYYY-MM-DD');
        var carrier = {
            "client_id": client_id,
            "start_date": startDate,
            "end_date": endDate
        };

        callGraph(carrier);

    }, cb);


function render_salesgraph(datapoints) {

    var dataset = [];

    var graphpoints = [];
    var days = [];
    for (var j = 0; j < datapoints.length; j++) {
        for (var i in datapoints[j]) {
            graphpoints.push(parseInt(datapoints[j][i]));
        }
    }

    for (var k = 0; k < datapoints.length; k++) {
        for (var l in datapoints[k]) {
            days.push(l);
        }
    }

    $('#sales_graph').highcharts({
        credits: {enabled: false},
        chart: {
            type: 'column'
        },

        title: {
            text: ''
        },

        xAxis: {
            categories: days,
            labels: {
                rotation: 0
            }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: '<b>Sale Value</b>'
            }
        },
        tooltip: {
            formatter: function () {
                return '<strong>' + (this.y.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g, '') + '</strong> products';
            }
        },

        plotOptions: {
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            loadData(this.category, startDate, endDate);
                        }
                    }
                }
            }
        },

        series: [{
            name: "Sold",
            data: graphpoints,
            type: "column",
            color: "#03a9f4"
        }]
    });
}


function loadData(status, startDate, endDate) {
    var datas = {
        "status": status,
        "client_id": client_id,
        "start_date": startDate,
        "end_date": endDate
    };
    $.ajax({
        url: 'http://api.overcart.com/api/analytics/orders/details',
        type: 'POST',
        data: JSON.stringify(datas),
        crossDomain: true,
        contentType: 'application/json',
        dataType: 'json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {

            $('.order-grid-table').html('');

            $('#loading').hide();

            var output = '<div class="heading col-md-12"><h3>' + status + ' Products</h3></div><table id="order-grid" class="display text-center table table-striped table-bordered table-fixed-header m-n dynamicTable" cellspacing="0" width="100%"><thead>';

            for (var h = 0; h < 1; h++) {
                output += '<tr>';
                for (var k in data[h]) {
                    output += '<th>' + k + '</th>';
                }
                output += '</tr>';
            }

            output += '</thead><tbody>';

            for (var i = 0; i < data.length; i++) {
                output += '<tr>';
                for (var j in data[i]) {
                    output += '<td>' + data[i][j] + '</td>';
                }
                output += '</tr>';
            }
            output += '</tbody></table>';

            $('.order-grid-table').html(output);

            $('.order-grid-table').show();

            $('#order-grid').dataTable({
                "language": {
                    "lengthMenu": "Showing _MENU_ records"
                }
            });
            $('.dataTables_filter input').attr('placeholder', 'Search...');


        },
        error: function (err) {
            $('#loading').hide();
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
}

