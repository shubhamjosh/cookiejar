function render_salesgraph(datapoints) {

    var graphpoints = [];
    var days = [];
    for (var j = 0; j < datapoints.length; j++) {
        graphpoints.push(parseInt(datapoints[j].cid) / 1000);
    }

    var max_value = Math.max.apply(null, graphpoints);

    for (var k = 0; k < datapoints.length; k++) {
        days.push(datapoints[k].day);
    }


    var options = {
        low: 0,
        high: max_value,
        showArea: true,
        showPoint: true,
        fullWidth: true,
        chartPadding: {
            left: 30,
            right: 5
        },
        axisY: {
            labelInterpolationFnc: function (value) {
                return '<i class="fa fa-rupee"></i>&nbsp;' + (value) + 'k';
            },
            scaleMinSpace: 20
        },
        series: {
            'series-1': {
                showArea: true,
                showPoint: true,
                fullWidth: true,
            }
        }
    };


    var data = {
        labels: days,
        series: [{
            name: 'series-1',
            data: graphpoints
        }]
    };

    new Chartist.Line("#fullChart", data, options);

}


var initialData = {"client_id": client_id, "isClientorSeller": "client"};

$.ajax({
    url: 'http://api.overcart.com/api/marketplace/salesfigure',
    type: 'POST',
    data: JSON.stringify(initialData),
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


        $('.upper-analytics .blocks').eq(0).find('.tile-body').append('<div' +
            ' class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+(today.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g,'')+'</div><div class="col-sm-5"><span class="sale">Products</span>'+data.today[0].count+'</div></div>');
        $('.upper-analytics .blocks').eq(1).find('.tile-body').append('<div' +
            ' class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+(yesterday.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g,'')+'</div><div class="col-sm-5"><span class="sale">Products</span>'+data.yesterday[0].count+'</span></div></div>');
        $('.upper-analytics .blocks').eq(2).find('.tile-body').append('<div' +
            ' class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+(this_week.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g,'')+'</div><div class="col-sm-5"><span class="sale">Products</span>'+data.this_week[0].count+'</span></div></div>');
        $('.upper-analytics .blocks').eq(3).find('.tile-body').append('<div' +
            ' class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+(this_month.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g,'')+'</div><div class="col-sm-5"><span class="sale">Products</span>'+data.this_month[0].count+'</span></div></div>');
        $('.upper-analytics .blocks').eq(4).find('.tile-body').append('<div' +
            ' class="row"><div class="col-sm-7"><span class="sale">Sale Value</span><i class="fa fa-inr" aria-hidden="true"></i>&nbsp;'+(last_month.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).replace(/\.00/g,'')+'</div><div class="col-sm-5"><span class="sale">Products</span>'+data.last_month[0].count+'</span></div></div>');

    },
    error: function (err) {
        $('.alert').text('Please Check Your INTERNET Connection !!');
    }
});

$.ajax({
    url: 'http://api.overcart.com/api/marketplace/salesgraph',
    type: 'POST',
    data: JSON.stringify(initialData),
    crossDomain: true,
    dataType: 'json',
    beforeSend: function () {
        //$('.graph-loader').show();
    },
    success: function (data) {

        $('.graph-loader').fadeOut(2000);
        render_salesgraph(data);

    },
    error: function (err) {
        $('.alert').text('Please Check Your INTERNET Connection !!');
    }
});


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
}

var today = new Date();
var weekAgo = new Date();
var start = moment().subtract(6, 'days');
var end = moment();
function cb(start, end) {
    //$('input[name="daterangepicker_2"]').val(formatDate(new Date(weekAgo.getTime() - (60*60*24*7*1000)))+' - '+formatDate(formatDate(today)));
    $('input[name="daterangepicker_2"]').val(start.format('MM/DD/YYYY') + ' - ' + end.format('MM/DD/YYYY'));
}
cb(moment().subtract(6, 'days'), moment());
$('input[name="daterangepicker_2"]').daterangepicker({
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        }
    },
    function (start, end, label) {

        var selectedRange = $("#daterangepicker_2").val();
        var fromDate = start.format('YYYY-MM-DD');
        var toDate = end.format('YYYY-MM-DD');
        var carrier = {
            "client_id": clientId,
            "isClientorSeller": isClientOrSeller,
            "fromDate": fromDate,
            "toDate": toDate
        };

        $.ajax({
            type: "POST",
            url: 'http://api.overcart.com/api/marketplace/salesgraph',
            data: JSON.stringify(carrier),
            crossDomain: true,
            dataType: 'json',
            beforeSend: function () {
                $('#loader').show();
            },
            success: function (data) {
                $('#loader').fadeOut(2000);
                render_salesgraph(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('There is some error !!');
            }
        });
    }, cb);