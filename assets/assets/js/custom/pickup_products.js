var table = $('#product-grid').DataTable({

    "bProcessing": true,
    "bServerSide": true,
    "sAjaxSource": '/api/pickup/products/ajax/',
    "aLengthMenu": [
        [25, 50, 100, 200, -1],
        [25, 50, 100, 200, "All"]
    ],

    "aoColumns": [
        {
            "bSortable": false,
            "mData": "cpu_id",
            "mRender": function (data, type, full) {
                return '<input name="checkbox[]" type="checkbox" class="checkbox-new" value="' + data + '"> ';
            }
        }, //Checkbox

        {
            "bSortable": false,
            "mData": "cpu_id",
            "mRender": function (data, type, full) {
                return '<a href="' + data + '" > ' + data + ' </a>';
            }
        }, //id

        {
            "bSortable": false,
            "mData": "product_name"
        }, //Product name

        {
            "bSortable": false,
            "mData": "model"
        }, //Model

        {
            "bSortable": false,
            "mData": "client_sku"
        }, //SKU

        {
            "bSortable": true,
            "mData": "quantity"
        }, //Quantity

        {
            "bSortable": true,
            "mData": "product_id"
        }, //Product id

        {
            "bSortable": true,
            "mData": "wh_id"
        }, //warehouse id
    ]
});


var $parentWidth = $('.widget-inverse').innerWidth();

$('#product-grid thead td').each(function () {

    var title = $('#product-grid thead th').eq($(this).index()).text().toLowerCase();

    if ($(this).hasClass('text')) {

        $(this).css({'width': (($parentWidth) / 7) + 'px'});
        $(this).html('<input style= "width:100%;" type="text" class="search' + title + '" placeholder="Search ' + title + '" />');
    }

    if ($(this).hasClass('select')) {
        var list = $('<select class="search' + title + '"><option value=""></option>').appendTo($(this).empty());

        var sql_array = client;

        if (title == 'client') {
            sql_array = client;
        }
        else if (title == 'category') {
            sql_array = categories;
        }
        else if (title == 'brand') {
            sql_array = brand;
        }
        else if (title == 'colour') {
            sql_array = color;
        }

        for (var j = 0; j < sql_array.length; j++) {
            var obj = sql_array[j];
            var tog = false;
            var val1;
            var val2;

            for (var key in obj) {
                if ((title != 'location' && key == 'id') || (title == 'location' && key == 'code')) {
                    val1 = obj[key];
                }
                if ((title != 'operation center' && key == 'name') || (title == 'operation center' && key == 'opcenter_code')) {
                    val2 = obj[key];
                }
            }
            list.append('<option value="' + val1 + '">' + val2 + '</option>');
        }

        list.append('</select>');
    }
});


table.columns().eq(0).each(function (colIdx) {

    $('input', table.column(colIdx).header()).on('keyup change', function () {
        table
            .column(colIdx)
            .search(this.value)
            .draw();
    });

    $('select', table.column(colIdx).header()).on('keyup change', function () {
        table
            .column(colIdx)
            .search(this.value)
            .draw();
    });

});
