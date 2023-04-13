(function (){

    //получаем дату из url
    let params = (new URL(document.location)).searchParams;
    let urlParamDate = params.get('date');

    if (urlParamDate) {
        //если в url есть дата
        if (urlParamDate.length === 6) {
            //если в дате нет дня (ГГГГММ)
            var d = new Date(urlParamDate.slice(0, 4) + '-' + urlParamDate.slice(4));
        } else if (urlParamDate.length === 8) {
            //если в дате есть день (ГГГГММДД)
            var d = new Date(urlParamDate.slice(0, 4) + '-' + urlParamDate.slice(4, 6) + '-' + urlParamDate.slice(6));
        }
    } else {
        var d = new Date();
    }

    var Calend = function(divId) {

        //Сохраняем идентификатор div
        this.divId = divId;

        // Дни недели с понедельника
        this.DaysOfWeek = [
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
            'Вс'
        ];

        // Месяцы начиная с января
        this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        this.currMonth = d.getMonth();
        this.currYear = d.getFullYear();
        this.currDay = d.getDate();
    };

    // Переход к следующему месяцу
    Calend.prototype.nextMonth = function() {
        if ( this.currMonth == 11 ) {
            this.currMonth = 0;
            this.currYear = this.currYear + 1;
        }
        else {
            this.currMonth = this.currMonth + 1;
        }
        //редирект к следующему месяцу
        window.location.replace(window.location.pathname + '?date=' + this.currYear + (this.currMonth + 1).toString().padStart(2, '0'));
    };

    // Переход к предыдущему месяцу
    Calend.prototype.previousMonth = function() {
        if ( this.currMonth == 0 ) {
            this.currMonth = 11;
            this.currYear = this.currYear - 1;
        }
        else {
            this.currMonth = this.currMonth - 1;
        }
        //редирект к предыдущему месяцу
        window.location.replace(window.location.pathname + '?date=' + this.currYear + (this.currMonth + 1).toString().padStart(2, '0'));
    };

    // Показать текущий месяц
    Calend.prototype.showcurr = function() {
        this.showMonth(this.currYear, this.currMonth, d);
    };

    // Показать месяц (год, месяц)
    Calend.prototype.showMonth = function(y, m , d) {

        // Первый день недели в выбранном месяце
        var firstDayOfMonth = new Date(y, m, 7).getDay()
            // Последний день выбранного месяца
            , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
            // Последний день предыдущего месяца
            , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();

        var html = '<table class="second-calendar">';
        // Запись выбранного месяца и года
        html += '<thead class="second-calendar__thead"><tr class="second-calendar__tr">';
        html += '<td class="second-calendar__td" colspan="7">' + this.Months[m] + ' ' + y + '</td>';
        html += '</tr></thead>';
        // заголовок дней недели
        html += '<tr class="second-calendar__days">';
        for(var i=0; i < this.DaysOfWeek.length;i++) {
            html += '<td>' + this.DaysOfWeek[i] + '</td>';
        }
        html += '</tr>';
        // Записываем дни
        var i=1;
        do {
            var dow = new Date(y, m, i).getDay();
            // Начать новую строку в понедельник
            if ( dow == 1 ) {
                html += '<tr>';
            }
            // Если первый день недели не понедельник показать последние дни предыдущего месяца
            else if ( i == 1 ) {
                html += '<tr>';
                var k = lastDayOfLastMonth - firstDayOfMonth+1;
                for(var j=0; j < firstDayOfMonth; j++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }
            // Записываем текущий день в цикл
            var chkY = d.getFullYear();
            var chkM = d.getMonth();

            //формируем id для элементов
            let dateId = this.currYear + (this.currMonth + 1).toString().padStart(2, '0') + i.toString().padStart(2, '0');

            if (
                (!urlParamDate || urlParamDate.length === 8) //если в url нет даты или она с днем
                && chkY == this.currYear && chkM == this.currMonth && i == this.currDay
            ) {
                html += '<td class="today" id="date' + dateId + '"><a href="">' + i + '</a></td>';
            } else {
                // ссылки на дни месяца
                html += '<td class="normal" id="date' + dateId + '"><a href="">' + i + '</a></td>';
            }
            // закрыть строку в воскресенье
            if ( dow == 0 ) {
                html += '</tr>';
            }
            // Если последний день месяца не воскресенье, показать первые дни следующего месяца
            else if ( i == lastDateOfMonth ) {
                var k=1;
                for(dow; dow < 7; dow++) {
                    html += '<td class="not-current">' + k + '</td>';
                    k++;
                }
            }

            i++;
        }while(i <= lastDateOfMonth);

        // Конец таблицы
        html += '</table>';

        // Записываем HTML в div
        document.getElementById(this.divId).innerHTML = html;
    };

    // При загрузке окна
    window.onload = function() {
        // Привязываем кнопки «Следующий» и «Предыдущий»
        getId('btnNext').onclick = function() {
            c.nextMonth();
        };
        getId('btnPrev').onclick = function() {
            c.previousMonth();
        };
        // Начать календарь
        var c = new Calend("divCal");
        c.showcurr();

        //ajax, получающий события
        if (urlParamDate) {
            $.ajax({
                data: {
                    component: 'news',
                    controller: 'ajax',
                    action: 'get_events_by_date',
                    date: urlParamDate
                },
                success: (data) => {
                    let events = Array.from(data);
                    if (events) {
                        events.forEach((e) => {
                            let item = document.getElementById('date' + e.date);
                            if (item) {
                                //если есть день календаря с id формата dateГГГГММДД, к нему добавляется класс 'has_event' и меняется ссылка
                                item.classList.add('has_event');
                                item.firstElementChild.setAttribute('href', window.location.pathname + '?date=' + e.date);
                            }
                        });
                    }
                }
            });
        }

    }
    // Получить элемент по id
    function getId(id) {
        return document.getElementById(id);
    }
}())



let Dropdown = function (root = "#dropdown") {
    const rootContainer = document.querySelector(root);

    const dropdownButtons = rootContainer.querySelectorAll(
        root + " .dropdown--button"
    );
    const dropdownContainers = rootContainer.querySelectorAll(
        root + " .dropdown--container"
    );

    let _currentIndex = 0;

    const _addListener = function (target, eventType, func) {
        if (target) {
            target.addEventListener(eventType, func);
        }
    };

    const _animate = function (target, keyframes, duration, callback) {
        const animation = target.animate(keyframes, duration);
        animation.addEventListener("finish", callback);
    };

    const _handleButtonClick = function () {
        _animate(
            dropdownContainers[_currentIndex],
            [
                { opacity: 1},
                { opacity: 0},
            ],
            200,
            (e) => {
                dropdownButtons[_currentIndex].classList.remove("active");
                dropdownContainers[_currentIndex].classList.remove("active");
                _currentIndex = this.getAttribute("index");
                dropdownButtons[_currentIndex].classList.add("active");
                dropdownContainers[_currentIndex].classList.add("active");
                _animate(
                    dropdownContainers[_currentIndex],
                    [
                        { opacity: 0},
                        { opacity: 1},
                    ],
                    200,
                    {}
                );
            }
        );
    };

    const _initBlocks = function (buttons, containers) {
        if (!buttons || !containers) return 0;
        const blocksCount = buttons.length;
        for (let i = 0; i < blocksCount; i++) {
            buttons[i].setAttribute("index", i);
            buttons[i].id = `dropdown-button-${i}`;
            buttons[i].tabIndex = i + 1;
            containers[i].id = `dropdown-container-${i}`;
            containers[i].setAttribute("index", i);
            containers[i].tabIndex = -1;
        }
    };

    _initBlocks(dropdownButtons, dropdownContainers);

    dropdownButtons.forEach((button) => {
        _addListener(button, "click", _handleButtonClick);
    });
};