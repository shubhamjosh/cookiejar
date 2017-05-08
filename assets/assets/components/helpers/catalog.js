var datas = {};
var poupload_po_id;
var $text;
var podetails_id;
var ean = {};
var polot = window.location.href.split("lot=")[1];

$('.asin').on('click', function (e) {
    podetails_id = $(this).attr('data-podetails-id');
    $('.search-asin').show();
    $('.product-display').hide();
    $('.widget-body .alert-danger').hide();
    $('.visible_sheet .alert-success').hide();
    $('.visible_sheet .alert-success').hide();
    $('.url-input').val('');
    $('.modal-title').text('Enter URL');
    $(".url-input").attr("autofocus", "true");
});

$('.url-submit').on('click', function (e) {
    $('.visible_sheet .alert-danger').hide();
    $('.visible_sheet .alert-success').hide();
    e.preventDefault();
    if ($('.url-input').val() === '') {
        $('.visible_sheet .enter-url').html('Please Enter URL !!');
        $('.visible_sheet .enter-url').show();
    }
    else {
        /* Regex ^https?:\/\/[\S]+\/([A-Z0-9]{10})[\S]*$
         * has been implemented to fetch Alphanumeric character (ASIN)
         * from the amazon urls.
         *
         * eg: http://www.amazon.in/dp/B01C2T6IDY/ref=br_isw_strs-2?pf_rd_m=A1VBAL9TL5WCBF&pf_rd_s=desktop-top&pf_rd_r=1SQ2X7WWT561FZJMNGMC&pf_rd_t=36701&pf_rd_p=7a070254-eca2-492e-b61d-5f21b7335405&pf_rd_i=desktop
         * Gives me match group of given below:
         * 1. B01C2T6IDY
         *
         */
        var ean = ($('.url-input').val()).match(/^https?:\/\/[\S]+\/([A-Z0-9]{10})[\S]*$/);
        if (ean == null) {
            $('.visible_sheet .alert-danger:first-child').show();
            $('.visible_sheet .alert-danger').html('Please enter a valid url');
        }
        if (ean != null) {
            datas.idtype = "ASIN";
            datas.idnumber = ean[1];
            ajaxCall(datas);
        }
    }
});

var item_length;
var global_ean;
var product_id;
var set_ean_manually = {};
var update_ean_manually = {};

function ajaxCall(datas) {
    $.ajax({
        url: '/api/catalog/search/',
        type: 'POST',
        data: JSON.stringify(datas),
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
                $('.search-asin').hide();
                $('.product-display').show();
                $('.modal-title').text('Product Details');
                $('#loading').hide();
                ean.ean = data.ean;
                ean.product_id = data.product_id;
                ean.podetails_id = podetails_id;
                set_ean_manually.podetails_id = podetails_id;
                set_ean_manually.product_id = data.product_id;
                output = '';
                for (var j in data) {
                    if (j == 'ean') {
                        global_ean = data[j];
                    }
                    if (j == 'product_id') {
                        product_id = data[j];
                        update_ean_manually.product_id = data[j];
                    }
                }

                if (global_ean !== 'None') {
                    for (var i in data) {
                        var name = (i.replace(/_/g, ' ')).toUpperCase();
                        if (data[i] !== 'None') {
                            output += '<tr>';
                            output += '<td>' + name + '</td><td style="padding:7px 20px;">:</td>';
                            output += '<td class="' + i + '">' + data[i] + '</td></tr>';
                        }
                    }
                    $('.asin-not-found').hide();
                    $('.product-display tbody tr:first-child').html(output);
                    $('.product-display>tbody>tr:last-child').show();
                }
                else {
                    $('.asin-not-found').show();
                    output += '<td><select class="manual-idtype" style="width:100%;">';
                    output += '<option></option><option value="EAN">EAN</option><option value="UPC">UPC</option><option value="ISBN">ISBN</option></select></td>';
                    output += '<td colspan="2"><input style="width:100%;height:30px;" type="text" class="ean-filled-manually" ></td><td><button class="btn btn-success ean-submit-manually">Submit</button></td>';
                    $('.product-display tbody tr:first-child').html(output);
                    $('.product-display>tbody>tr:last-child').hide();
                    manual_ean();
                }

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
            $('.visible_sheet .alert-danger:first-child').show();
            $('.visible_sheet .alert-danger').html('Please enter a valid url');
        }
    });

}

