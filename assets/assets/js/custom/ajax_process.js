$('#loading').hide();


products = products.replace(/&#39;/g,'"').replace(/&lt;/g,'"<').replace(/&gt;/g,'>"').replace(/"None"/g,'None').replace(/None/g,'"None"');
products = JSON.parse(products);
var products_data = products.filter(function (el) {
  return el.warehouse__name === first_warehouse;
});
product_data(products_data);


$('#warehouses').on('change',function(e){
    var first_warehouse = $(this).find('option:selected').text();
    $('#loading').show();
    setTimeout(function(){
        $('#loading').hide();
    },1500);
    $('.all_id').val('');
    products_data = products.filter(function (el) {
      return el.warehouse__name === first_warehouse;
    });
    product_data(products_data);
});

function product_data(products){

    $('#product-table-grid').html('');

    var output = '<table id="product-grid" class="display text-center table table-striped table-bordered dynamicTable" cellspacing="0" width="100%"><thead>';

    for(var h = 0;h<1;h++){
        output += '<tr>';
        output += '<th><div class="checkbox parent-checkbox-single' +
            ' checkbox-single margin-none">' +
            '<label class="checkbox-custom">' +
            '<i class="fa fa-fw fa-square-o"></i>' +
            '<input type="checkbox"></label></div></th>';
        output += '<th style="width:250px;">Product Name</th>';
        output += '<th>Model</th>';
        output += '<th>Color</th>';
        output += '<th>Manufacturer</th>';
        output += '<th>SKU</th>';
        output += '<th>Source</th>';
        output += '<th>Quantity</th>';
        output += '</tr>';
    }

    output += '</thead><tbody>';

    for(var i =0;i<products.length;i++){
        output += '<tr>';
        output += '<td><div data-id="' + products[i].ids + '" class="checkbox checkbox-single margin-none">';
        output += '<label class="checkbox-custom">';
        output += '<i class="fa fa-fw fa-square-o"></i>';
        output += '<input name="checks[]" type="checkbox" value="">';
        output += '</label></div></td>';

        output += '<td>'+products[i].product_name+'</td>';
        output += '<td>'+products[i].model+'</td>';
        output += '<td>'+products[i].color+'</td>';
        output += '<td>'+products[i].manufacturer+'</td>';
        output += '<td>'+products[i].client_sku+'</td>';
        output += '<td>'+products[i].source__name+'</td>';
        output += '<td>'+products[i].quantity+'</td>';

        output += '</tr>';
    }

    output += '</tbody></table>';

    $('#product-table-grid').html(output);

    $('#product-grid').dataTable({
        "order": [[1, "asc"]],
        "columnDefs": [
            {"orderable": false, "targets": 0}
        ],
        "language": {
            "lengthMenu": "Showing _MENU_ records"
        }
    });
    $('.dataTables_filter input').attr('placeholder','Search...');


}