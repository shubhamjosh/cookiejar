var startDate = moment().subtract(3, "months").format("YYYY-MM-DD");

var endDate = moment().format("YYYY-MM-DD");

function cb(start, end) {
    $('#daterangepicker1').val(moment().subtract(3, "months").format("MM/DD/YYYY") + ' - ' + moment().format("MM/DD/YYYY"));
}

cb(startDate, endDate);

var initialListedSold = {"client_id": client_id, "limit": "3", "start": startDate, "end": endDate};

//listedSold(initialListedSold);

function listedSold(data) {
    $.ajax({
        url: 'http://api.overcart.com/api/analytics/sales/listedsold',
        type: 'POST',
        data: JSON.stringify(data),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {

            $('.date-range').removeClass('hide').addClass('show');

            output = '<div class="col-md-12" style="padding-bottom:20px"><h4>Your Top Products</h4><h5>Fastest Moving Products*</h5></div>';

            if (data.success) {
                for (var i = 0, l = data.data.length; i < l; i++) {
                    output += '<div class="col-md-4 text-center"><p class="duration">' + data.data[i].time_difference + '</p><p class="name">' + data.data[i].product_name + '</p></div>';
                }
            }

            $('#fast-product').html(output);
        },
        error: function (err) {
            $('#loading').hide();
            $('.no-product').removeClass('hide').addClass('show');
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
}

quality("desc", "top-five");
quality("asc", "bottom-five");

function quality(order, el) {
    $.ajax({
        url: 'http://api.overcart.com/api/analytics/sales/quality',
        type: 'POST',
        data: JSON.stringify({"client_id": client_id, "order_by": order, "limit": 5}),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {

            $('#repair-block').removeClass('hide').addClass('show');

            output = '';

            if (data.success) {
                for (var i = 0, l = data.data.length; i < l; i++) {
                    output += '<tr><td>' + data.data[i].productName + '</td><td>' + Math.round(data.data[i].quality) + '%</td></tr>';
                }
            }

            $('.' + el + ' tbody').html(output);
        },
        error: function (err) {
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
}


var initialProcessing = {"client_id": client_id, "start_date": startDate, "end_date": endDate};

//processing(initialProcessing);

function processing(data) {
    $.ajax({
        url: 'http://api.overcart.com/api/analytics/status/processing',
        type: 'POST',
        data: JSON.stringify(data),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {

            $('#processing').html('');

            $('#loading').hide();

            var output = '<div class="col-md-12"><h3>PROCESSING STATUS</h3></div><table id="processing-grid" class="table table-striped table-bordered table-fixed-header m-n dynamicTable"><thead>';

            for (var h = 0; h < 1; h++) {
                output += '<tr>';
                for (var k in data.data[h]) {
                    output += '<th>' + k + '</th>';
                }
                output += '</tr>';
            }

            output += '</thead><tbody>';

            for (var i = 0; i < data.data.length; i++) {
                output += '<tr>';
                for (var j in data.data[i]) {
                    output += '<td>' + data.data[i][j] + '</td>';
                }
                output += '</tr>';
            }
            output += '</tbody></table>';

            $('#processing').html(output);

            $('#processing').show();

            $('#processing-grid').dataTable({
                "language": {
                    "lengthMenu": "Showing _MENU_ records"
                }
            });
            $('.dataTables_filter input').attr('placeholder', 'Search...');


        },
        error: function (err) {
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

        var carrierListedSold = {
            "client_id": client_id,
            "limit": 3,
            "start": startDate,
            "end": endDate
        };

        var carrierProcessing = {
            "client_id": client_id,
            "start_date": startDate,
            "end_date": endDate
        };

        listedSold(carrierListedSold);
        processing(carrierProcessing);

    }, cb);
