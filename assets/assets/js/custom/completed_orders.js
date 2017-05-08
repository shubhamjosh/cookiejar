$.ajax({
        url:'http://api.overcart.com/api/dashboard/clientPerformance?client_id='+client_id,
        type:'GET',
        dataType:'json',
        contentType: 'application/json',
        beforeSend:function(){
            $('#loading').show();
        },
        success:function(data){
                datas = data.products;
                $('#loading').hide();
                output ='';

                for(var j =0 ,l = datas.length;j<l; j++){
                    output += '<tr>';
                    output += '<td>'+datas[j].purchase_date+'</td>';
                    output += '<td>'+datas[j].order_number+'</td>';
                    output += '<td>'+datas[j].product_name+'</td>';
                    output += '<td>'+datas[j].code+'</td>';
                    output += '<td>'+datas[j].imei+'</td>';
                    output+='</tr>';
                }
                $('#sold-products-grid tbody').html(output);

                $('#sold-products-grid').dataTable({
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
