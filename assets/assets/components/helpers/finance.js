var datas = {};
var poupload_po_id;

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

$('#paiddate').datepicker({
    format: 'yyyy-mm-dd'
});

function getBankAccount(po_id) {
    $.ajax({
        url: '/api/get/bank/details/',
        type: 'POST',
        data: JSON.stringify({
            "po_id": po_id,
        }),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
        },
        success: function (data) {
            if (data) {
                $("#bankname").empty();
                $("#bankname").append('<option value="">Select*</option>');
                $.each(data.result, function (key, value) {
                    $("#bankname").append('<option value=' + value.bd_id + ' data-ifsc-code="' + value.ifsc_code + '" data-profile-number="' + value.account_number + '">' + value.bank_name + '</option>');
                });
            }
        },
        error: function (err) {
            console.log(err);
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
    autoChangeInputLabelPosition();
}

$('.po-form-view').on('click', function (e) {
    $('form').find("input[type=text], textarea").val("");
    e.preventDefault();
    var $text = ($(this).text()).trim();
    $('#ModalLabel').text($text);
    datas.po_id = $(this).attr('data-po-id');
    poupload_po_id = $(this).attr('data-po-id');
    $('#ponumber').val($(this).attr('data-po-number'));
    $('#quantity').val($(this).attr('data-accepted-qty'));
    $('#poamount').val($(this).attr('data-initial-price'));
    $('#dueamount').val($(this).attr('data-due-amt'));
    $('#poid').val($(this).attr('data-po-id'));
    getBankAccount($(this).attr("data-po-id"));
});

$("#bankname").on('change', function (e) {
    e.preventDefault();
    $("#ifsc").val($(this).find(":selected").attr("data-ifsc-code"));
    $("#accno").val($(this).find(":selected").attr("data-profile-number"));
    autoChangeInputLabelPosition();
});

function isValidDate(dateString) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    return dateString.match(regEx) !== null;
}

function ajaxCall(datas) {
    $.ajax({
        url: '/api/bank/',
        type: 'POST',
        data: JSON.stringify(datas),
        crossDomain: true,
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
            $('.widget-body > .row > .alert-danger').hide();
            $('.widget-body > .row > .alert-success').hide();
        },
        success: function (data) {
            if (data) {
                $('#loading').hide();
                $('.widget-body > .row > .alert-success').show();
                changePoStatus();
            }
        },
        error: function (err) {
            console.log(err);
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });

}


function changePoStatus() {

    var postatus = {
        'postatus_po_status': "6",
        'poupload_po': poupload_po_id.toString()
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
        'user': $.cookie("username"),
        "po": $("#ponumber").val(),
        'subject': 'Finance Approval',
        'body': 'email/finance_approval_mail.html'
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
                    window.location.reload();
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
