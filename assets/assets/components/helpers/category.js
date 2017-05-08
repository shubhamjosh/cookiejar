var datas = {};
var poupload_po_id;
var $text;
var polot = window.location.href.split("lot=")[1];

$('.category-save').on('click', function (e) {
    if (checked.length === 0) {
        $('.widget-body > .row > .alert-danger').show();
    }
    else {

        var data = {
            "po_details_id": checked.toString(),
            "approval_by": username,
            "accepted_qty": (checked.length).toString(),
            "po_id": polot
        };

        $.ajax({
            url: '/api/category/products/approved/',
            type: 'POST',
            data: JSON.stringify(data),
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.result == 'success') {
                    $('#loading').hide();
                    $('.widget-body > .row > .alert-success').text('Successfully Saved !!');
                    $('.widget-body > .row > .alert-success').show();
                }
                else {
                    $('#loading').hide();
                    $('.widget-body > .row > .alert-danger').text('Sorry Can\'t be Updated');
                    $('.widget-body > .row > .alert-danger').show();
                }
            },
            error: function (err) {
                console.log(err);
                $('.alert').text('Please Check Your INTERNET Connection !!');
            }
        });
    }
});


$('.product-add').on('click',function(e){
    var float_price = new RegExp(/0\.\d+$|0/gi);
    if($('#productname').val() !== '' && $('#color').val() !== '' && $('#quantity').val() !== '' && !float_price.test($('#quantity').val()) && $('#base_tprice').val() !== '' && !float_price.test($('#base_tprice').val()) ){

        $('.modal-body .alert-danger').removeClass('show').addClass('hide');
        var product = {
                        "products": [
                            {
                                "product_name": $('#productname').val(), 
                                "model": $('#model').val(), 
                                "color": $('#color').val(),
                                "warranty_status": 1, 
                                "warranty_duration": 60, 
                                "qty": $('#quantity').val(), 
                                "base_tprice": $('#base_tprice').val(), 
                                "lot_id": $('#lot_id').val()
                            }
                        ]
                    }

        $.ajax({
            url: 'http://jarvis.overboxd.com/lots/details',
            type: 'POST',
            data: JSON.stringify(product),
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.status == 200) {
                    window.location.reload();
                }
                else {
                    $('#loading').hide();
                    $('.modal-body .alert-danger').removeClass('hide').addClass('show');
                }
            },
            error: function (err) {
                console.log(err);
                $('.alert').text('Please Check Your INTERNET Connection !!');
            }
        });
    }
    else{
        if(float_price.test($('#base_tprice').val())){
            $('.modal-body .price').removeClass('hide').addClass('show');
        }
        else{
            $('.modal-body .required').removeClass('hide').addClass('show');
        }
    }

});



$('.category-approve').on('click', function (e) {
    if ($('.checkbox.checkbox-single.checked').length === 0) {
        $('.panel-body > .row > .alert-danger').show();
    }
    else {

        $.ajax({
            url: '/api/category/price/update/',
            type: 'POST',
            data: JSON.stringify({"price": price, "lot_id": polot}),
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.result == 'success') {
                }
                else {
                    $('#loading').hide();
                    $('.panel-body > .row > .alert-danger').text('Kindly, enter some value in pricing.html field before submitting.');
                    $('.panel-body > .row > .alert-danger').removeClass("hide");
                }
            },
            error: function (err) {
                console.log(err);
                $('.alert').text('Please Check Your INTERNET Connection !!');
            }
        });

        function changePoStatus() {
            var postatus = {
                'postatus_po_status': "5",
                'poupload_po': (window.location.href.split('lot=')[1]).toString()
            };
            $.ajax({
                url: '/api/change/postatus/',
                type: 'POST',
                data: JSON.stringify(postatus),
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function () {

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

        var data = {
            "podetails_id": checked.toString(),
            "approval_by": username,
            "accepted_qty": (checked.length).toString(),
            "po_id": polot
        };
        console.log(data);
        $.ajax({
            url: '/api/category/products/approved/',
            type: 'POST',
            data: JSON.stringify(data),
            crossDomain: true,
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
                $('#loading').show();
            },
            success: function (data) {
                if (data.result == 'success') {
                    //changePoStatus();
                    setTimeout(function () {
                        window.location.href = '/admin/category/?approve=true';
                    }, 500);
                }
                else {
                    $('#loading').hide();
                    $('.widget-body > .row > .alert-danger').text('<strong>Sorry Can\'t be Updated</strong>');
                    $('.widget-body > .row > .alert-danger').show();
                }
            },
            error: function (err) {
                console.log(err);
                $('.alert').text('Please Check Your INTERNET Connection !!');
            }
        });
    }
});