function manual_ean() {
    $('.ean-submit-manually').on('click', function () {
        set_ean_manually.ean = $('.ean-filled-manually').val();
        update_ean_manually.idtype = $('.manual-idtype option:selected').val();
        update_ean_manually.idnumber = $('.ean-filled-manually').val();
        $.ajax({
            url: '/api/catalog/ean/update/',
            type: 'POST',
            data: JSON.stringify(set_ean_manually),
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
                $('#loading').show();
                $('.visible_sheet.alert-danger').hide();
                $('.visible_sheet .alert-danger').hide();
            },
            success: function (data) {
                if (data) {
                    $('.search-asin').show();
                    $('.product-display').hide();
                    $('.visible_sheet .alert-success').show();
                    $('.visible_sheet .alert-success').html('Successfully Updated');
                    catalogeanupdate(update_ean_manually);
                }
                else {
                    $('.search-asin').hide();
                    $('.product-display').show();
                    $('.visible_sheet .alert-danger').show();
                    $('.visible_sheet .alert-danger').html('Something went wrong');
                    $('#loading').hide();
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

    function catalogeanupdate(update_ean_manually) {
        $.ajax({
            url: '/api/catalog/update/',
            type: 'POST',
            data: JSON.stringify(update_ean_manually),
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
                $('.visible_sheet .alert-danger').hide();
            },
            success: function (data) {
                if (data) {
                    $('.search-asin').show();
                    $('.product-display').hide();
                    $('.visible_sheet .alert-success').show();
                    $('.visible_sheet .alert-success').html('Successfully Updated');
                    $('#loading').hide();
                }
                else {
                    $('.search-asin').hide();
                    $('.product-display').show();
                    $('.visible_sheet .alert-danger').show();
                    $('.visible_sheet .alert-danger').html('Something went wrong');
                    $('#loading').hide();
                }
            },
            error: function (err) {
                console.log(err);
                $('#loading').hide();
                $('.visible_sheet .alert-danger').show();
                $('.visible_sheet .alert-danger').html('No Data Found !!');
            }
        });

    }

}

$('.asin-submit').on('click', function () {
    $.ajax({
        url: '/api/catalog/ean/update/',
        type: 'POST',
        data: JSON.stringify(ean),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
            $('.visible_sheet.alert-danger').hide();
            $('.visible_sheet .alert-danger').hide();
        },
        success: function (data) {
            if (data) {
                $("#" + ean["podetails_id"]).html(ean["ean"]);
                $('.modal-title').text('EAN successfully updated');
                $('.search-asin').hide();
                $('.product-display').hide();
                $('.visible_sheet .alert-success').show();
                $('.visible_sheet .alert-success').html('Successfully Updated');
                $('#loading').hide();
            }
            else {
                $('.modal-title').text('Something went wrong');
                $('.search-asin').hide();
                $('.product-display').show();
                $('.visible_sheet .alert-danger').show();
                $('.visible_sheet .alert-danger').html('Something went wrong');
                $('#loading').hide();
            }
        },
        error: function (err) {
            console.log(err);
            $('#loading').hide();
            $('.visible_sheet .alert-danger').show();
        }
    });
});

$('.asin-done').on('click', function (e) {
    var postatus = {
        'postatus_po_status': "4",
        'poupload_po': polot.toString()
    };
    $.ajax({
        url: '/api/checkean/',
        type: 'POST',
        data: JSON.stringify({"podetails_id": polot}),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.total == data.updated) {
                rest();
                setTimeout(function () {
                    window.location.href = "/admin/catalog/?success=true";
                }, 2000);
            }
            else {
                $('#loading').hide();
                $('.panel-body .alert-danger').html('Please provide all EAN to submit the lot.');
                $('.panel-body .alert-danger').removeClass("hide");
            }
        },
        error: function (err) {
            console.log(err);
        }
    });

    function rest() {
        $.ajax({
            url: '/api/catalog/done/',
            type: 'POST',
            data: JSON.stringify(postatus),
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.result != 'success') {
                    console.log('PO Status Change Successfully');
                }

            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});
