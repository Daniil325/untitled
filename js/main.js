(function () {
    function Calendar2(id, year, month) {
        var Dlast = new Date(year, month + 1, 0).getDate(),
            D = new Date(year, month, Dlast),
            DNlast = new Date(D.getFullYear(), D.getMonth(), Dlast).getDay(),
            DNfirst = new Date(D.getFullYear(), D.getMonth(), 1).getDay(),
            calendar = '<tr>',
            month = [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь',
            ];
        let offset = 0;
        if (DNfirst != 0) {
            for (var i = 1; i < DNfirst; i++) {
                calendar += '<td><p>';
                offset += 1;
            }
        } else {
            for (var i = 0; i < 6; i++) calendar += '<td><p>';
        }
        let rightsided = [];
        for (var i = 1; i <= Dlast; i++) {
            //Создаем массив с числами, которые находятся справа,
            //чтобы избежать заплыва всплывающего окна за экран
            for (var j = 1; j < 6; j++) {
                if (
                    i === 7 * j - offset ||
                    i === 7 * j - offset - 1 ||
                    i === 7 * j - offset - 2
                ) {
                    rightsided.push(i);
                }
            }
            //Если дата совпадает с сегодняшней, то даем класс today
            if (
                i == new Date().getDate() &&
                D.getFullYear() == new Date().getFullYear() &&
                D.getMonth() == new Date().getMonth()
            ) {
                calendar +=
                    '<td id="date' +
                    String(D.getFullYear()) +
                    (String(D.getMonth() + 1) < 10
                        ? String('0' + (D.getMonth() + 1))
                        : String(D.getMonth() + 1)) +
                    (i < 10 ? String('0' + i) : String(i)) +
                    '"><p>' +
                    i;
            } else {
                //Проверяем, попадает ли дата в правосторонние
                if (rightsided.includes(i)) {
                    calendar +=
                        '<td class="rightsided" id="date' +
                        String(D.getFullYear()) +
                        (String(D.getMonth() + 1) < 10
                            ? String('0' + (D.getMonth() + 1))
                            : String(D.getMonth() + 1)) +
                        (i < 10 ? String('0' + i) : String(i)) +
                        '"><p>' +
                        i;
                } else {
                    calendar +=
                        '<td id="date' +
                        String(D.getFullYear()) +
                        (String(D.getMonth() + 1) < 10
                            ? String('0' + (D.getMonth() + 1))
                            : String(D.getMonth() + 1)) +
                        (i < 10 ? String('0' + i) : String(i)) +
                        '"><p>' +
                        i;
                }
            }
            if (new Date(D.getFullYear(), D.getMonth(), i).getDay() == 0) {
                calendar += '<tr>';
            }
        }
        for (var i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
        document.querySelector('#' + id + ' tbody').innerHTML = calendar;
        document.querySelector('#' + id + ' thead td:nth-child(2)').innerHTML =
            month[D.getMonth()] + ' ' + D.getFullYear();
        document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.month =
            D.getMonth();
        document.querySelector('#' + id + ' thead td:nth-child(2)').dataset.year =
            D.getFullYear();
        if (document.querySelectorAll('#' + id + ' tbody tr').length < 6) {
            document.querySelector('#' + id + ' tbody').innerHTML +=
                '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
        }
    }

    Calendar2('calendar2', new Date().getFullYear(), new Date().getMonth());
    Calendar2('calendar3', new Date().getFullYear(), new Date().getMonth() + 1);
    Calendar2('calendar4', new Date().getFullYear(), new Date().getMonth() + 2);

    //Пример массива с событиями
    let events = [{ "id": 0, "date": "20240302", "events": [{ "title": "\u041e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u0430 \u043f\u043e \u043c\u0430\u0442\u0435\u043c\u0430\u0442\u0438\u043a\u0435 \u00ab\u0424\u043e\u0440\u043c\u0443\u043b\u0430 \u0443\u0441\u043f\u0435\u0445\u0430\u00bb", "url": "\/news\/47528\/" }, { "title": "\u041e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u0430 \u0448\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u043f\u043e \u043f\u0440\u043e\u0433\u0440\u0430\u043c\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044e \u00ab\u0418\u043d\u0444\u043e\u0440\u043c\u0430\u0442\u0438\u043a\u0430+\u00bb", "url": "\/news\/47529\/" }] }, { "id": 1, "date": "20240307", "events": [{ "title": "\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u043b\u0438\u043d\u0438\u044f \u043f\u043e \u0432\u043e\u043f\u0440\u043e\u0441\u0430\u043c \u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f \u0432 \u0418\u041d\u0413\u0415\u041e", "url": "\/news\/47802\/" }, { "title": "\u0413\u043e\u0440\u044f\u0447\u0430\u044f \u043b\u0438\u043d\u0438\u044f \u043f\u043e \u0432\u043e\u043f\u0440\u043e\u0441\u0430\u043c \u043f\u043e\u0441\u0442\u0443\u043f\u043b\u0435\u043d\u0438\u044f \u0432 \u0418\u0426\u0422\u042d\u0424", "url": "\/news\/47803\/" }] }, { "id": 2, "date": "20240310", "events": [{ "title": "\u041f\u0440\u043e\u0431\u043d\u044b\u0439 \u0415\u0413\u042d \u043f\u043e \u0445\u0438\u043c\u0438\u0438", "url": "\/news\/47778\/" }, { "title": "\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u044d\u0442\u0430\u043f \u0422\u043e\u043b\u0441\u0442\u043e\u0432\u0441\u043a\u043e\u0439 \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b \u0448\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u043f\u043e \u0438\u0441\u0442\u043e\u0440\u0438\u0438 \u2013 2023", "url": "\/news\/47849\/" }, { "title": "\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u044d\u0442\u0430\u043f \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b \u00ab\u0411\u0443\u0434\u0443\u0449\u0438\u0435 \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u0438 \u2013 \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u043d\u0430\u0443\u043a\u0438\u00bb \u043f\u043e \u0445\u0438\u043c\u0438\u0438", "url": "\/news\/47850\/" }] }, { "id": 3, "date": "20240320", "events": [{ "title": "\u041e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u0430 \u0448\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u043f\u043e \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u043e\u043c\u0443 \u044f\u0437\u044b\u043a\u0443", "url": "\/news\/47537\/" }] }, { "id": 4, "date": "20230212", "events": [{ "title": "\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u044d\u0442\u0430\u043f \u0422\u043e\u043b\u0441\u0442\u043e\u0432\u0441\u043a\u043e\u0439 \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b \u0448\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u043f\u043e \u043e\u0431\u0449\u0435\u0441\u0442\u0432\u043e\u0437\u043d\u0430\u043d\u0438\u044e", "url": "\/news\/47893\/" }, { "title": "\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u044d\u0442\u0430\u043f \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b \u00ab\u0411\u0443\u0434\u0443\u0449\u0438\u0435 \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u0438 \u2013 \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u043d\u0430\u0443\u043a\u0438\u00bb \u043f\u043e \u0438\u0441\u0442\u043e\u0440\u0438\u0438", "url": "\/news\/47895\/" }] }, { "id": 5, "date": "20230218", "events": [{ "title": "\u0414\u0435\u043d\u044c \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u043a\u043e\u043b\u043b\u0435\u0434\u0436\u0430 \u0410\u043b\u0442\u0413\u0423", "url": "\/news\/47708\/" }, { "title": "\u0414\u0435\u043d\u044c \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u043a\u043e\u043b\u043b\u0435\u0434\u0436\u0430 \u0410\u043b\u0442\u0413\u0423 \u2013 2023", "url": "\/news\/47903\/" }] }, { "id": 6, "date": "20230219", "events": [{ "title": "\u0414\u0435\u043d\u044c \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u0432 \u0438\u043d\u0441\u0442\u0438\u0442\u0443\u0442\u0435 \u0431\u0438\u043e\u043b\u043e\u0433\u0438\u0438 \u0438 \u0431\u0438\u043e\u0442\u0435\u0445\u043d\u043e\u043b\u043e\u0433\u0438\u0438", "url": "\/news\/47990\/" }, { "title": "\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u044d\u0442\u0430\u043f \u0422\u043e\u043b\u0441\u0442\u043e\u0432\u0441\u043a\u043e\u0439 \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b \u0448\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u043f\u043e \u043f\u0440\u0430\u0432\u0443", "url": "\/news\/48016\/" }] }, { "id": 7, "date": "20230223", "events": [{ "title": "\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0442\u0443\u0440 \u0412\u0441\u0435\u0441\u0438\u0431\u0438\u0440\u0441\u043a\u043e\u0439 \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b \u0448\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u043f\u043e \u0445\u0438\u043c\u0438\u0438", "url": "\/news\/48117\/" }] }, { "id": 8, "date": "20230227", "events": [{ "title": "\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u044d\u0442\u0430\u043f \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b \u0448\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u00ab\u0411\u0443\u0434\u0443\u0449\u0438\u0435 \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u0438 \u2013 \u0431\u0443\u0434\u0443\u0449\u0435\u0435 \u043d\u0430\u0443\u043a\u0438\u00bb \u043f\u043e \u0431\u0438\u043e\u043b\u043e\u0433\u0438\u0438", "url": "\/news\/48119\/" }] }, { "id": 9, "date": "20230310", "events": [{ "title": "\u0414\u0435\u043d\u044c \u043e\u0442\u043a\u0440\u044b\u0442\u044b\u0445 \u0434\u0432\u0435\u0440\u0435\u0439 \u043c\u0430\u0433\u0438\u0441\u0442\u0440\u0430\u0442\u0443\u0440\u044b \u044e\u0440\u0438\u0434\u0438\u0447\u0435\u0441\u043a\u043e\u0433\u043e \u0438\u043d\u0441\u0442\u0438\u0442\u0443\u0442\u0430 \u0410\u043b\u0442\u0413\u0423", "url": "\/news\/48084\/" }] }, { "id": 10, "date": "20230411", "events": [{ "title": "\u041e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u0430 \u0418\u0413\u041d \u0410\u043b\u0442\u0413\u0423 \u043f\u043e \u043f\u0435\u0434\u0430\u0433\u043e\u0433\u0438\u043a\u0435 \u0434\u043b\u044f \u043e\u0431\u0443\u0447\u0430\u044e\u0449\u0438\u0445\u0441\u044f \u043f\u0435\u0434\u0430\u0433\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u043a\u043e\u043b\u043b\u0435\u0434\u0436\u0435\u0439", "url": "\/news\/48112\/" }] }];

    if (events) {
        events.forEach((e) => {
            let item = document.querySelector(String('#date' + e.date));
            if (item) {
                item.classList.add('event', 'js_date');
                item.setAttribute('date', e.date);
                //Popup
                let popup = document.createElement('div');
                popup.id = 'popup' + e.date;
                popup.classList.add('events-popup');
                //Popup header
                let header = document.createElement('span');
                header.classList.add('popup-header');
                header.innerHTML = 'События дня';
                popup.appendChild(header);
                //List
                let list = document.createElement('ul');
                list.classList.add('popup-list');
                popup.appendChild(list);
                //List items
                e.events.forEach((i) => {
                    let event = document.createElement('li');
                    event.classList.add('popup-event');
                    //Link
                    let url = document.createElement('a');
                    url.href = i.url;
                    url.text = String(i.title);
                    event.appendChild(url);
                    list.appendChild(event);
                });
                item.appendChild(popup);
            }
        });
    }

    (function () {
        let dates_arr = document.querySelectorAll('.js_date');
        dates_arr.forEach((date) => {
            date.addEventListener('click', (e) => {
                window.location.href =
                    '/news/calendar/?date=' + String(date.id.split('date')[1]);
            });
        });
    })();

    (function () {
        let dates_arr = document.querySelectorAll('.js_date');
        dates_arr.forEach((date) => {
            let popup = document.querySelector(
                '#popup' + String(date.id.split('date')[1])
            );
            if (popup) {
                date.addEventListener('mouseenter', (e) => {
                    popup.style.display = 'block';
                });
                date.addEventListener('mouseleave', (e) => {
                    popup.style.display = 'none';
                });
            }
        });
    })();

})();

(function () {
    let calendars = document.querySelectorAll('.calendar-item');
    let currentIndex = 0;

    const next = document.getElementById('calNext');
    const prev = document.getElementById('calPrev');
    let dots = document.querySelectorAll('.calendar--dot');

    //���������� �������� ������� � ���������
    function activeItem(currentIndex) {
        dots.forEach((d) => {
            d.classList.remove('active');
        });
        dots[currentIndex].classList.add('active');
    }

    //���������� ������ ���������
    function handlePrev() {
        currentIndex - 1 < 0 ? (currentIndex = 2) : (currentIndex -= 1);
        activeItem(currentIndex);
        showCalendar(currentIndex);
    }
    //���������� ������ ����������
    function handleNext() {
        (currentIndex + 1) % 3 === 0 ? (currentIndex = 0) : (currentIndex += 1);
        activeItem(currentIndex);
        showCalendar(currentIndex);
    }
    //��������� �������
    if (next) {
        next.addEventListener('click', (e) => {
            handleNext();
        });
    }
    if (prev) {
        prev.addEventListener('click', (e) => {
            handlePrev();
        });
    }

    //������� ����������� ��������� ���������
    function showCalendar(index) {
        calendars.forEach((c) => {
            c.classList.add('d-none');
        });
        calendars[index].classList.remove('d-none');
        calendars[index].classList.add();
    }

    function initCalendars() {
        //��� ������ ������ 992px ����� ������ ���� ���������
        if (window.innerWidth < 992) {
            if (calendars) {
                //�������� ����� ��� �������������
                showCalendar(0);
            }
        } else {
            //���������� ��� ���������
            if (calendars) {
                calendars.forEach((c) => {
                    c.classList.remove('d-none');
                    c.classList.add();
                });
            }
        }
    }
    //���������������� ��������� ��� �������� �������� � ��� ��������� ������
    window.addEventListener('DOMContentLoaded', initCalendars, false);
    window.addEventListener('resize', initCalendars, false);
})();

$(document).ready(function () {
    $('.slider').slick({
        arrows: true,
        dots: false,
        slidesToShow: 2,
        speed: 1000,
        responsive: [
            {
                breakpoint: 1150,
                settings: {
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});

$(document).ready(function () {
    $('.preview_slider').slick({
        arrows: true,
        dots: false,
        slidesToShow: 1,
        speed: 1000,
        responsive: [
            {
                breakpoint: 1168,
                settings: {
                    arrows: false,
                }
            }
        ]
    });
});

const menu = document.querySelector('.menuBurger');
const menuItems = document.querySelectorAll('.menuItem');
const hamburger = document.querySelector('.header-burger-button');
const closeIcon = document.querySelector('.closeBurgerMenu');
const menuIcon = document.querySelector('.openBurgerMenu');

function toggleMenu() {
    if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
        closeIcon.style.display = 'none';
        menuIcon.style.display = 'block';
    } else {
        menu.classList.add('showMenu');
        closeIcon.style.display = 'block';
        menuIcon.style.display = 'none';
    }
}

hamburger.addEventListener('click', toggleMenu);


(function () {
    document.addEventListener('DOMContentLoaded', (e) => {
        document.getElementById('open-search-form').addEventListener('click', (e) => {
            document.getElementById('search-form').classList.toggle('header-search_block_open')
        })
    })
})();


(function () {
    var v = document.getElementsByClassName("youtube-player");
    for (var n = 0; n < v.length; n++) {
        var p = document.createElement("div");
        var id = v[n].getAttribute("data-id");

        var placeholder = v[n].hasAttribute("data-thumbnail")
            ? v[n].getAttribute("data-thumbnail")
            : "";

        if (placeholder.length) p.innerHTML = createCustomThumbail(placeholder);
        else p.innerHTML = createThumbail(id);

        v[n].appendChild(p);
        p.addEventListener("click", function () {
            var parent = this.parentNode;
            createIframe(parent, parent.getAttribute("data-id"));
        });
    }

    function createCustomThumbail(url) {
        return (
            '<img class="youtube-thumbnail" src="' +
            url +
            '" alt="Youtube Preview" /><div class="youtube-play-btn"></div>'
        );
    }

    function createThumbail(id) {
        return (
            '<img class="youtube-thumbnail" src="//i.ytimg.com/vi_webp/' +
            id +
            '/maxresdefault.webp" alt="Youtube Preview"><div class="youtube-play-btn"></div>'
        );
    }

    function createIframe(v, id) {
        var iframe = document.createElement("iframe");
        iframe.setAttribute(
            "src",
            "//www.youtube.com/embed/" +
            id +
            "?autoplay=1&color=white&autohide=2&modestbranding=1&border=0&wmode=opaque&enablejsapi=1&showinfo=0&rel=0"
        );
        iframe.setAttribute("frameborder", "0");
        iframe.setAttribute("class", "youtube-iframe");
        iframe.setAttribute("loading", "lazy");
        v.firstChild.replaceWith(iframe);
    }
})();

(function (){
    let btn = document.querySelector('.play-button')
    let videoImage = document.querySelector('.video-image')
    let videoFrame = document.querySelector('.video-frame')
    btn.addEventListener('click', (e) => {
        videoImage.classList.add('none')
        videoFrame.classList.remove('none')
        btn.classList.add('none')
    })
})();

