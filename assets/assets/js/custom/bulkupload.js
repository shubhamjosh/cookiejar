$('.rms-final-submit').click(function (event) {
    $('#insert-data').submit();
});



$(window).load(function () {
    $('#uploaded-product-table').DataTable({
        "dom": 'rtip',
        "pageLength": 25
    });
});

rowData = row.replace(/&#39;/g,'"').replace(/&lt;/g,'"<').replace(/&gt;/g,'>"').replace(/"None"/g,'None').replace(/None/g,'"None"');

newRowRecord = JSON.parse(rowData);

$('input').on('keyup',function(e){
    var row_id  = $(this).attr('data-row-id');
    var key = $(this).attr('data-key');
    newRowRecord[row_id][row_id][key] = $(this).val();
    convertObject(newRowRecord);
});

var withoutChange = [];

for(var i = 0,l=newRowRecord.length;i<l;i++){
    for(var key in newRowRecord[i]){
        withoutChange.push(newRowRecord[i][key]);
    }
}

var  array = [];

function convertObject(newRowRecord){
    
    var finalArray = [];
    for(var i = 0,l=newRowRecord.length;i<l;i++){
        for(var key in newRowRecord[i]){
            finalArray.push(newRowRecord[i][key]);
        }
    }
    array = finalArray;
}

function updateCache() {
    $('#loading').show();
    $.ajax({
        url: updateCacheUrl,
        data: JSON.stringify({
            "data": (array === undefined || array.length === 0) ? withoutChange : array
        }),
        type: "POST",
        contentType : "application/json",
        success: function (data) {
            if (data.response === "success") {
                $('#loading').hide();
                $('#update-data').submit();
            }
        }
    });
}

setTimeout(function () {
    $('.panel-ctrls>i').remove();
}, 400);

var header  = $('header').height();
var heading_top  = $('.panel-heading').offset();

var width_of_header =0;
var heading_width = 0;

var sidebar_width_collapsed =(64 + ($('.editable-grid').outerWidth() - $('.editable-grid').width())/2);
var header_width_collapsed =$(window).width() - (64 + ($('.editable-grid').outerWidth() - $('.editable-grid').width())/2) - ($('.editable-grid').outerWidth() - $('.editable-grid').width())/2;

var sidebar_width =($('.static-sidebar').width() + ($('.editable-grid').outerWidth() - $('.editable-grid').width())/2);
var header_width =$(window).width() - ($('.static-sidebar').width() + ($('.editable-grid').outerWidth() - $('.editable-grid').width())/2) - ($('.editable-grid').outerWidth() - $('.editable-grid').width())/2;

function calcWidth(){

    if($('body').hasClass('sidebar-collapsed')){
        width_of_header = sidebar_width_collapsed;
        heading_width = header_width_collapsed;
        //return width_of_header;
    }
    else{
        width_of_header = sidebar_width;
        heading_width = header_width;
        //return width_of_header;
    }
}

calcWidth();

var scroll =heading_top.top - header;

var heading_height = $('.panel-heading').height();


var parent_wrapper = document.createElement("DIV");
parent_wrapper.className = 'parent_wrapper';

var panel = document.createElement("DIV");

panel.className = 'panel';

var wrapper = document.createElement("DIV");

wrapper.className = 'panel-heading-fixed panel-heading';

var fixed_header = $('.editable-grid').find('.panel>div').eq(0).html();

wrapper.innerHTML += fixed_header;

parent_wrapper.style.position = 'absolute';
parent_wrapper.style.top = heading_top.top+'px';
parent_wrapper.style.left = width_of_header+'px';
parent_wrapper.style.width = heading_width+'px';
parent_wrapper.style.zIndex = '99';
parent_wrapper.style.transitionDuration = '300ms';


panel.appendChild(wrapper);

parent_wrapper.appendChild(panel);

document.body.appendChild(parent_wrapper);


$('.close').on('click',function(e){
    e.preventDefault();
    heading_top.top -= $('.alert').outerHeight(true);
    scroll -= $('.alert').outerHeight(true);
    parent_wrapper.style.top = heading_top.top+'px';
    $(this).parent().hide();
});


$('#trigger-sidebar').on('click',function(){
    calcWidth();
    parent_wrapper.style.left = width_of_header+'px';
    parent_wrapper.style.width = heading_width+'px';
});

$(window).on('scroll',function(){
   if($(window).scrollTop() >= scroll){
        calcWidth();
        $('.parent_wrapper').css({'position':'fixed','top':header+'px','left':width_of_header+'px','transition-duration':'0ms'});
    }
    else{
        calcWidth();
        $('.parent_wrapper').css({'position':'absolute','top':heading_top.top+'px','left':width_of_header+'px','transition-duration':'300ms'});
    }
});


$(window).load(function(){
    calcWidth();
    parent_wrapper.style.left = width_of_header+'px';
    parent_wrapper.style.width = heading_width+'px';
});
