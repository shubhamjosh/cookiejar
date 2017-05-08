$.ajax({
            url:'http://api.overcart.com/api/dashboard/clientPerformance?client_id='+client_id,
            type:'GET',
            dataType:'json',
            contentType: 'application/json',
            beforeSend:function(){
                $('#loading').show();
            },
            success:function(data){
                    datas = data.data;

                    output ='';

                    for(var j =0 ,l = datas.length;j<l; j++){
                        output += '<tr>';
                        output += '<td>'+datas[j].order_no+'</td>';
                        output += '<td>'+datas[j].product_name+'</td>';
                        output += '<td>'+datas[j].qc_status+'</td>';
                        output += '<td>'+datas[j].lstatus+'</td>';
                        output += '<td>'+datas[j].tprice+'</td>';
                        output += '<td>'+(datas[j].payment_made_client === 1 ? "Paid" : "Not Paid")+'</td>';
                        output += '<td>'+(datas[j].po_number === null ? '' :datas[j].po_number)+'</td>';
                        output+='</tr>';
                    }

                    $('#view-products-grid tbody').html(output);

                    $('#view-products-grid').dataTable({
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