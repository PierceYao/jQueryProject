window.addEventListener('load', function () {
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function () {
        focus.children[0].style.display = 'block';
        focus.children[1].style.display = 'block';
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        focus.children[0].style.display = 'none';
        focus.children[1].style.display = 'none';
        timer = setInterval(function () {
            focus.children[1].click();
        }, 2000);
    });

    var picNum = focus.children[2].children.length;
    for (var i = 0; i < picNum; i++) {
        var li = document.createElement('li');
        li.setAttribute('index', i);
        focus.children[3].appendChild(li);

        focus.children[3].children[i].addEventListener('click', function () {
            for (var j = 0; j < picNum; j++) {
                focus.children[3].children[j].className = '';
            }
            this.className = 'current';

            var index = this.getAttribute('index');
            num = index;
            circle = index;
            animate(focus.children[2], -index * focusWidth);
        });
    }
    focus.children[3].children[0].className = 'current';

    var num = 0;
    var circle = 0;
    var flag = true;//节流阀
    var firstPic = focus.children[2].children[0].cloneNode(true);
    focus.children[2].appendChild(firstPic);
    focus.children[1].addEventListener('click', function () {
        if (flag) {
            flag = false;
            if (num === picNum) {
                focus.children[2].style.left = '0';
                num = 0;
            }
            num++;
            animate(focus.children[2], -num * focusWidth, function () {
                flag = true;//打开节流阀
            });

            circle++;
            if (circle === picNum) {
                circle = 0;
            }
            circleChange();
        }
    });

    focus.children[0].addEventListener('click', function () {
        if (flag) {
            if (num === 0) {
                num = focus.children[2].children.length - 1;
                focus.children[2].style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(focus.children[2], -num * focusWidth, function () {
                flag = true;//打开节流阀
            });

            circle--;
            if (circle < 0) {
                circle = picNum - 1;
            }
            circleChange();
        }
    });

    var timer = setInterval(function () {
        focus.children[1].click();
    }, 2000);

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            var step = (target - obj.offsetLeft) / 10;
            step = step >= 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft === target) {
                clearInterval(obj.timer);
                callback && callback();
            } else {
                obj.style.left = obj.offsetLeft + step + 'px';
            }
        }, 10);
    }

    function circleChange() {
        for (var j = 0; j < picNum; j++) {
            focus.children[3].children[j].className = '';
        }
        focus.children[3].children[circle].className = 'current';
    }
});