var po, po_id;

$('.inwarded').on('click', function (e) {
    e.preventDefault();
    po = ($(this).parents('tr').find('.po_number')).text().trim();
    po_id = $(this).attr('data-po-id').toString();
    var postatus = {
        'postatus_po_status': "7",
        'poupload_po': po_id
    };
    $.ajax({
        url: '/api/change/postatus/',
        type: 'POST',
        data: JSON.stringify(postatus),
        dataType: 'json',
        contentType: 'application/json',
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (data) {
            if (data.result == 'success') {
                update_pickup_date();
                setTimeout(function () {
                    window.location.href = "/admin/operations/?success=true&po=" + po;
                }, 2000);
            }
            else {
                console.log('PO Status Change Successfully');
            }
        },
        error: function (err) {
            console.log(err);
        }
    });

    function update_pickup_date() {
        var data = {};
        data.po_id = po_id;
        $.ajax({
            url: '/api/update/pickupdate/',
            type: 'POST',
            data: JSON.stringify(data),
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
            'po': po,
            'subject': 'OPS Inwarded',
            'body': 'email/operations_inwarded_mail.html'
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
