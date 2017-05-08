function showimage(x, y, z) {

    if (z == 'pdf') {
        $("#pic_test").attr("src", '');
        $("#pdf").removeClass("hidden");
        $("#pdf").attr("href", x);
    }
    else {

        $("#pdf").addClass("hidden");
        $("#pic_test").attr("src", x);
    }
}
function check_size(fileid, attach) {
    var myFile = document.getElementById(fileid);
    var size = myFile.files[0].size;
    if (size >= (20971520)) {
        alert("file size is : " + parseFloat(size / (1000 * 1000)).toFixed(2) + " MB " + ".Please try uploading smaller files (max : 20MB )");
    }
    else {
        // setting changed input file name
        document.getElementById(attach).value = myFile.value;
        k = document.getElementById(attach).innerHTML = document.getElementById(attach).value.replace(/C:\\fakepath\\/i, '');
    }
}

//panel company control edit
$("#edit_company_details").click(function () {
    $("#edit_company_details").addClass('hidden');
    $("#cancel_company_details").removeClass('hidden');
    $("#id_pan_number").prop('disabled', false);
    $("#id_vat_number").prop('disabled', false);
    $("#id_landmark").prop('disabled', false);
    $("#save_company_details_btn").removeClass('hidden');
    $("#cancel_company_details_btn").removeClass('hidden');
    $("#greyout-pan").removeClass('greyout');
    $("#id_address_1").prop('disabled', false);
    $("#id_address_2").prop('disabled', false);
    $("#id_pincode").prop('disabled', false);
    $("#id_state-selectized").prop('disabled', false);
    $("#id_state-selectized").attr('disabled', false);
    $("#state_drop").next().find('input').removeClass('greyout');
    $("" +
        "" +
        "" +
        "#id_city").prop('disabled', false);
    $("#existing_state").addClass('highlighted');
    $("#state_name").addClass('hidden');
    $("#state-div").show();
    $("#id_file").prop('disabled', false);
    $('label[for="state_name"]').hide();


});

$("#cancel_basic_details_btn").click(function () {
    document.location.reload(true);

});


$("#cancel_company_details_btn").click(function () {
    document.location.reload(true);

});


// panel company control cancel
$("#cancel_company_details").click(function () {
    $("#edit_company_details").removeClass('hidden');
    $("#save_company_details_btn").addClass('hidden');
    $("#cancel_company_details").addClass('hidden');
    $("#cancel_company_details_btn").addClass('hidden');
    $("#pan").prop('disabled', true);
    $("#greyout-pan").addClass('greyout');
    $("#primary_address").prop('disabled', true);
    $("#pincode").prop('disabled', true);
});


//panel  basic control edit
$("#edit_basic_details").click(function () {
    $("#edit_basic_details").addClass('hidden');
    $("#cancel_basic_details").removeClass('hidden');
    $("#mobilenumber").prop('disabled', false);
    $("#mobile_label").addClass('highlighted');
    $("#save_basic_details_btn").removeClass('hidden');
    $("#save_basic_details_btn").prop('disabled', false);
    $("#cancel_basic_details_btn").removeClass('hidden');

});

//panel basic control cancel

$("#cancel_basic_details").click(function () {
    $("#edit_basic_details").removeClass('hidden');
    $("#save_basic_details_btn").addClass('hidden');
    $("#cancel_basic_details").addClass('hidden');
    $("#cancel_basic_details_btn").addClass('hidden');
    $("#mobilenumber").prop('disabled', true);

});

// on save basic details
// $("#save_basic_details_btn").click(function () {
//     $("#save_basic_details_btn").addClass('hidden');
//     $("#cancel_basic_details_btn").addClass('hidden');
//
// });

$('#pan_id').on("change", function () {
    $('#pan_comment').addClass('hidden');


});

$('.panel-ctrls').on('click', '.button-icon.has-bg', function () {
    $(this).parents('.panel-ctrls').find('.edit').toggleClass('hide');
});