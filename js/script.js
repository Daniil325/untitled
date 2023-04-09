
(function(){
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
})();

(function () {
    (function () {
        let dropdown = document.querySelectorAll(".dropdown");
        let menu_items = document.querySelectorAll(".dropdown .menu li a");
        let links = document.querySelectorAll(".dropdown h2 a");

        dropdown.forEach((item) => {
            item.addEventListener("mouseenter", (e) => {
                if (item.classList.contains("closed")) {
                    item.classList.remove("closed");
                }
            });

            item.addEventListener("mouseleave", (e) => {
                if (!item.classList.contains("closed")) {
                    item.classList.add("closed");
                }
            });

            item.addEventListener("touchstart", (e) => {
                e.preventDefault();
                if (item.classList.contains("closed")) {
                    item.classList.remove("closed");
                }
            });
        });

        menu_items.forEach((item) => {
            item.addEventListener("touchend", (e) => {
                let href = e.target.getAttribute("href");
                window.location.href = href;
            });
        });

        document.addEventListener("touchstart", (e) => {
            links.forEach((link) => {
                if (!(e.target === link)) {
                    if (!link.parentNode.parentNode.classList.contains("closed")) {
                        link.parentNode.parentNode.classList.add("closed");
                    }
                }
            });
        });
    })();

    // PARALLAX FUNCTIONALITY
    (function () {
        function throttle(fn, wait) {
            var time = Date.now();
            return function () {
                if (time + wait - Date.now() < 0) {
                    fn();
                    time = Date.now();
                }
            };
        }

        function goodParallax() {
            let scrolled = window.pageYOffset;
            let wrappers = document.querySelectorAll(".parallax-wrapper");
            wrappers.forEach((wrapper) => {
                let offset = Math.abs(wrapper.offsetTop - window.innerHeight / 2);
                let objects = wrapper.querySelectorAll(".parallax-object");
                objects.forEach((object) => {
                    let speed = object.dataset.speed;
                    let coords = (scrolled - offset) * speed + "px";
                    object.style.transform = "translateY(-" + coords + ")";
                });
            });
        }

        window.addEventListener("scroll", throttle(goodParallax, 14));
    })();

    // OWL CAROUSEL
    $(".slider-container_slide").owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        items: 1,
        singleItem: true,
        nav: false,
        dots: true,
        lazyLoad: true,
        center: true,
        autoplay: false,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
    });

    $(".announces-carousel").each(function () {
        $(this).owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            dots: false,
            autoplay: false,
            autoplayTimeout: 2000,
            autoplayHoverPause: true,
            responsive: {
                0: {
                    items: 1,
                },
                992: {
                    items: this.dataset.owlItems || 2,
                },
            },
        });
    });

    // YOUTUBE VIDEO PLACEHOLDER
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
                "https://www.youtube.com/embed/w9ADQI2_sjw" +
                "?autoplay=1&color=white&autohide=2&modestbranding=1&border=0&wmode=opaque&enablejsapi=1&showinfo=0&rel=0"
            );
            iframe.setAttribute("frameborder", "0");
            iframe.setAttribute("class", "youtube-iframe");
            iframe.setAttribute("loading", "lazy");
            v.firstChild.replaceWith(iframe);
        }
    })();

    // tabs

    let $tabs = $("[data-tab-name]");
    if ($tabs.length > 0) {
        let tabsRef = document.querySelectorAll("[data-tab-ref]");
        $tabs.on("click", function () {
            $tabs.removeClass("active");
            this.classList.add("active");
            tabsRef.forEach((el) => {
                el.style.display =
                    this.dataset.tabName == el.dataset.tabRef ? "flex" : "none";
            });
        });
    }

    // search

    let $searchInput = $("#header-search");
    $searchInput.closest("form").on("submit", function () {
        return !!$searchInput.val();
    });
})();

