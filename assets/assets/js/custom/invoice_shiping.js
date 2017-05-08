
$.ajax({
        url:'http://api.overcart.com/api/dashboard/readytoship/'+id,
        type:'GET',
        dataType:'json',
        contentType: 'application/json',
        beforeSend:function(){
            $('#loading').show();
        },
        success:function(data){
                products = data.data;

                thead = '';

                thead += `
                            <tr>
                                <th style="width=120px;">Order No</th>
                                <th style="width=100px;">Order Date</th>
                                <th style="width=120px;">Products</th>
                                <th style="width=50px;">Shipments</th>
                                <th style="width=50px;">Couriers</th>
                                <th style="width=50px;">Conditions</th>
                                <th style="width=50px;">Order Status</th>
                                <th style=""></th>
                                <th style=""></th>
                            </tr>`;


                $('#invoice-shipping-grid thead').html(thead);

                output ='';

                for(var i =0 ,l = products.length;i<l; i++){
                    output+='<tr>';

                    output += '<td class="order_no">'+products[i].increment_id+'</td>';
                    output += '<td>'+products[i].order_date+'</td>';
                    output += '<td>'+products[i].products+'</td>';
                    output += '<td>'+products[i].shipments+'</td>';
                    output += '<td>'+products[i].couriers+'</td>';
                    output += '<td>'+products[i].conditions+'</td>';
                    output += '<td class="'+products[i].status+'">Prepare for Dispatch</td>';
                    output += '<td><button style="padding:8px;" class="btn btn-primary btn-raised shipping-label">Print Shipping Label</button></td>';
                    output += '<td><button style="padding:8px;" class="btn btn-primary btn-raised invoice-label">Print Invoice Label</button></td>';

                    output+='</tr>';
                }
                $('#invoice-shipping-grid tbody').html(output);

                $('#invoice-shipping-grid').dataTable({
                    "columnDefs": [
                        {"orderable": false, "targets": [-2, -1]}
                    ],
                    "language": {
                        "lengthMenu": "Showing _MENU_ records"
                    }
                });
                $('.dataTables_filter input').attr('placeholder','Search...');


                $('#loading').hide();
            
        },
        error:function(err){
            $('#loading').hide();
            $('.visible_sheet .alert-danger:first-child').show();
            $('.visible_sheet .alert-danger').html('Please enter a valid url');
        }
    });

$('#invoice-shipping-grid').on('click','.shipping-label',function(){
    var order_no = $(this).parents('tr').find('.order_no').text();
    document.getElementById('type').innerText = order_no+' - Shipping Label';
    $('body').addClass('overflow');
    
    $.ajax({
        url:'http://api.overcart.com/api/dashboard/getShipmentsBySeller?orderno='+order_no+'&&seller_id='+id,
        type:'GET',
        dataType:'json',
        beforeSend:function(){
            $('.pie-loader').show();
        },
        success:function(data){
            shipments = data.data;
            var shipment_action = '/client/report/print/shipping/';
            $('.action-form').attr('action',shipment_action);
            $("#select-shipment table").empty();
            $("#select-shipment table").append(`
                <thead>
                    <tr">
                        <th>Shipment#</th> 
                        <th>Warehouse</th>
                        <th>SKU</th>
                        <th>Qty</th>
                        <th></th>
                    </tr>
                </thead>`);
            output = '<tbody>';
            shipments.forEach(function(el,i){
                output += '<tr><td>'+el.shipment_id+'</td>';
                output += '<td>'+el.warehouse_name+'</td>';
                output += '<td>'+el.sku+'</td>';
                output += '<td>'+el.qty+'</td>';
                output += '<td><input type="hidden" name="shipment_id" value='+el.shipment_id+'>';
                output += '<input type="hidden" name="order_no" value='+order_no+'>';
                output += '<input type="hidden" name="qr_code" value="www.overcart.com">';
                output += '<button class="btn btn-primary btn-raised" type="submit">Print</button></td></tr>';
            });
            output += '</tbody>';
            $("#select-shipment table").append(output);
            $("#popup-data").css('display','block');
        },
        error:function(err){
            console.log(err);
            $('.alert').text('Please Check Your INTERNET Connection !!');       
        }
    });
});

$('#invoice-shipping-grid').on('click','.invoice-label',function(){
    var order_no = $(this).parents('tr').find('.order_no').text();
    document.getElementById('type').innerText = order_no+' - Invoice Label';
    $('body').addClass('overflow');
    
    $.ajax({
        url:'http://api.overcart.com/api/dashboard/getInvoiceItemsBySeller?orderno='+order_no+'&&seller=48',
        type:'GET',
        dataType:'json',
        beforeSend:function(){
                        $('.pie-loader').show();
                    },
        success:function(data){
            invoices= data.data;
            var shipment_action = '/client/report/print/invoice/';
            $('.action-form').attr('action',shipment_action);
            $("#select-shipment table").empty();
            $("#select-shipment table").append(`
                <thead>
                    <tr>
                        <th>Invoice#</th> 
                        <th>Warehouse</th>
                        <th>Seller</th>
                        <th>Total</th>
                        <th>Creation Date</th>
                        <th></th>
                    </tr>
                </thead>`);
            output = '<tbody>';
            invoices.forEach(function(el,i){
                output += '<tr><td>'+el.increment_id+'</td>';
                output += '<td>'+el.warehouse_name+'</td>';
                output += '<td>'+el.seller_name+'</td>';
                output += '<td>'+el.base_grand_total+'</td>';
                output += '<td>'+el.invoiced_at+'</td>';
                output += '<td><input type="hidden" name="invoice_no" value='+el.increment_id+'>';
                output += '<input type="hidden" name="order_no" value='+order_no+'>';
                output += '<input type="hidden" name="qr_code" value="www.overcart.com">';
                output += '<button class="btn btn-primary btn-raised" type="submit">Print</button></td></tr>';
            });
            output += '</tbody>';
            $("#select-shipment table").append(output);
            $("#popup-data").css('display','block');
        },
        error:function(err){
            console.log(err);
            $('.alert').text('Please Check Your INTERNET Connection !!');       
        }
    });
});

function printShipment(shipmentno){

    var win = window.open('/rms/print/shipping/', '_blank');
    if (win) {
        //Browser has allowed it to be opened
        //win.focus();
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }
        
}


function printInvoice(id) {

    var win = window.open('/rms/print/invoice/', '_blank');
    if (win) {
        //Browser has allowed it to be opened
        //win.focus();
        
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }

}

$('.popup-close').on('click',function(){
    $("#popup-data").css('display','none');
    $('body').removeClass('overflow');
});




// $(window).load(function(){
//     $('#invoice-shipping-grid').dataTable({
//         "language": {
//             "lengthMenu": "Showing _MENU_ records"
//         }
//     });
//     $('.dataTables_filter input').attr('placeholder','Search...');
// });