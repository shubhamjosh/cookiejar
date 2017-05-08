(function ($) {
    $(window).on('load', function () {
        // custom select for Boostrap using dropdowns
        if ($('.selectpicker').length) {
            //selectlogic($(this).val());
        }
        $('.fake-submit').click(function (e) {
            $('.real-submit').click();
        });
    });

})(jQuery);

$('select#business').change(function () {
    selectlogic($(this).val());
});

function selectlogic(value) {
    if (value == '2-PO') {
        $('#remittance').removeClass('show').addClass('hide');
        $("#payment").removeAttr("required");
        $("#payment").removeClass("required");
        //$("#payment").val('0');
        $('#days input').val('');
        $('#days input').attr('required', "true");
        $('#days').show();
    } else if (value == '3-AP' || value == '4-DR') {
        $('#days').hide();
        $('#days input').removeAttr('required');
        $('#days input').val('');
        $("#payment").addClass("required");
        //$("#payment").val('0');
        $('#remittance').addClass('show');
        $("#remittance .dropdownjs input").val('Select Payment Mode*');
    } else {
        $('#remittance').removeClass('show').addClass('hide');
        //$("#payment").val('0');
        $("#payment").removeAttr("required");
        $("#payment").removeClass("required");
        $('#days').hide();
        $('#days input').removeAttr('required');
        $('#days input').val('');
    }
}

$('.submit').on('click', function (e) {
    if ($('#remittance').hasClass('show')) {
        e.preventDefault();
        if ($('#payment').val() === 0 || $('#payment').val() === '0') {
            $('#error').removeClass('hide').addClass('show');
        }
        else {
            $('#error').removeClass('show').addClass('hide');
            $('form').submit();
        }
    }
});


$('.reset').on('click', function (e) {
    $('.dropdown-menu ul li').removeClass('selected');
    $('.dropdown-menu ul li').eq(0).addClass('selected');
    $('.filter-option').text('Select');
    $('#payment').next().find('ul>li').remove();
});
