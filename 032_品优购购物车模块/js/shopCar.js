$(function () {
    $('.checkall').change(function () {
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
        if ($(this).prop('checked') === true) {
            $('.cart-item').css('background', '#fff4e8');
        } else {
            $('.cart-item').css('background', '#fff');
        }
        getTotal();
    });

    $('.j-checkbox').change(function () {
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
        if ($(this).prop('checked') === true) {
            $(this).parents('.cart-item').css('background', '#fff4e8');
        } else {
            $(this).parents('.cart-item').css('background', '#fff');
        }
        getTotal();
    });

    $('.increment').click(function () {
        var num = $(this).siblings('.itxt').val();
        var priceStr = $(this).parents('.p-num').siblings('.p-price').html().substring(1);
        var price = parseFloat(priceStr);
        num++;
        $(this).siblings('.itxt').val(num);
        $(this).parents().siblings('.p-sum').html('￥' + (price * num).toFixed(2));
        getTotal();
    });

    $('.decrement').click(function () {
        var num = $(this).siblings('.itxt').val();
        var priceStr = $(this).parents('.p-num').siblings('.p-price').html().substring(1);
        var price = parseFloat(priceStr);
        num--;
        if (num <= 1) {
            $(this).siblings('.itxt').val(1);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + price.toFixed(2));
        } else {
            $(this).siblings('.itxt').val(num);
            $(this).parents('.p-num').siblings('.p-sum').html('￥' + (price * num).toFixed(2));
        }
        getTotal();
    });

    $('.itxt').change(function () {
        var num = $(this).val();
        var priceStr = $(this).parents('.p-num').siblings('.p-price').html().substring(1);
        var price = parseFloat(priceStr);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (price * num).toFixed(2));
        getTotal();
    });

    function getTotal() {
        var count = 0, total = 0;
        $('.itxt').each(function (i, e) {
            if ($(e).parents('.p-num').siblings('.p-checkbox').children('.j-checkbox').prop('checked') === true) {
                count += parseInt($(e).val());
            }
        });
        $('.amount-sum em').text(count);

        $('.p-sum').each(function (i, e) {
            var value = $(e).text().substring(1);
            if ($(e).siblings('.p-checkbox').children('.j-checkbox').prop('checked') === true) {
                total += parseFloat(value);
            }
        });
        $('.price-sum em').text('￥' + total.toFixed(2));
    }

    $('.p-action').click(function () {
        $(this).parents('.cart-item').remove();
        getTotal();
    });

    $('.remove-batch').click(function () {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getTotal();
    });

    $('.clear-all').click(function () {
        $(this).parents('.cart-floatbar').siblings('.cart-item-list').remove();
        getTotal();
    });
})