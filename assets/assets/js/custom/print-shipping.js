var val;
var name;
var mode;
var flag;

$.ajax({
        url:'http://api.overcart.com/api/dashboard/shippingLabel',
        type:'POST',
        data: JSON.stringify(apiData),
        crossDomain: true,
        dataType:'json',
        beforeSend:function(){
            //$('.graph-loader').show();
        },
        success:function(data){
        	val = data.data;

          val.forEach(function(el,i){
            if(el.firstname != null) name = el.firstname;
            if(el.middlename != null) name = name + ' ' + el.middlename;
            if(el.lastname != null) name = name + ' ' + el.lastname;
            if(el.company == null) el.company = '';

            if(el.method == 'purchaseorder'){
              mode = 'Purchase Order';
              flag = 'PAID';
            }

            if(el.method == 'cashondelivery'){
              mode = 'Cash on delivery';
              flag = 'Cash On Delievery<br>Rs. '+el.price;
            }

            if(el.method == 'payucheckout_shared' || el.method == 'm2epropayment' || el.method == 'paytm_cc' || el.method == 'paywithamazon' || el.method == 'payumoney_shared' || el.method == 'firstdataicici'){
              mode = 'Prepaid';
              flag = 'PAID';
            }


            $(".innerAll").append(
            `<div style="border: 3px solid #000;position:relative;width:100%;padding: 20px 20px;">
                <div class="barcodeAWB" style="position:relative;left:-14pt;"></div>
                <div style="padding: 10px 0px 0px;"><strong>Ship To:</strong><strong>AWB: `+el.track_number+`</strong>
                </div>
                <div style="float:left">
                  <p>`+name+`</p>
                  <p>`+el.company+`</p>
                  <p>`+el.street+`</p>
                  <p>`+el.city+" "+ el.postcode+`</p>
                  <p>`+el.region + ", " +el.country_id+`</p>
                  <p>Ph : `+ el.telephone+`</p>
                </div>
                <div style="float:right; font-size:40px">
                `+flag+`
                </div>
                <div style="margin-top:150px;">
                  <table style="padding: 0px 5px 0px 0px;border: 1px solid;width: 100%;">
                  <tr>
                    <td rowspan = 6 class = "vertical barcodeOrder"></td>
                  </tr>
                  <tr>
                    <td><strong>Items Sold by `+el.seller_name+` on www.overcart.com</strong></td>
                  </tr>
                  <tr>
                    <td>`+el.hardware_type+`</td>
                  </tr>
                  <tr>
                    <td>`+mode+`</td>
                  </tr>
                  <tr>
                    <td><strong> weight (in gms) : </strong>`+parseInt(el.weight)+`</td>
                  </tr>
                  <tr>
                    <td><strong>Return Address: </strong><br>`+el.address+`<br>VAT/TIN: `+el.tinno+`</td>
                  </tr>
                  </table>
                </div>
                <div style="margin:50px 0px;">
                  <table style="padding: 10px 5px 5px 0px;border: 1px solid;width:100%;">
                  <tr>
                    <td class="qrcode" style=" width: 20%; text-align: -webkit-center;"></td>
                    <td>The Unboxed Superstore<br/>Visit www.overcart.com for daily deals on unboxed & refurbished products</td>
                  </tr>
                  </table>
                </div>
              </div>`);

           	$(".barcodeAWB").barcode(
  				    el.track_number, // Value barcode (dependent on the type of barcode)
  				    "code128", // type (string)
              {barWidth:2, barHeight:60}
  			    );
      			$(".barcodeOrder").barcode(
      				el.increment_id, // Value barcode (dependent on the type of barcode)
      				"code128" // type (string)
            );
            $('.qrcode').qrcode({width: 72,height: 72,text: "www.overcart.com"});

          });
          var raw_html = $('.innerAll').html();
          var form = `<form method="POST" hidden action="/rms/print/shippingLabel/">
                        <input type="textarea" name="raw_html" value='`+raw_html+`'>
                        <input type="text" name="shipping_id" value=`+shipmentId+`
                        <input type="submit" name="submit">
                    </form>`;
          document.body.innerHTML += form;
          $('form').submit();
        },
        error:function(err){
            console.log(err);
            $('.alert').text('Unable to Print. Please Check Your INTERNET Connection !!');
        }
    });