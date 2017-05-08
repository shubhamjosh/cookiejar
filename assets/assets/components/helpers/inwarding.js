var datas = {};
var output;

$('.select-warehouse').on('change', function (e) {
    var ops_id = $(this).find('option:selected').val();
    datas.ops_center = ops_id;
    ajaxCall(datas);
});


function ajaxCall(datas) {
    $('#loading').show();
    $.ajax({
        url: '/api/render/',
        type: 'POST',
        data: JSON.stringify(datas),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
            $('.widget-body > .row > .alert-danger').hide();
            $('.widget-body > .row > .alert-danger').hide();
        },
        success: function (data) {
            $('#loading').hide();
            if (data.result.length > 0) {
                $('#loading').hide();
                $('.widget-body > .row > .alert-danger').hide();
                $('#ops_table').remove();
                var result = data.result;
                output = '<table class="ops_table table table-striped table-bordered custom-datatable" id=""><thead><th>Lot ID</th><th>Uploaded By<th>Warehouse</th>';
                //result.forEach(function(el,i){
                //	console.log(el);
                //});
                output += '</thead><tbody>';
                result.forEach(function (el, i) {
                    output += '<tr  class="id' + el.lot_id + ' trgenerated">';
                    output += '<td><a href="/admin/operations/warehouse?id=' + el.lot_id + '" class="excel-view" data-po-id="' + el.lot_id + '">' + el.po_number + '</a></td>';
                    output += '<td>' + el.username + '</td>';
                    output += '<td>' + el.op_center_name + '</td>';
                    output += '</tr>';
                });
                output += '</tbody>';
                $('#ops-table').html(output);
                add_custom_datatables('custom-datatable', 0, 'asc');
            }
            else {
                $('#ops-table').html("<div class='text-center'><p>No Lot found for this warehouse!</p></div>");
            }
        },
        error: function (err) {
            console.log(err);
            $('.ops_table').remove();
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
}


var ajax_data = {};
$('.idtype').on('change', function () {
    $('.idtype-head label').text($(this).val());
    ajax_data.idtype = $(this).val();
});

$("#ean").on("keydown", function () {
    if ($("#ean").val() !== "") {
        ajax_data.idnumber = $(this).val();
    }
});

var required_tags = document.querySelectorAll('[required]');
var required_values = [];
var check_index = [];
var required = [];
var can_pass;

$('input').on('keyup', function (e) {
    validate();
});

$('select').on('change', function () {
    validate();
});

function validate() {
    ajax_data.idnumber = $("#ean").val();
    for (var i = 0; i < required_tags.length; i++) {
        if (check_index.indexOf(i) == -1) {
            if (required_tags[i].value !== '') {
                check_index.push(i);
                required[i] = 1;
            }

        } else {
            if (check_index.indexOf(i) != -1) {
                if (required_tags[i].value === '') {
                    delete required[i];
                }
                else {
                    required[i] = 1;
                }
            }
        }
    }
}

$('.checkValidation').on('click', function () {

    validate();

    for (var i = 0; i < required_tags.length; i++) {
        console.log(required_tags[i].value)
        if (required_tags[i].value !== '') {
            $('form .show.error-' + i).addClass('hide').removeClass('show');
        }
        else {
            $('form .hide.error-' + i).addClass('show').removeClass('hide');
        }

    }
    for (var u = 0; u < required_tags.length; u++) {
        if (typeof required[u] === "undefined") {
            can_pass = false;
            break;
        }
        else {
            can_pass = true;
        }
    }
    if (can_pass) {
        if (required_tags.length === required.length) {
            $('[data-target="#sheet-modal"]').click();
        }
    }
});


$('[data-target="#sheet-modal"]').on('click', function () {
    $.ajax({
        url: '/api/catalog/overcart/',
        type: 'POST',
        data: JSON.stringify(ajax_data),
        dataType: 'json',
        contentType: 'application/json',
        processData: false,
        beforeSend: function () {
            $('#loading').show();
            $('.widget-body > .row > .alert-danger').hide();
            $('.widget-body > .row > .alert-danger').hide();

        },
        success: function (data) {
            if (data) {
                $("#imei-hidden").val($("#imei").val());
                $("#ean-hidden").val($("#ean").val());
                $("#lot-hidden").val($("#lot").val());
                $('.search-asin').hide();
                $('.product-display').show();
                $('#loading').hide();
                $('.product-display tbody').remove();
                output = '<tbody>';
                for (var i in data.result[0]) {
                    var name = (i.replace(/_/g, ' ')).toUpperCase();
                    if (data.result[0][i] !== 'None') {
                        output += '<tr><td>' + name + '</td><td style="padding:7px 20px;">:</td><td class="' + i + '">' + data.result[0][i] + '</td></tr>';
                    }
                }
                output += '</tbody>';
                $('.product-display').html(output);
            }
            else {
                $('#loading').hide();
                $('.visible_sheet table thead tr .thgenerated').remove();
                $('.visible_sheet table tbody .trgenerated').remove();
                $('.visible_sheet table thead tr').html('<th>NO FILE PRESENT</th>');
            }
        },
        error: function (err) {
            console.log(err);
            $('#loading').hide();
            $('.visible_sheet .alert-danger').show();
            $('.visible_sheet .alert-danger').html('No Data Found !!');
        }
    });
});

