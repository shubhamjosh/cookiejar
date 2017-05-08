var form;

$('.edit-warehouse').on('click', function () {
    $(".form-tin_number").val($(this).parents('.warehouse-list').find(".tin").text()).attr('readonly', 'readonly').removeClass('is-empty');
    $(".form-warehouse-name").val($(this).parents('.warehouse-list').find(".warehouse-name").text()).attr('readonly', 'readonly');
    $(".form-plot-number").val($(this).parents('.warehouse-list').find(".plot").text()).attr('readonly', 'readonly');
    $(".form-address-1").val($(this).parents('.warehouse-list').find(".address1").text()).attr('readonly', 'readonly');
    $(".form-address-2").val($(this).parents('.warehouse-list').find(".address2").text()).attr('readonly', 'readonly');
    $(".form-landmark").val($(this).parents('.warehouse-list').find(".landmark").text()).attr('readonly', 'readonly');
    $(".form-city").val($(this).parents('.warehouse-list').find(".city").text()).attr('readonly', 'readonly');
    $(".form-pincode").val($(this).parents('.warehouse-list').find(".pincode").text()).attr('readonly', 'readonly');
    $(".form-poc-name").val($(this).parents('.warehouse-list').find(".poc_name").text());
    $(".form-poc-contact").val($(this).parents('.warehouse-list').find(".poc_contact").text());
    $("#id_poc_landline").val($(this).parents('.warehouse-list').find(".poc_landline").text());
    var state_id = $(this).parents('.warehouse-list').find(".state-id").text();
    $("#state").val(state_id).trigger('change');
    $("#state").attr('disabled', true);
    $("#state").next().find('input').attr('readonly', 'readonly');
    $('#tin_file').prop('required', false);
    $('#tin_id').removeAttr('required');
    $('.selectize-input').click();
    setTimeout(function () {
        $('.option').each(function () {
            if ($(this).attr('data-value') == state_id) {
                $(this).click();
                return false;
            }
        });
        $('#state').removeClass('selectize');
        $('.selectize-dropdown').addClass('hidden');
        $('.selectize-input .item').css('color', '#BDBDBD');
    }, 400);
    var aTag = document.getElementById("warehouse-file");
    aTag.setAttribute('href', $(this).parents('.warehouse-list').find(".warehouse-file-url").text());
    aTag.setAttribute('class', "form-control");
    aTag.removeAttribute("hidden");
    aTag.innerHTML = "Warehouse Tin Image";
    autoChangeInputLabelPosition();
    $(".form-warehouse-id").val($(this).parents('.warehouse-list').find(".warehouse-id").text());
    $('.edit-true').val("true");
    $('html, body').animate({
        scrollTop: $("#div-add-product").offset().top - 90
    }, 1500);
    $('.submit').removeClass('disabled');
    autoChangeInputLabelPosition();
});

$('.reset-warehouse').click(function () {
    reset();
});

function reset() {
    $("#warehouse-file").removeClass('form-control');
    $("#warehouse-file").attr("hidden","true");
    $(".form-tin_number").val("").attr("readonly", false);
    $(".form-warehouse-name").val("").attr("readonly", false);
    $(".form-plot-number").val("").attr("readonly", false);
    $(".form-address-1").val("").attr("readonly", false);
    $(".form-address-2").val("").attr("readonly", false);
    $(".form-landmark").val("").attr("readonly", false);
    $(".form-city").val("").attr("readonly", false);
    $(".form-pincode").val("").attr("readonly", false);
    $(".form-poc-name").val("");
    $(".form-poc-contact").val("");
    $(".form-poc-landline").val("");
    $("#state").attr("readonly", false);
    $("#state").next().find('input').attr("readonly", false);;
    $("#state").val("").trigger('change');
    $(".form-warehouse-id").val("");
    $('.edit-true').val("false");
    $('.submit').attr('required', true).attr('disabled', true).addClass('disabled');
    $('#state').addClass('selectize');
    $('.selectize-dropdown').removeClass('hidden');
    $('input#addon3').val('');
    $('.selectize-input .item').html('');
    $('.selectize-input .item').attr('data-value', '');
    $('#state option').remove();
    $('#tin_id').prop('required', 'required');
    $('.selectize-input .item').css('color', 'inherit');
    autoChangeInputLabelPosition();
}

$('.reset-bank').click(function () {
    $("#bank-cheque-file").removeClass('form-control');
    $("#bank-cheque-file").attr("hidden","true");
    $('input[name="is_primary"]').removeAttr('checked');
    $('input[name="name"]').attr("readonly", false);
    $('input[name="account_holder_name"]').attr("readonly", false);;
    $('input[name="account_number"]').attr("readonly", false);;
    $('input[name="ifsc_code"]').attr("readonly", false);;
    $('input[name="file"]').attr('required', true);
    $('input[name="bank_id"]').val("");

});


