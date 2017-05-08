var table = $('#product-grid').DataTable({

    "processing": true,
    "ajaxSource": 'http://api.overcart.com/api/marketplace/repair/products/' + user_id,
    "paginate": false,
    "bInfo": false,
    "initComplete": function (response) {
        $('#loading').hide();
        $('.parent-checkbox-single').removeClass('checked');
        if (response._iRecordsDisplay > 0) {
            $('#view-panel').fadeIn('fast');
        } else {
            $('#no-results-panel').fadeIn('slow');
        }
    },
    "columns": [
        {
            "sortable": false,
            "data": "id",
            "render": function (data, type, full) {
                output = '<div data-id="' + data + '" class="checkbox checkbox-single margin-none">';
                output += '<label class="checkbox-custom">';
                output += '<i class="fa fa-fw fa-square-o"></i>';
                output += '<input name="checks[]" type="checkbox" value="">';
                output += '</label></div>';
                return output;
            }
        }, //Checkbox

        {
            "sortable": true,
            "data": "product_name",
            "type": "html"
        }, //Product name

        {
            "sortable": false,
            "data": "sell_as",
            "type": "html"
        }, //Model

        {
            "sortable": false,
            "data": "lstatus",
            "type": "html"
        }, //Model

        {
            "sortable": false,
            "data": "tprice",
            "type": "num"
        }, //SKU

        {
            "sortable": false,
            "data": "po_number",
            "type": "num"
        }, //Quantity

        {
            "sortable": false,
            "data": "repair_cost",
            "type": "num"
        }
    ]
});


// Handle form submission event
function approve() {
    var form = $('#frm-product-table');

    $('<input />').attr('type', 'hidden')
        .attr('name', "product_ids")
        .attr('value', checked)
        .appendTo('#frm-product-table');

    $('<input />').attr('type', 'hidden')
        .attr('name', "approve")
        .attr('value', "true")
        .appendTo('#frm-product-table');

    form.submit();
}

function disapprove() {
    var form = $('#frm-product-table');

    $('<input />').attr('type', 'hidden')
        .attr('name', "product_ids")
        .attr('value', checked)
        .appendTo('#frm-product-table');

    $('<input />').attr('type', 'hidden')
        .attr('name', "approve")
        .attr('value', "false")
        .appendTo('#frm-product-table');

    form.submit();
}