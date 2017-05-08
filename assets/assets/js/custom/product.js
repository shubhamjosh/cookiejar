var catalog_data;

$('#warehouse').on('change', function () {
    $(this).attr('readonly', true);
    $(this).parent().find('.dropdownjs > input.focus ~ ul').addClass('hide');
    $('.unfreeze-warehouse a').removeClass('freezed');
    $(this).parent().find('input').addClass('freezed');
});

$('.unfreeze-warehouse').click(function () {
    $("#warehouse").removeAttr('readonly');
    $('.unfreeze-warehouse a').addClass('freezed');
    $('#warehouse').parent().find('input').removeClass('freezed');
    $('#warehouse').next().find('ul').removeClass('hide');
});

function eanSearch() {
    $('#loading').show();
    console.log("Hello");
    var idnumber = $('#id_uid').val();
    if (idnumber !== '') {
        $.ajax({
                type: "GET",
                url: "http://services.overcart.com/catalog/products/uid/" + idnumber,
                success: function (data) {
                    if (data.data.length > 0) {
                        catalog_data = data.data[0];
                        $("#myModal").modal({backdrop: true});
                        $("#modalTitle").text(data.product_name);

                        var output = '';
                        output += '<p> UPC : ' + catalog_data.upc + '</p>';
                        output += '<p> EAN : ' + catalog_data.ean + '</p>';
                        output += '<p> Product Name : ' + catalog_data.title + '</p>';
                        output += catalog_data.color === '' ? '' : '<p>' +
                        ' Color : ' + catalog_data.color.name + '</p>';
                        output += catalog_data.brand === '' ? '' : '<p>' +
                        ' Brand : ' + catalog_data.brand.name + '</p>';

                        $("#modalContent").html(output);
                        if (required.length == list.length) {
                            $('.submit').removeClass('disabled').attr('disabled', false);
                        }
                        else {
                            $('.submit').addClass('disabled').attr('disabled', true);
                        }
                    } else {
                        $('#error-msg').slideDown().removeClass('hide');
                        setTimeout(function () {
                            $('#error-msg').addClass('hide');
                        }, 3000);
                    }
                },
                error: function (data) {
                    $('#error-msg').slideDown().removeClass('hide');
                    setTimeout(function () {
                        $('#error-msg').addClass('hide');
                    }, 3000);
                }
            }
        );
    }
    $('#loading').hide();
}

function update() {
    $("#id_product_name").val(catalog_data.title);
    $("#id_color").val(catalog_data.color.name);
    $("#id_manufacturer").val(catalog_data.brand.name);
    $("#id_catalog_product_id").val(catalog_data.id);
    autoChangeInputLabelPosition();
}

function resetform() {
    $("#id_uid").val("");
    $("#id_product_name").val("");
    $("#id_client_sku").val("");
    $("#id_quantity").val("");
    $("#id_color").val("");
    $("#id_model").val("");
    $("#id_manufacturer").val("");
    $("#id_catalog_product_id").val("");
    autoChangeInputLabelPosition();
}

$("#id_manufacturer").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "http://services.overcart.com/catalog/brands",
            dataType: "json",
            data: {
                featureClass: "P",
                style: "full",
                maxRows: 12,
                name: request.term
            },
            success: function (data) {
                response($.map(data.data, function (item) {
                    return {
                        label: item.name,
                        value: item.name
                    }
                }));
            }
        });
    },
    messages: {
        noResults: '',
        results: function () {
        }
    },
    minLength: 2
});

$("#id_color").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "http://services.overcart.com/catalog/colors",
            dataType: "json",
            data: {
                featureClass: "P",
                style: "full",
                maxRows: 12,
                name: request.term
            },
            success: function (data) {
                response($.map(data.data, function (item) {
                    return {
                        label: item.name,
                        value: item.name
                    }
                }));
            }
        });
    },
    messages: {
        noResults: '',
        results: function () {
        }
    },
    minLength: 2
});

$("#id_product_name").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "http://services.overcart.com/catalog/products",
            dataType: "json",
            data: {
                featureClass: "P",
                style: "full",
                maxRows: 12,
                title: request.term
            },
            success: function (data) {
                response($.map(data.data, function (item) {
                    return {
                        label: item.title,
                        value: item.title
                    }
                }));
            }
        });
    },
    messages: {
        noResults: '',
        results: function () {
        }
    },
    minLength: 2
});