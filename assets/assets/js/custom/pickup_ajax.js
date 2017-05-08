$('.add-product').on('click', function (e) {
    e.preventDefault();
    window.location.href = "/rms/product/add/";
});


var table = $('#pickup-grid').DataTable({

    "bProcessing": true,
    "bServerSide": true,
    "dom": 'lrtip',
    "sAjaxSource": '/api/pickup/ajax/',
    "aLengthMenu": [
        [25, 50, 100, 200, -1],
        [25, 50, 100, 200, "All"]
    ],
    "initComplete": function (response) {
        $('#loading').hide();
        if (response._iRecordsDisplay > 0) {
            $('#pickup-panel').fadeIn('fast');
        } else {
            $('#no-results-panel').fadeIn('slow');
        }
    },
    "language": {
        "infoFiltered": "",
        "paginate": {
            "first": "First",
            "last": "Last",
            "next": "Next",
            "previous": "Previous"
        }
    },
    "aoColumns": [
        {
            "bSortable": false,
            "mData": "lot_id"
        }, //Product name

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
            "mData": "color"
        }, //Model

        {
            "bSortable": true,
            "mData": "qty"
        }, //Quantity

        {
            "bSortable": false,
            "mData": "op_center_name"
        }, //warehouse id

        {
            "bSortable": false,
            "mData": "client"
        }, //warehouse id

        {
            "bSortable": true,
            "mData": "date(created_at)"
        } //warehouse id
    ]
});

$("#pickup-grid").on('page.dt', function() {
    $('.parent-checkbox-single').find('i').removeClass('checked');
});

var $parentWidth = $('.panel-body').innerWidth();

$('#pickup-grid thead th').each(function () {

    var title = $('#pickup-grid thead th').eq($(this).index()).text().toLowerCase();

    if ($(this).hasClass('text')) {
        $(this).css({'width': (($parentWidth) / 7) + 'px'});
        $(this).html('<input style= "width:100%;" type="text" class="search' + title + ' form-control" placeholder="Search ' + title + '" />');
    }
});

table.columns().eq(0).each(function (colIdx) {

    $('input', table.column(colIdx).header()).on('keyup change', function () {
        table
            .column(colIdx)
            .search(this.value)
            .draw();
    });

});