//Modal script
/*(function () {
    (function () {
        if (typeof window.CustomEvent === "function") return false;
        function CustomEvent(event, params) {
            params = params || { bubbles: false, cancelable: false, detail: null };
            var evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(
                event,
                params.bubbles,
                params.cancelable,
                params.detail
            );
            return evt;
        }
        window.CustomEvent = CustomEvent;
    })();

    (function () {
        var $modal = function (options) {
            var _elemModal,
                _eventShowModal,
                _eventHideModal,
                _hiding = false,
                _destroyed = false,
                _animationSpeed = 200;

            function _createModal(options) {
                var elemModal = document.createElement("div"),
                    modalTemplate =
                        '<div class="modal__backdrop" data-dismiss="modal"><div class="modal__content"><div class="modal__header"><div class="modal__title" data-modal="title">{{title}}</div><span class="modal__btn-close" data-dismiss="modal" title="Закрыть">×</span></div><div class="modal__body" data-modal="content">{{content}}</div>{{footer}}</div></div>',
                    modalFooterTemplate = '<div class="modal__footer">{{buttons}}</div>',
                    modalButtonTemplate =
                        '<button type="button" class="{{button_class}}" data-handler={{button_handler}}>{{button_text}}</button>',
                    modalHTML,
                    modalFooterHTML = "";

                elemModal.classList.add("modal");
                modalHTML = modalTemplate.replace(
                    "{{title}}",
                    options.title || "Новое окно"
                );
                modalHTML = modalHTML.replace("{{content}}", options.content || "");
                if (options.footerButtons) {
                    for (
                        var i = 0, length = options.footerButtons.length;
                        i < length;
                        i++
                    ) {
                        var modalFooterButton = modalButtonTemplate.replace(
                            "{{button_class}}",
                            options.footerButtons[i].class
                        );
                        modalFooterButton = modalFooterButton.replace(
                            "{{button_handler}}",
                            options.footerButtons[i].handler
                        );
                        modalFooterButton = modalFooterButton.replace(
                            "{{button_text}}",
                            options.footerButtons[i].text
                        );
                        modalFooterHTML += modalFooterButton;
                    }
                    modalFooterHTML = modalFooterTemplate.replace(
                        "{{buttons}}",
                        modalFooterHTML
                    );
                }
                modalHTML = modalHTML.replace("{{footer}}", modalFooterHTML);
                elemModal.innerHTML = modalHTML;
                document.body.appendChild(elemModal);
                return elemModal;
            }

            function _showModal() {
                if (!_destroyed && !_hiding) {
                    _elemModal.classList.add("modal__show");
                    document.dispatchEvent(_eventShowModal);
                }
            }

            function _hideModal() {
                _hiding = true;
                _elemModal.classList.remove("modal__show");
                _elemModal.classList.add("modal__hiding");
                setTimeout(function () {
                    _elemModal.classList.remove("modal__hiding");
                    _hiding = false;
                }, _animationSpeed);
                document.dispatchEvent(_eventHideModal);
            }

            function _handlerCloseModal(e) {
                if (e.target.dataset.dismiss === "modal") {
                    _hideModal();
                }
            }

            _elemModal = _createModal(options || {});

            _elemModal.addEventListener("click", _handlerCloseModal);
            _eventShowModal = new CustomEvent("show.modal", { detail: _elemModal });
            _eventHideModal = new CustomEvent("hide.modal", { detail: _elemModal });

            return {
                show: _showModal,
                hide: _hideModal,
                destroy: function () {
                    _elemModal.parentElement.removeChild(_elemModal),
                        _elemModal.removeEventListener("click", _handlerCloseModal),
                        (destroyed = true);
                },
                setContent: function (html) {
                    _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
                },
                setTitle: function (text) {
                    _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
                },
            };
        };

        const content = document.getElementById("callModalContent");
        let contentHTML = "";
        if (content) {
            contentHTML = content.innerHTML;
        }
        if (content) {
            content.remove();
        }
        var modal = $modal({
            title: "Заказать звонок",
            content: contentHTML,
        });

        const showButton = document.querySelector("#showCallModal");
        if (showButton) {
            showButton.addEventListener("click", function (e) {
                modal.show();
            });
        }

        const showButtonFromMenu = document.querySelector("#showCallModalFromMenu");
        if (showButtonFromMenu) {
            showButtonFromMenu.addEventListener("click", function (e) {
                modal.show();
            });
        }

        const showButtonFromProg = document.querySelector("#showCallModalFromPrograms");
        if (showButtonFromProg) {
            showButtonFromProg.addEventListener("click", function (e) {
                modal.show();
            });
        }

        (function(modal){
            let $form = $(".callModalFormWrapper form");
            if ($form.length) {

                let $inputs = $form.find(":input");
                let $alertError = $('.callModalErrorAlert');
                let $alertSuccess = $('.callModalSuccessAlert');

                $form.on("submit", function () {
                    let data = Object.fromEntries(new FormData($form[0]));
                    data.component = "conferences";
                    data.controller = "ajax";
                    data.settings = "questions";
                    data.action = "registration";

                    $inputs.prop("disabled", true);

                    $.post("/ajax/", data, function (response) {
                        if (response) {
                            if (response.result == "success") {
                                $alertSuccess.addClass("show");
                                setTimeout(function () {
                                    $alertSuccess.removeClass("show");
                                    $form[0].reset();
                                    $inputs.prop("disabled", false);
                                    modal.hide();
                                }, 3000);

                            } else { // error
                                if (response.validate) {
                                    $inputs.filter((i, input) => {
                                        return response.validate[input.name] && !response.validate[input.name].is_valid;
                                    }).addClass("invalid");
                                }
                                $alertError.addClass("show").children('<p>');
                                if (response.message) $alertError.html(response.message);
                                setTimeout(function () {
                                    $alertError.removeClass("show");
                                    $inputs.prop("disabled", false);
                                }, 3000);
                            }
                        }
                    });
                    return false;
                });
            }
        })(modal);

    })();

})();*/


