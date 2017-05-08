var datas = {};
var poupload_po_id;
var $text;

var price = {};
var comment = {};

var zero_price = [];
var has_comment = [];
var can_pass;

$('.base_tprice').on('keyup', function (e) {
    if(e.keyCode != 48){
        zero_price[$('tbody>tr').index($(this).parents('tr'))] = $(this).val();
        price[$(this).attr('data-po-id')] = $(this).val();
        var float_price = new RegExp(/0\.\d+$/gi);
        if (zero_price.indexOf('0') != -1 || float_price.test($(this).val())) {
            //$('.category-approve').attr('disabled', true);
        }
        else {
            //$('.category-approve').attr('disabled', false);
        }
    }
    else{
        var start_digit = new RegExp(/^0+$/gi);
        if(start_digit.test($(this).val())){
           $(this).val(''); 
        }
    }
});

$('.comment').on('keyup', function (e) {
    if ($(this).val() !== '') {
        has_comment[$('tbody>tr').index($(this).parents('tr'))] = $(this).val();
    }
    else {
        has_comment.splice($('tbody>tr').index($(this).parents('tr')), 1);
    }
    for (var u = 0; u < has_comment.length; u++) {
        if (typeof has_comment[u] === "undefined") {
            can_pass = true;
            break;
        }
        else {
            can_pass = false;
        }
    }
    comment[$(this).attr('data-po-id')] = $(this).val();
    if (has_comment.length > 0 && can_pass === false) {
        $('.category-approve').attr('disabled', true);
        $('.checkbox').css({'pointer-events':'none','opacity':0.4,'cursor':'not-allowed'});
    }
    else {
        $('.category-approve').attr('disabled', false);
        $('.checkbox').css({'pointer-events':'auto','opacity':1,'cursor':'pointer'});
    }

});
var item_length;

$('.price-done').on('click', function (e) {
    poupload_po_id = $(".heading").attr('data-lot-id');
    $.ajax({
        url: '/api/category/price/update/',
        type: 'POST',
        data: JSON.stringify({"price": price, "lot_id": poupload_po_id}),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.result == 'success') {
                changePoStatus();
                setTimeout(function () {
                    window.location.href = "/admin/category/price/?success=true";
                }, 2000);
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
            'postatus_po_status': "3",
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

    function sendEmail() {
        var mail = {
            'user': $.cookie('username'),
            "po": $('.widget.widget-inverse>.widget-head .heading').text(),
            'subject': 'Price Updated by Category',
            'body': 'category_price_email.html'
        };
        $.ajax({
            url: '/api/sendmail/',
            type: 'POST',
            data: JSON.stringify(mail),
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
            },
            success: function (data) {
                if (data.result == 'success') {
                    setTimeout(function () {
                        window.location.href = "/admin/category/price/";
                    }, 2000);
                }
                else {
                    console.log('email not send');
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});


$('.price-save').on('click', function (e) {
    $.ajax({
        url: '/api/category/price/update/',
        type: 'POST',
        data: JSON.stringify(price),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.result == 'success') {
                $('#loading').hide();
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
});


$('.category-review').on('click', function (e) {
    comment.po_id = $('.comment').attr('data-po-lot');
    console.log(comment);
    $.ajax({
        url: '/api/category/comment/update/',
        type: 'POST',
        data: JSON.stringify(comment),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.result == 'success') {
                changePoStatus();
                setTimeout(function () {
                    window.location.href = "/admin/category/?review=true";
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

    function changePoStatus() {
        var postatus = {
            'postatus_po_status': "8",
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

    function sendEmail() {
        var mail = {
            'user': $.cookie('username'),
            "po": $('.widget.widget-inverse>.widget-head .heading').text(),
            'subject': 'Please Review',
            'body': 'category_review_email.html'
        };
        $.ajax({
            url: '/api/sendmail/',
            type: 'POST',
            data: JSON.stringify(mail),
            dataType: 'json',
            contentType: 'application/json',
            beforeSend: function () {
            },
            success: function (data) {
                if (data.result == 'success') {
                    setTimeout(function () {
                        window.location.href = "/admin/category/price/";
                    }, 500);
                }
                else {
                    console.log('email not send');
                }
            },
            error: function (err) {
                console.log(err);
            }
        });
    }
});
