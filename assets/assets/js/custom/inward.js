$(".start-warehouse").click(function (e) {
    e.preventDefault();
    var po_number = $("#po_number").val();
    if (po_number != "") {
        var href_url = $(this).attr('href');
        href_url = href_url + "?po_number=" + po_number;
        window.location.href = href_url;
    }
    else {
        alert("Please enter Lot Number");
    }
});


$(".fetchdata").click(function () {
    var ean = $('#ean').val();
    $.ajax({
        url: '/admin/inward/ovr/scan/fetch_from_ean/?ean=' + ean,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (response) {
            var s = JSON.parse(response);
            $("#product_name").val(s['product_name']);
            $("#color").val(s['color']);
            $("#manufacturer").val(s['brand']);
            $('#loading').hide();
            $('.ean_class_hide').removeClass("ean_class_hide");
            autoChangeInputLabelPosition();
        },
        error: function (err) {
            $('#loading').hide();
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
});


$(".po_data").click(function () {
    var po_number = $('#po_number').val();
    $.ajax({
        dataType: 'json',
        url: '/admin/inward/ovr/scan/get_po_details/?po_number=' + po_number,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (response) {
            if (Object.keys(response).length > 0) {
                $("#client_name").val(response.client_name);
                $("#estimated_qty").val(response.accepted_qty);
                $("#dest_warehouse").val(response.op_center_name);
                $('.client_name').addClass("disabled");
                $('.dest-wh').addClass("disabled");
                $('.estd-qty').addClass("disabled");
                autoChangeInputLabelPosition();
            }
            else {
                alert("No results found");
            }
            $('#loading').hide();
        },
        error: function (err) {
            $('#loading').hide();
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
});


// Check Existing OVR Code
$(".checkovr").click(function () {
    var ovr_code = $('#ovr_code').val();
    $.ajax({
        dataType: 'json',
        url: '/admin/inward/ovr/scan/check_ovr/?ovr_code=' + ovr_code,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (response) {
            if (response.exists == "false") {
                alert(response.message);

            }
            else if (response.exists == "true") {

                $('.ovr_class_hide').removeClass("ovr_class_hide");
            }
            $('#loading').hide();
        },
        error: function (err) {
            $('#loading').hide();
            $('.alert').text('Please Check Your INTERNET Connection !!');
        }
    });
});





