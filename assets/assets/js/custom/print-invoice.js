var val;
var cal;
var subtotal = 0;
var mode;
$.ajax({
    url: 'http://api.overcart.com/api/dashboard/printInvoice',
    type: 'POST',
    data: JSON.stringify(apiData),
    crossDomain: true,
    dataType: 'json',
    beforeSend: function () {
        //$('.graph-loader').show();
    },
    success: function (data) {
        val = data.data;
        cal = data.totaldata[0];
        var bname;
        var bcompany;
        if (val[0].billing_firstname != null) bname = val[0].billing_firstname;
        if (val[0].billing_middlename != null) bname = bname + ' ' + val[0].billing_middlename;
        if (val[0].billing_lastname != null) bname = bname + ' ' + val[0].billing_lastname;
        if (val[0].billing_company == null)
            bcompany = '';
        else bcompany = val[0].billing_company;
        if (val[0].method == 'purchaseorder') mode = 'Purchase Order';
        if (val[0].method == 'cashondelivery') mode = 'Cash on delivery';
        if (val[0].method == 'payucheckout_shared' || val[0].method == 'm2epropayment' || val[0].method == 'paytm_cc' || val[0].method == 'paywithamazon' || val[0].method == 'payumoney_shared' || val[0].method == 'firstdataicici')
            mode = 'Prepaid';

        document.getElementById("invoice-info").innerHTML = 'Invoice for <strong>' + val[0].increment_id + '</strong>';
        document.getElementById('seller').innerHTML = '<strong>Sold By</strong><br/>' + val[0].seller_name + '</br>' + val[0].address;
        document.getElementById('tin').innerHTML = '<strong>VAT/TIN : </strong>' + val[0].tinno;
        document.getElementById("bcompany").innerHTML = bcompany;
        document.getElementById('bname').innerHTML = bname;
        document.getElementById('bstreet').innerHTML = val[0].billing_street;
        document.getElementById('bregion').innerHTML = val[0].billing_city + " ," + val[0].billing_region + ", " + val[0].billing_postcode + " ," + val[0].billing_country_id;
        document.getElementById('bphone').innerHTML = 'Ph : ' + val[0].billing_telephone;

        document.getElementById('payment').innerHTML = '<strong>Payment Mode: </strong>' + mode;

        var sname;
        var scompany;
        if (val[0].shipping_firstname != null) sname = val[0].shipping_firstname;
        if (val[0].shipping_middlename != null) sname = sname + ' ' + val[0].shipping_middlename;
        if (val[0].shipping_lastname != null) sname = sname + ' ' + val[0].shipping_lastname;
        if (val[0].shipping_company == null)
            scompany = '';
        else
            scompany = val[0].shipping_company;

        document.getElementById('sname').innerHTML = sname;
        document.getElementById('scompany').innerHTML = val[0].shipping_company;
        document.getElementById('sstreet').innerHTML = val[0].shipping_street;
        document.getElementById('sregion').innerHTML = val[0].shipping_city + " ," + val[0].shipping_region + " ," + val[0].shipping_postcode + " ," + val[0].shipping_country_id;
        document.getElementById('sphone').innerHTML = 'Ph : ' + val[0].shipping_telephone;

        document.getElementById('shipping').innerHTML = parseInt(cal.base_shipping_amount);
        document.getElementById('credit').innerHTML = parseInt(cal.base_customer_credit_amount);
        document.getElementById('discount').innerHTML = parseInt(cal.base_discount_amount);
        document.getElementById('grand').innerHTML = parseInt(cal.base_grand_total);
        document.getElementById('officeaddress').innerHTML = '<br>Registered office address for ' + val[0].seller_name + '<br>' + val[0].address;

        val.forEach(function (el, i) {
            subtotal = subtotal + (el.base_price_incl_tax * el.qty);
            $("#products tbody").append('<tr><td><div>' + el.name + '</div><div>' + el.serialcode + '</div></td><td>' + parseInt(el.qty) + '</td><td>' + (parseFloat(el.base_price)).toFixed(2) + '</td><td>' + (parseFloat((el.base_tax_amount / el.qty))).toFixed(2) + ' (' + (parseFloat(el.tax)).toFixed(2) + '%)</td><td>' + (el.base_price_incl_tax * el.qty) + '</td></tr>');
        });

        document.getElementById('subtotal').innerHTML = subtotal;

        $("#barcodeInvoice").barcode(
            cal.increment_id, // Value barcode (dependent on the type of barcode)
            "code128", // type (string)
            {barWidth: 3, barHeight: 60}
        );
        $("#barcodeOrder").barcode(
            val[0].increment_id, // Value barcode (dependent on the type of barcode)
            "code128", // type (string)
            {barWidth: 2, barHeight: 60}
        );
        $('.qrcode').qrcode({width: 72, height: 72, text: "www.overcart.com"});
        setTimeout(function () {
            //window.location.reload();
        }, 2500);
        window.print();
    },
    error: function (err) {
        console.log(err);
        $('.alert').text('Unable to Print. Please Check Your INTERNET Connection !!');
    }
});


$(window).load(function () {
    $('.invoice').css({'width': '700px'});
    var height = $(document).height();
    $('.invoice').css({'height': height + 'px'});
});

