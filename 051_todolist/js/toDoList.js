$(function () {
    $('#title').on('keyup', function (e) {
        if ($(this).val() === '') {
            alert('请输入内容！');
        } else {
            if (e.key === 'Enter') {
                var local = getData();
                local.push({title: $(this).val(), done: false});
                saveData(local);
                loadData();
                $(this).val('');
            }
        }
    });

    $('ul,ol').on('click', 'a', function () {
        var data = getData();
        var index = $(this).attr('id');
        data.splice(index, 1);
        saveData(data);
        loadData();
    })

    $('ul,ol').on('click', 'input', function () {
        var data = getData();
        var index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        saveData(data);
        loadData();
    })

    function getData() {
        var data = localStorage.getItem('list');
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function saveData(data) {
        localStorage.setItem('list', JSON.stringify(data));
    }

    function loadData() {
        var data = getData();
        var todoCount = 0, doneCount = 0;
        $('ul,ol').empty();
        $.each(data, function (i, e) {
            if (e.done) {
                $('ul').prepend('<li><input type="checkbox" checked="checked"><p>' + e.title + '</p><a href="javascript:;" id="' + i + '">删除</a></li>');
                doneCount++;
            } else {
                $('ol').prepend('<li><input type="checkbox"><p>' + e.title + '</p><a href="javascript:;" id="' + i + '">删除</a></li>');
                todoCount++;
            }
        });
        $('#todocount').html(todoCount);
        $('#donecount').html(doneCount);
    }
})