$("#btn-add-product").click(function () {
    reset();
    $('html, body').animate({
        scrollTop: $("#div-add-product").offset().top - 90
    }, 500);
});

$('.deactivate-account').on('click', function () {
    form = $(this).parents('.account-list').find("#frm-deactivate-account");
    $('#account-name-for-change').text($(this).parents('.account-list').find('.bank-name').text());
    $('#account-action-change').text("deactivated");
});

$('.activate-account').on('click', function () {
    form = $(this).parents('.account-list').find("#frm-activate-account");
    $('#account-name-for-change').text($(this).parents('.account-list').find('.bank-name').text());
    $('#account-action-change').text("activated");
});

$('.deactivate-warehouse').on('click', function () {
    form = $(this).parents('.warehouse-list').find("#frm-deactivate-warehouse");
    $('#warehouse-name-for-change').text($(this).parents('.warehouse-list').find('.warehouse-name').text());
    $('#action-change').text("deactivated");
});

$('.confirm').on('click', function () {
    form.submit();
});


$('.activate-warehouse').on('click', function () {
    form = $(this).parents('.warehouse-list').find("#frm-activate-warehouse");
    $('#warehouse-name-for-change').text($(this).parents('.warehouse-list').find('.warehouse-name').text());
    $('#action-change').text("activated");
});

$('.deactivate-profile').on('click', function () {
    form = $(this).parents('.profile-list').find("#frm-deactivate-profile");
    $('#profile-name-for-change').text($(this).parents('.profile-list').find('.bank-name').text());
    $('#profile-action-change').text("deactivated");
});


$('.activate-profile').on('click', function () {
    form = $(this).parents('.profile-list').find("#frm-activate-profile");
    $('#profile-name-for-change').text($(this).parents('.profile-list').find('.bank-name').text());
    $('#profile-action-change').text("activated");
});


$('.warehouse_status').on('change', function () {

    var parent = this.parentNode.parentNode.children[1].value;
    $('#form_warehouse_id').val($(this).val());
    $('#form_hidden_id').val(parent);
    $('#form_previous_status').val($('#previous_status').val());
    $('#form_new_status').val($(this).find('option:selected').text());
    $('#form_warehouse_name').val($('#warehouse_name').val());
    $('.modal-body').html('<h4>Are you sure want to change <strong>' + $('#warehouse_name').val() + '</strong> warehouse\'s status from <strong>' + $('#previous_status').val() + '</strong> to <strong>' + $(this).find('option:selected').text() + '</strong></h4>');
    $('.open-form').click();
});

$(window).load(function () {
    $('#warehouse-grid').dataTable({
        "language": {
            "lengthMenu": "Showing _MENU_ records"
        }
    });
});

$('#primary_account').change(function (e) {
    if ($(this).is(":checked")) {
        //'checked' event code
        if (!confirm('This will overwrite your current primary profile selection.')) {
            $(this).attr('checked', false);
        }
    }
});

function showimage(x, y) {
    $("#pic_test").attr("src", x);
    $("#doc_type").attr("value", y);
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

$('.edit-bank').click(function (e) {
    e.preventDefault();
    var bid = $(this).attr('data-ac-bid');
    var ac_number = $(this).attr('data-ac-number');
    var bank_name = $(this).attr('data-ac-bank');
    var ac_holder_name = $(this).attr('data-ac-name');
    var name = $(this).attr('data-ac-bank');
    var ifsc = $(this).attr('data-ac-ifsc');
    var file = $(this).attr('data-file');
    var is_primary = $(this).attr('data-is-primary');


    $('input[name="bank_id"]').val(bid);
    $('input[name="account_number"]').val(ac_number).attr('readonly', 'readonly');
    $('input[name="account_holder_name"]').val(ac_holder_name).attr('readonly', 'readonly');
    $('input[name="ifsc_code"]').val(ifsc).attr('readonly', 'readonly');

    if (is_primary === "True") {
    $('#id_is_primary').prop('checked', true);
    } else {
    $('#id_is_primary').prop('checked', false);
    }

    $('#bank_name').val(name).attr('readonly', 'readonly');
    $('input[name="file"]').prop('required', false);
    $("#bank_name").val(bank_name).attr('readonly', 'readonly');
    var aTag = document.getElementById("bank-cheque-file");
    aTag.setAttribute('href', file);
    aTag.setAttribute('class', "form-control");
    aTag.removeAttribute("hidden");
    aTag.innerHTML = "Cancelled Cheque Image";
    autoChangeInputLabelPosition();
});