(function() {
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
                calendar += '<td>';
                offset += 1;
            }
        } else {
            for (var i = 0; i < 6; i++) calendar += '<td>';
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
                    '<td class="today" id="date' +
                    String(D.getFullYear()) +
                    (String(D.getMonth() + 1) < 10
                        ? String('0' + (D.getMonth() + 1))
                        : String(D.getMonth() + 1)) +
                    (i < 10 ? String('0' + i) : String(i)) +
                    '">' +
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
                        '">' +
                        i;
                } else {
                    calendar +=
                        '<td id="date' +
                        String(D.getFullYear()) +
                        (String(D.getMonth() + 1) < 10
                            ? String('0' + (D.getMonth() + 1))
                            : String(D.getMonth() + 1)) +
                        (i < 10 ? String('0' + i) : String(i)) +
                        '">' +
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
    let events = [{"id":0,"date":"20230402","events":[{"title":"\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0442\u0443\u0440 \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b &laquo;\u0413\u0440\u0430\u043d\u0438\u0442 \u043d\u0430\u0443\u043a\u0438&raquo; \u043f\u043e \u0445\u0438\u043c\u0438\u0438","url":"\/news\/48597\/"}]},{"id":1,"date":"20230409","events":[{"title":"\u041f\u0440\u043e\u0431\u043d\u044b\u0439 \u0415\u0413\u042d \u043f\u043e \u0444\u0438\u0437\u0438\u043a\u0435","url":"\/news\/48435\/"}]},{"id":2,"date":"20230411","events":[{"title":"\u041e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u0430 \u0418\u0413\u041d \u0410\u043b\u0442\u0413\u0423 \u043f\u043e \u043f\u0435\u0434\u0430\u0433\u043e\u0433\u0438\u043a\u0435 \u0434\u043b\u044f \u043e\u0431\u0443\u0447\u0430\u044e\u0449\u0438\u0445\u0441\u044f \u043f\u0435\u0434\u0430\u0433\u043e\u0433\u0438\u0447\u0435\u0441\u043a\u0438\u0445 \u043a\u043e\u043b\u043b\u0435\u0434\u0436\u0435\u0439","url":"\/news\/48112\/"}]},{"id":3,"date":"20230422","events":[{"title":"\u0424\u0438\u043d\u0430\u043b \u043a\u043e\u043d\u043a\u0443\u0440\u0441\u0430 \u0438\u0441\u0441\u043b\u0435\u0434\u043e\u0432\u0430\u0442\u0435\u043b\u044c\u0441\u043a\u0438\u0445 \u0440\u0430\u0431\u043e\u0442 \u0434\u043b\u044f \u0448\u043a\u043e\u043b\u044c\u043d\u0438\u043a\u043e\u0432 \u00ab\u042d\u041a\u041e\u041b\u041e\u0413\u0438\u042f\u00bb","url":"\/news\/48581\/"}]},{"id":4,"date":"20230428","events":[{"title":"\u0417\u0430\u043a\u043b\u044e\u0447\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0442\u0443\u0440 \u043e\u043b\u0438\u043c\u043f\u0438\u0430\u0434\u044b \u043f\u043e \u0430\u043d\u0433\u043b\u0438\u0439\u0441\u043a\u043e\u043c\u0443 \u044f\u0437\u044b\u043a\u0443 \u00ab\u041f\u043e\u043a\u043e\u0440\u0438 \u0443\u043d\u0438\u0432\u0435\u0440\u0441\u0438\u0442\u0435\u0442\u00bb","url":"\/news\/48145\/"}]}];

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

//Слайдер
(function () {
    let calendars = document.querySelectorAll('.calendar-item');
    let currentIndex = 0;

    const next = document.getElementById('calNext');
    const prev = document.getElementById('calPrev');
    let dots = document.querySelectorAll('.calendar--dot');

    //Отображает активный элемент в навигации
    function activeItem(currentIndex) {
        dots.forEach((d) => {
            d.classList.remove('active');
        });
        dots[currentIndex].classList.add('active');
    }

    //Обработчик кнопки следующий
    function handlePrev() {
        currentIndex - 1 < 0 ? (currentIndex = 2) : (currentIndex -= 1);
        activeItem(currentIndex);
        showCalendar(currentIndex);
    }
    //Обработчик кнопки предыдущий
    function handleNext() {
        (currentIndex + 1) % 3 === 0 ? (currentIndex = 0) : (currentIndex += 1);
        activeItem(currentIndex);
        showCalendar(currentIndex);
    }
    //Слушатели событий
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

    //Функция отображения активного календаря
    function showCalendar(index) {
        calendars.forEach((c) => {
            c.classList.add('hide-class');
        });
        calendars[index].classList.remove('hide-class');
    }

    function initCalendars() {
        //При ширине меньше 992px будет только один календарь
        if (window.innerWidth < 992) {
            if (calendars) {
                //Вызываем сразу при инициализации
                showCalendar(0);
            }
        } else {
            //Отображаем все календари
            if (calendars) {
                calendars.forEach((c) => {
                    c.classList.remove('hide-class');
                });
            }
        }
    }
    //Реинициализируем календари при загрузке контента и при изменении ширины
    window.addEventListener('DOMContentLoaded', initCalendars, false);
    window.addEventListener('resize', initCalendars, false);
})();


