$(document).ready(function(){

    // Мобильная верста якобы
    
    $(() => {
        var width = $(window).width();
        if (width < 780) {

            
            $('.block_five .block_five_universal .five_universal_left').html('<img src="images/landing/girl_mini.png">');

            $('.carousel_item').show();

            $('.six_white_block_table_left .white_table_item').remove();
            $('.six_white_block_table_left .white_table_horizontal_splin').remove();

            var splin = '<div class="white_table_horizontal_splin"></div>'

            $('.six_white_block_table_left').append(`
                <div class="white_table_item">
                    <p>Research</p>
                    <p>We do fast and efficient market research and pre-selection</p>
                </div>
            `);
            $('.six_white_block_table_left').append(splin);
            $('.six_white_block_table_left').append(`
                <div class="white_table_item">
                    <p>Primal Interview</p>
                    <p>We do screening of the Candidates and evaluation for relevancy and risk analysis purposes</p>
                </div>
            `);
            $('.six_white_block_table_left').append(splin);
            $('.six_white_block_table_left').append(`
                <div class="white_table_item">
                    <p>Cross Posting</p>
                    <p>We do Cross Posting of your Vacancy in our Social Network: Twitter, Facebook, Telegram</p>
                </div>
            `);
            $('.six_white_block_table_left').append(splin);
            $('.six_white_block_table_left').append(`
                <div class="white_table_item">
                    <p>E-mail blasting</p>
                    <p>We send away e-mails to relevant contacts within our expert database</p>
                </div>
            `);
            $('.six_white_block_table_left').append(splin);
            $('.six_white_block_table_left').append(`
                <div class="white_table_item">
                    <p>Database</p>
                    <p>You may also use our existing expert Database (test mode)</p>
                </div>
            `);
            $('.six_white_block_table_left').append(splin);
            $('.six_white_block_table_left').append(`
                <div class="white_table_item">
                    <p>Presentation</p>
                    <p>We act as your Ambassador, presenting your vacancy and project. We excite the people!</p>
                </div>
            `);
            $('.six_white_block_table_left').append(splin);
            $('.six_white_block_table_left').append(`
                <div class="white_table_item">
                    <p> </p>
                    <p>For our clients we intent to be more than just a Recruitment. Together with HR Services we provide with Complimentary Marketing to strengthen an Employer Brand.</p>
                </div>
            `);

            var len = $('.block_rewiews_item').length
            var left = -250
            var z= 5;
            for (i=0; i < len; i++){
                $('.block_rewiews_item:eq('+i+')').css({'margin-left':`${left}px`, 'z-index': z});
                z-=1;
                left += 20;
            }
            
        } else {
            
        }
    });
    // Выпадающий многостроковый список! - Собственная разработка 
    $('.select_modal_button').on('click', (e) => {
        $('.select_modal_items').hide();

        if ($(e.delegateTarget).find('div').attr('class') == 'arrow-top') {
            $(e.delegateTarget).find('div').attr('class', 'arrow-bottom');
            $(e.delegateTarget.parentElement).find('.select_modal_items').hide();
        } else {
            $(e.delegateTarget).find('div').attr('class', 'arrow-top');
            $(e.delegateTarget.parentElement).find('.select_modal_items').show();
        }
        e.stopPropagation();
    });
    $('#parameter_notifications').on('click', (e) => {
        $('.select_modal_items').hide();
        $('.select_modal_button div').attr('class', 'arrow-bottom');
    });
    $('.select_modal_items').on('click', (e) => {
        var cl = e.target.className.split(' ');
        if (cl[1] == 'selected_all_sil') {
            var status = $(e.delegateTarget.parentElement).find('.select_items_ckeck_all').prop('checked');
            if (!status){
                $(e.delegateTarget.parentElement).find('.select_items_ckeck').prop('checked', true);
            } else{
                $(e.delegateTarget.parentElement).find('.select_items_ckeck').prop('checked', false);
            }
        }
        var len_check = $(e.delegateTarget.parentElement).find('.select_items_ckeck:checked').length;
        var len = $(e.delegateTarget.parentElement).find('.select_items_ckeck').length;
        $(e.delegateTarget.parentElement).find('.select_modal_button span').text(`Выбрано ${len_check} из ${len} элементов`);

        e.stopPropagation();
    });
    $('.select_items_ckeck').on('change', (e) => {
        var cl = e.target.parentElement.className.split(' ');
        if (cl[1] == 'selected_all_sil') {
            var status = $(e.delegateTarget.parentElement.parentElement).find('.select_items_ckeck_all').prop('checked');
            if (!status){
                $(e.delegateTarget.parentElement.parentElement).find('.select_items_ckeck').prop('checked', true);
            } else{
                $(e.delegateTarget.parentElement.parentElement).find('.select_items_ckeck').prop('checked', false);
            }
        }
        var len_check = $(e.delegateTarget.parentElement).find('.select_items_ckeck:checked').length;
        var len = $(e.delegateTarget.parentElement).find('.select_items_ckeck').length;
        $(e.delegateTarget.parentElement).find('.select_modal_button span').text(`Выбрано ${len_check} из ${len} элементов`);
    });

    // Скрипт Календаря
    function Calendar2(id, year, month) {
        var Dlast = new Date(year,month+1,0).getDate(),
            D = new Date(year,month,Dlast),
            DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
            DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
            calendar = '<tr>',
            month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
        if (DNfirst != 0) {
          for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
        }else{
          for(var  i = 0; i < 6; i++) calendar += '<td>';
        }
        for(var  i = 1; i <= Dlast; i++) {
          if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
            calendar += '<td class="ok_day today">' + i;
          } else if (i < new Date().getDate() && D.getFullYear() <= new Date().getFullYear() && D.getMonth() <= new Date().getMonth()){
            calendar += '<td class="last_day">' + i;
          }else{
            calendar += '<td class="ok_day">' + i;
          }
          if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
            calendar += '<tr>';
          }
        }
        for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
        document.querySelector('#'+id+' tbody').innerHTML = calendar;
        document.querySelector('#'+id+' thead td:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear();
        document.querySelector('#'+id+' thead td:nth-child(2)').dataset.month = D.getMonth();
        document.querySelector('#'+id+' thead td:nth-child(2)').dataset.year = D.getFullYear();
        if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  // чтобы при перелистывании месяцев не "подпрыгивала" вся страница, добавляется ряд пустых клеток. Итог: всегда 6 строк для цифр
            document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;';
        }
    }
    Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
    // переключатель минус месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(1)').onclick = function() {
        if(parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)>new Date().getMonth()){
            Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)-1);
        }
    }
    // переключатель плюс месяц
    document.querySelector('#calendar2 thead tr:nth-child(1) td:nth-child(3)').onclick = function() {
        Calendar2("calendar2", document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1);
    }
    $(document).delegate( "#calendar2 tbody td.ok_day", "click", (e) => {
        var day = e.target.textContent;
        $('#calendar2 tbody td.ok_day').removeAttr('id');
        e.target.id = 'act_day';
        var day = e.target.textContent;
        var month = parseInt(document.querySelector('#calendar2 thead td:nth-child(2)').dataset.month)+1;
        var year = document.querySelector('#calendar2 thead td:nth-child(2)').dataset.year;
        if (day < 10) {
            day = '0'+day;
        }
        if (month < 10){
            month = '0'+month
        }

        $('#calendar-offer').text(day+'.'+month+'.'+year);
        $('#calendar2').hide();
    });
    $('#calendar-offer').on('click', (e) => {
        $('#calendar2').show();
    });
    $(document).mouseup((e) => {
        var container = $("#calendar2");
        if (container.has(e.target).length === 0){
            container.hide();
        }
    });

    sessionStorage.removeItem('new_directions');

    // Открытие меню!
    $('.block_two_menu').on('click', (e) => {
        /*$('.block_two_menu').hide();
        $('.modal_menu_back').show();
        $('.modal_menu_back').css('opacity', '0');
        $('.modal_menu_back').animate({opacity: 1}, 500);
        $('.modal_menu_back').css('top', $(window).scrollTop());
        $('.modal_menu').show();
        $('.modal_menu').css('width','0px');
        $('.modal_menu').animate({width: '400px'}, 500);
        $('body, html').css({'overflow-y':'hidden','overflow-x':'hidden'});*/

        if ($('.block_menu').css('display') == 'none'){
            $('.block_menu').show();
            var top = $('.block_two_menu').offset().top-30;
            var left = $('.block_two_menu').offset().left;
            $('.block_menu').css({'top':top, 'left': left, "z-index": 999});
            $('.block_menu').css({'opacity':'0', 'width': '0'});
            $('.block_menu').animate({'opacity': 1, 'width': 1200, 'left': left-1165}, 1000);
        } else {
            var left = $('.block_two_menu').offset().left;
            $('.block_menu').animate({'opacity': 0, 'width': 0, 'left': left}, 1000, () => {
                $('.block_menu').hide();
            });
        }

    });
    // Закрытие меню!
    $('.modla_menu_ellips').on('click', (e) => {
        $('.modal_menu').animate({width: '0px'}, 500, ()=>{
            $('.modal_menu').hide();
        });
        $('.modal_menu_back').animate({opacity: 0}, 500, ()=>{
            $('.modal_menu_back').hide();
            $('body, html').css({'overflow-y':'auto', 'overflow-x':'hidden'});
            $('.block_two_menu').show();
        });
    });
    $('.modal_menu_item').on('click', 'a', (e) => {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        $('.modal_menu').hide();
        $('.modal_menu_back').hide();
        $('body, html').css({'overflow-y':'auto', 'overflow-x':'hidden'});

        //забираем идентификатор бока с атрибута href
        var id  = $(e.target.parentElement).attr('href');
 
        //узнаем высоту от начала страницы до блока на который ссылается якорь
        var top = $(id).offset().top;
         
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);

    });

    $(".header_right_menu").on("click","a", function (event) {

        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
 
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
 
        //узнаем высоту от начала страницы до блока на который ссылается якорь
        top = $(id).offset().top;
         
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
    /*
    $(window).scroll(function() {
        var two = $('.block_two').offset().top;
        var three = $('.block_three').offset().top;
        var four = $('.block_four').offset().top;
        var five = $('.block_five').offset().top;
        var h_w = window.innerHeight-300;
        if ($('.block_menu').css('display') != 'none'){
            $('.block_menu').hide();
        }
        var width = $(window).width();
        if (width > 780) {
            if ($(this).scrollTop() >= two) {
                $('.block_two_menu').show();
                $('.block_two_div_menu').show();
            } else {
                $('.block_two_div_menu').hide();
            }
        }
        // Анимация для третьего блока
        if ($(this).scrollTop() >= three-h_w && $(this).scrollTop() < four) {
            $('.block_three .universal_left').removeAttr('style');
            $('.block_three .universal_right').removeAttr('style');
            $('.block_three .universal_bottom').removeAttr('style');
        }
        // Анимация для четвертого блока
        if ($(this).scrollTop() >= four-h_w && $(this).scrollTop() < five) {
            $('.block_four .universal_left').removeAttr('style');
            $('.block_four .universal_right').removeAttr('style');
            $('.block_four .universal_bottom').removeAttr('style');
        }
        var count = undefined;
        var xxx = -1
        $('.modal_window').each(function(){
            xxx ++;
            if ($(this).attr('style').indexOf('display: none;') == -1){
              count = xxx;  
            }
        });
        if (count != undefined){
            // Если модальное окно выше скролла, то оно перемещается так, чтобы было видно
            if ($(this).scrollTop() > $('.modal_window').eq(count).height() + $('.modal_window').eq(count).offset().top) {
                $('.modal_window').eq(count).css('top', $(window).scrollTop()+50);

            }
            // При перемещении скролла вверх модаль двигается вместе со скролом
            if ($(this).scrollTop() <= $('.modal_window').eq(count).offset().top-60){
                $('.modal_window').eq(count).css('top', $(window).scrollTop()+50);
            }
        }

        if ($(this).scrollTop() <= $('#show_thanks').offset().top+$('#show_thanks').height()){
            $('#show_thanks').css('top', $(window).scrollTop()+200);
        }
        if ($(this).scrollTop() <= $('#show_thanks').offset().top-60){
            $('#show_thanks').css('top', $(window).scrollTop()+200);
        }

        
    });
    */
    // Открытие модальных окон
    $('#get_consult').on('click', (e) => {
        $('.modal_block').show();
        $('#consultation').show(500);
        $('#consultation').css('top', $(window).scrollTop()+50);
        $('.modal_window_substrate').css('height', $('#consultation .modal_window_white').height()+20);
    });
    $('#three_button_mini').on('click', (e) => {
        $('.modal_block').show();
        $('#parameter_notifications').show(500);
        $('#parameter_notifications').css('top', $(window).scrollTop()+50);
        $('.modal_window_substrate').css('height', $('#parameter_notifications .modal_window_white').height()+20);
        $('.select_modal_items').css('width', $('.select_modal_button').width()+40);
    });
    $('#button_new_candidate').on('click', (e) => {

        if ($('#session_status').text() && $('#session_status').text() != 'false') {
            $('.modal_block').show();
            $('#new_candidate').show(500);
            $('#new_candidate').css('top', $(window).scrollTop()+50);
            $('.modal_window_substrate').css('height', $('#new_candidate .modal_window_white').height()+20);
        } else {
            $('.modal_block').show();
            $('#recruiter_login').show(500);
            $('#recruiter_login').css('top', $(window).scrollTop()+50);
            $('.modal_window_substrate').css('height', $('#recruiter_login .modal_window_white').height()+20);
        }

    });
    $('#button_it_recruiter').on('click', (e) => {
        $('.modal_block').show();
        $('#it_recruiter').show(500);
        $('#it_recruiter').css('top', $(window).scrollTop()+50);
        $('.modal_window_substrate').css('height', $('#it_recruiter .modal_window_white').height()+20);
    });
    $('#button_give_feedback').on('click', (e) => {
        $('.modal_block').show();
        $('#give_feedback').show(500);
        $('#give_feedback').css('top', $(window).scrollTop()+50);
        $('.modal_window_substrate').css('height', $('#give_feedback .modal_window_white').height()+20);
    });
    // ВНУТРИ ЕСТЬ КАКАЯ ТО ПОДОЗРИТЕЛЬНАЯ ШТУКА, ЕСЛИ ЗАПРОС ОШИБОЧНЫЙ, ТО НИЧЕГО НЕ ДЕЛАЕТСЯ!!!
    $('.block_worksheets').on('click', (e) => {
        if (e.target.tagName == 'BUTTON'){
            var data = {
                id: e.target.id
            }

            $('#hidden_id').text(e.target.id);

            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/api/landing/findworksheet'
            }).done(function(data){
                if(data.ok){

                    $('#show_worksheet .modal_window_title p').text(data.worksheets.level +' '+ data.worksheets.directions);
                    $('#show_worksheet .text_and_image img').attr({
                        'src': '/uploads' + data.worksheets.flag_path,
                        'width': '31',
                        'height': '21'
                    });
                    $('#show_worksheet .text_and_image h4').text(data.worksheets.residence_country + ', ' + data.worksheets.residence_city);
                    $('#show_worksheet #salary_worksheet h4').text(data.worksheets.salary + ' в месяц');
                    $('#show_worksheet #experiences_worksheet h4').text(data.worksheets.experiences);
                    var len_p_w_ex = $('#show_worksheet #w_ex_worksheet p').length;
                    for (i=0; i < len_p_w_ex; i++){
                        $('#show_worksheet #w_ex_worksheet p:eq(0)').remove();
                    }
                    var w_exp = data.worksheets.w_experiences.split('/');
                    for (i=0; i<w_exp.length; i++){
                        $('#show_worksheet #w_ex_worksheet').append('<p>'+w_exp[i]+'</p>');
                    }
                    $('#show_worksheet #skills_worksheet p').text(data.worksheets.best_skills);
                    $('#show_worksheet #language_worksheet p').text(data.worksheets.language);
                    $('#show_worksheet #additional_worksheet p').text(data.worksheets.additional);

                }else{

                    console.log(data);

                }
            });

            $('.modal_block').show();
            $('#show_worksheet').show(500);
            $('#show_worksheet').css('top', $(window).scrollTop()+50);
            $('.modal_window_substrate').css('height', $('#show_worksheet .modal_window_white').height()+20);
        }

    });
    // Закрытие модальных окон
    $('#consultation_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#consultation').hide(500);
    });
    $('#parameter_notifications_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#parameter_notifications').hide(500);
    });
    $('#new_candidate_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#new_candidate').hide(500);
    });
    $('#it_recruiter_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#it_recruiter').hide(500);
    });
    $('#give_feedback_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#give_feedback').hide(500);
    });
    $('#show_worksheet_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#show_worksheet').hide(500);
    });
    $('#thanks_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#show_thanks').hide(500);
        $('#show_thanks .thanks_title').text('Спасибо!');
    });
    $('#recruiter_login_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#recruiter_login').hide(500);
    });
    $('#new_recruiter_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#new_recruiter').hide(500);
    });
    $('#offer_job_close').on('click', (e) => {
        $('.modal_block').hide();
        $('#offer_job').hide(500);
    });
    //Показывает вариант с вводом своего мессенджера
    $('#view_other_messenger').on('click', (e) => {
        if ($('#view_other_messenger').text().indexOf('Добавить свой вариант')!= -1){
            $('#all_messenger_consult').hide();
            $('#other_messenger_consult').show();
            $('#img_messenger_other').hide();
            $('#img_messenger_all').show();
            $('#text_messenger').text('Показать все варианты');
        } else{
            $('#all_messenger_consult').show();
            $('#other_messenger_consult').hide();
            $('#img_messenger_other').show();
            $('#img_messenger_all').hide();
            $('#text_messenger').text('Добавить свой вариант');
        }
    });
    $('#view_other_messenger_new').on('click', (e) => {
        if ($('#view_other_messenger_new').text().indexOf('Добавить свой вариант')!= -1){
            $('#all_messenger_new').hide();
            $('#other_messenger_new').show();
            $('#img_messenger_other_new').hide();
            $('#img_messenger_all_new').show();
            $('#text_messenger_new').text('Показать все варианты');
        } else{
            $('#all_messenger_new').show();
            $('#other_messenger_new').hide();
            $('#img_messenger_other_new').show();
            $('#img_messenger_all_new').hide();
            $('#text_messenger_new').text('Добавить свой вариант');
        }
    });

    //Удаляет лишние стили из инпутов
    $('input').on('focus', function(){
        $('input').removeClass('error');
        $('button').removeClass('error');
        $('textarea').removeClass('error');
        $('#consultation #p_error_one').remove();
        $('#give_feedback #p_error_one').remove();
        $('.modal_row_status').css('opacity', '0');
    });
    //Удаляет лишние стили из textarea
    $('textarea').on('focus', function(){
        $('input').removeClass('error');
        $('textarea').removeClass('error');
        $('button').removeClass('error');
        $('#consultation #p_error_one').remove();
        $('#new_candidate #p_error_one').remove();
        $('#give_feedback #p_error_one').remove();
        $('.modal_row_status').css('opacity', '0');
    });
    $('button').on('focus', ()=> {
        $('input').removeClass('error');
        $('button').removeClass('error');
        $('textarea').removeClass('error');
        $('#consultation #p_error_one').remove();
        $('#give_feedback #p_error_one').remove();
        $('.modal_row_status').css('opacity', '0');
    })

    // Обработка событий кнопок модальных окон
    $('#consult_book').on('click', () => {

        $('#p_error_one').remove();

        if ($('#text_messenger').text() == 'Добавить свой вариант'){
            var messenger = $('#all_messenger_consult option:selected').text()
        } else{
            messenger = $('#other_messenger_consult').val();
        }

        var data = {
            company: $('#consult_company').val(),
            name: $('#consult_name').val(),
            messenger: messenger,
            data_messenger: $('#consult_data_messenger').val(),
            email: $('#consult_email').val(),
            time: $('#consult_time').val(),
            additional_info: $('#consult_additional_info').val()
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/consultation',
            beforeSend: function() {
                $('#consult_book').before('<img src="images/landing/loading.gif" alt="" id="loading_gif">');
                $('#consult_book').hide();
            }
        }).done(function(data){
            $('#consult_book').show();
            $('#loading_gif').remove();
            if (data.ok){
                $('#show_thanks').show();
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
                $('#consultation').hide();
            } else{
                $('#status_consultation_bok').text(data.text);
                $('#status_consultation_bok').css('opacity', 1);
                data.fields.forEach(function(item){
                    $('#' + item).addClass('error');
                    if (item == 'messenger'){
                        $('#other_messenger_consult').addClass('error');
                    }
                });
            }
        });
    });
    // СОХРАНЕНИЕ НОВОЙ АНКЕТЫ КАНДИДАТА В БАЗУ ДАННЫХ
    $('#save_new_candidate').on('click', (e) => {

        $('#new_candidate #p_error_one').remove();
        
        var level = $("input[name='level-c']:checked").map(function() {
            return this.value;
        }).get().join(", ") || "";

        var recommendations = $('#recomendations-c:checked').val() || "";

        if ($('#text_messenger').text() == 'Добавить свой вариант'){
            var messenger = $('#all_messenger_new option:selected').text()
        } else{
            messenger = $('#other_messenger_new').val();
        }

        var data = {
            recruiter_id: $('#session_rec_id').text(),
            directions: $('#directions-c option:selected').text(),
            name: $('#name-c').val(),
            email: $('#email-c').val(),
            phone: $('#phone-c').val(),
            messenger: messenger,
            data_messenger: $('#data_messenger-c').val(),
            social: $('#social-c').val(),
            linkedin: $('#linkedin-c').val(),
            residence: $('#residence-c').val(),
            relocate: $('#relocate-c').val(),
            level: level,
            salary: $('#salary-c option:selected').text(),
            experiences: $('#experiences-c option:selected').text(),
            w_experiences: $('#w_experiences-c').val(),
            best_skills: $('#best_skills-c').val(),
            portfolio: $('#portfolio-c').val(),
            language: $('#language-c').val(),
            recommendations: recommendations,
            additional: $('#additional-c').val(),
            download: $('#download-c').val(),
            beforeSend: function() {
                $('#save_new_candidate').before('<img src="images/landing/loading.gif" alt="" id="loading_gif">');
                $('#save_new_candidate').hide();
            }
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/savedata/worksheets'
        }).done(function(data){
            $('#consult_book').show();
            $('#loading_gif').remove();
            if(data.ok){
                $('#show_thanks').show();
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
                $('#new_candidate').hide();
                
            }else{
                $('#status_new_candidate').css('opacity', 1);
                $('#status_new_candidate').text(data.text);
                data.fields.forEach(function(item){
                    $('#' + item).addClass('error');
                    if (item == 'messenger'){
                        $('#other_messenger_consult').addClass('error');
                    }
                });
            }
        });

    });
    $('#rewiew_submit').on('click', () => {

        var data = {
            fio: $('#fio-fideback').val(),
            company: $('#company-r').val(),
            position: $('#position-r').val(),
            rewiew: $('#rewiew-r').val(),
            image_path: $('#upload_path').text()
        }
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/savedata/rewiews'
        }).done(function(data){
            if (data.ok){
                $('#show_thanks').show();
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
                $('#give_feedback').hide();
            } else {
                $('#status_give_feedback').css('opacity', 1);
                $('#status_give_feedback').text(data.text);
                data.fields.forEach(function(item){
                    $('#' + item).addClass('error');
                });
            }
        });
    });
    // Загрузка картинок
    $('#upload_foto_node').on('change', function() {
    
        var formData = new FormData();
        formData.append('file', $('#upload_foto_node')[0].files[0]);
    
        $.ajax({
            type: 'POST',
            url: '/api/savedata/saveimage',
            data: formData,
            processData: false,
            contentType: false
        }).done(function(data){
            if (data.ok){
                $('#upload_standart').hide();
                $('#upload_error').hide();
                $('#upload_ok').show(300);
                $('.upload_foto_span').text('УСПЕШНО!');
                $('#view_upload_foto').html('<img src="uploads' + data.path + '" alt="">');
                $('#upload_path').text(data.path);
                console.log(data);
            } else {
                $('#upload_ok').hide();
                $('#upload_standart').hide();
                $('#upload_error').show(300);
                $('.upload_foto_span').text('ОШИБКА!');
                $('#status_give_feedback').css('opacity', 1);
                $('#status_give_feedback').text(data.error);
                console.log(data);
            }
        });

    });
    // АВТОРИЗАЦИЯ РЕКРУТЕРОВ
    $('#button_recruiter_login').on('click', () => {
        var data = {
            email: $('#rec_login').val(),
            password: $('#rec_password').val()
        }
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/loginrecruiter'
        }).done(function(data){
            if (data.ok){

                console.log(data)

                $('#session_status').text(true);
                $('#session_rec_id').text(data.id);
                $('.modal_block').hide();
                $('#recruiter_login').hide(500);

                $('.modal_block').show();
                $('#new_candidate').show(500);
                $('#new_candidate').css('top', $(window).scrollTop()+50);
                $('.modal_window_substrate').css('height', $('#new_candidate .modal_window_white').height()+20);
            } else{
                console.log(data);

                $('#status_recruiter_login').text(data.text);
                $('#status_recruiter_login').css('opacity', '1');
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('#' + item).addClass('error');
                    });
                }

                $('#session_status').text(false);
                $('#session_rec_id').text(null);
            }
        });
    });
    $('#recruiter_register_button').on('click', () => {
        $('#recruiter_login').hide(500);

        var data = {
            typeDocument: 'Directions'
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/additionaldoc'
        }).done(function(data){
            if (data.ok){

                var directions = data.data.directions;
                var start = 0;
                var arr = [];
                for (x=0; x < 4; x++){
                    $('.modal_column_item:eq('+x+')').html('');
                }
                
                for (i=0; i < directions.length; i++){
                    for (x=0; x < 4; x++){
                        for (y=start; y < directions.length; y++){
                            $('.modal_column_item:eq('+x+')').html($('.modal_column_item:eq('+x+')').html()+'<label class="modal_label"><input type="checkbox" name="modal_checkbox-r" value="'+directions[y].name+'" class="modal_checkbox">'+directions[y].name+'</label>');
                            arr.push(directions[y].name.toLowerCase());
                            break;
                        }
                        start ++;
                    }
                }

                sessionStorage.setItem('new_directions', JSON.stringify(arr));

                $('#new_recruiter').show(500);
                $('#new_recruiter').css('top', $(window).scrollTop()+50);
                $('.modal_window_substrate').css('height', $('#new_recruiter .modal_window_white').height()+20);
            }else {
                alert('Регистрация пока закрыта!!!');
            }
        });
    });

    $('#add_new_direction').on('click', () => {

        if (sessionStorage.getItem('new_directions')) {
            arr = JSON.parse(sessionStorage.getItem('new_directions'));
        } else {
            arr = [];
        }

        var direction = $('#other_directions-r').val().charAt(0).toUpperCase() + $('#other_directions-r').val().substr(1).toLowerCase();

        if (direction.length > 14){
            var short_direction = direction.substr(0, 14) + '...';
        }
        else{
            var short_direction = direction;
        }

        
        if (direction && arr.indexOf(direction.toLowerCase()) == -1){
            var len_class = $('.modal_column_item').length;
            var arrChildren = [];
            for (i=0; i < len_class; i++){
                arrChildren.push($('.modal_column_item')[i].children.length);
            }

            var un_id = Math.random().toString(36).slice(-7);

            var new_elem = document.createElement('label');
            new_elem.setAttribute('class', 'modal_label ' + un_id);
            new_elem.setAttribute('title', direction);
            new_elem.innerHTML = '<input type="checkbox" name="modal_checkbox-r" value="'+direction+'" class="modal_checkbox">'+short_direction;
            

            var index = arrChildren.indexOf(Math.min.apply(null, arrChildren));
            
            $('.modal_column_item')[index].append(new_elem);
            var top = $('.'+un_id + ':last-child').position().top;
            var left = $('.'+un_id + ':last-child').position().left;

            $('.modal_column_check').append('<div class="delete_new_direction '+un_id+'"><img src="images/close_circle.png" alt=""></div>');

            $('div .'+un_id).css({
                'top': top+22,
                'left': left-10
            });
            $('#other_directions-r').val('');

            arr.push(direction.toLowerCase());
            sessionStorage.setItem('new_directions', JSON.stringify(arr));

        } else {
            alert('Уже существует!!!');
        }
    });

    $('.modal_column_check').on('click', (e) => {
        if (e.target.tagName == 'IMG'){
            var del_class = e.target.parentElement.className.slice(-7);
            e.target.parentElement.remove();

            var old_val = $('.' + del_class + ' .modal_checkbox').val();
            var new_directions = JSON.parse(sessionStorage.getItem('new_directions'));
            new_directions.splice(new_directions.indexOf(old_val), 1);
            sessionStorage.setItem('new_directions', JSON.stringify(new_directions));
            $('.' + del_class).remove();
        }
    });

    // СОХРАНЕНИЕ НОВОГО РЕКРУТЕРА!!!
    $('#save_new_recruiter').on('click', (e) => {
        var directions = $(".modal_column_item input[name=modal_checkbox-r]:checked").map(function() {
            return this.value;
        }).get().join(", ");

        var data = {
            fio: $('#fio-r').val(),
            birthday: $('#birthday-r').val(),
            residence: $('#residence-r').val(),
            telephone: $('#phone-r').val(),
            skype: $('#skype-r').val(), 
            linkedin: $('#linkedin-r').val(),
            place_work: $('#place_work-r').val(), 
            time_work_it: $('#time_work_it-r').val(), 
            email: $('#email-r').val(), 
            password: $('#password-r').val(), 
            password_confirm: $('#password_confirm-r').val(), 
            direction: directions, 
            source: $('#source-r').val(), 
            coop_com: $('#coop_com-r').val(), 
            school: $('#school-r').val(), 
            language: $('#language-r').val(), 
            pay_details: $('#pay_details-r').val(),
            divugle: $('#not_divulge-к:checked').val(),
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/savedata/recruiters'
        }).done(function(data){
            if(data.ok){

                $('#show_thanks').show();
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
                $('#new_recruiter').hide();

            }else{
                
                $('#status_new_recruiter').text(data.text);
                $('#status_new_recruiter').css('opacity', '1');
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('#' + item).addClass('error');
                    });
                }

            }
        });
    });
    // ФУНКЦИЯ ЗАГРУЗКИ ВСЕХ АНКЕТ НА ГЛАВНОЙ СТРАНИЦЕ
    $(() => {

        sessionStorage.setItem('arrow_item', 0);

        $.ajax({
            type: 'POST',
            url: '/api/landing/preloaddata'
        }).done(function(data){
            if(data.ok){
                
                var page = Math.ceil(data.count_work/10);
                sessionStorage.setItem('col_page_work', page);

                var len = data.worksheets.length;
                for (i=0; i < 6-len; i++){
                    $('.mini_worksheet:eq('+len+')').remove();
                }

                for (i=0; i < len; i++){
                    $('.mini_worksheet:eq('+i+') .mini_worksheet_two_title').text(data.worksheets[i].level +' '+ data.worksheets[i].directions);
                    $('.mini_worksheet:eq('+i+') .mini_worksheet_three span').text(data.worksheets[i].salary);
                    $('.mini_worksheet:eq('+i+') .mini_worksheet_two_social ul li:eq(1)').text(data.worksheets[i].residence_country + ", " + data.worksheets[i].residence_city);
                    $('.mini_worksheet:eq('+i+') .mini_worksheet_two_social ul li:eq(0)').html('<img src="/uploads' + data.worksheets[i].flag_path+'" alt="" width="43" height="29">');
                    $('.mini_worksheet:eq('+i+') .mini_worksheet_four .blue_button').attr('id', data.worksheets[i].id);
                    
                }

                len = data.dir.length;
                $('#directions_filter').append($("<option></option>", {value: "Выбрать", text: "Выбрать", selected: true}));
                $('#directions_filter_all').append($("<option></option>", {value: "Выбрать", text: "Выбрать", selected: true}));
                for (i=0; i < len; i++){
                    $('#directions_filter').append($("<option></option>", {value: data.dir[i].name, text: data.dir[i].name}));
                    $('#directions_filter_all').append($("<option></option>", {value: data.dir[i].name, text: data.dir[i].name}));
                    $('#directions-c').append($("<option></option>", {value: data.dir[i].name, text: data.dir[i].name}));
                    $('#directions_parametet ul').append(`<li>
                    <label class="select_items_label">
                    <input type="checkbox" class="select_items_ckeck" value="${data.dir[i].name}">
                    ${data.dir[i].name}</label>
                    </li>`);
                }
                len = data.loc.length;
                $('#locations_filter').append($("<option></option>", {value: "Выбрать", text: "Выбрать", selected: true}));
                $('#locations_filter_all').append($("<option></option>", {value: "Выбрать", text: "Выбрать", selected: true}));
                for (i=0; i < len; i++){
                    $('#locations_filter').append($("<option></option>", {value: data.loc[i].name, text: data.loc[i].name}));
                    $('#locations_filter_all').append($("<option></option>", {value: data.loc[i].name, text: data.loc[i].name}));
                }
                len = data.rew.length;
                for (i=0; i < len; i++){
                    $('.block_rewiews_item:eq('+i+')').attr('id', data.rew[i].id);
                    $('.block_rewiews_item:eq('+i+')').html(`
                    <div class="rewiews_item_ellips">
                        <div class="rewiew_icon">
                            <img src="/uploads${data.rew[i].image_path}" alt="">
                        </div>
                    </div>
                    <div class="rewiew_name">
                        <p>${data.rew[i].fio}</p>
                    </div>
                    <div class="rewiew_company">${data.rew[i].company}</div>
                    `)
                }
                len = data.messengers.length;
                for (i=0; i < len; i++){
                    $('#all_messenger_consult').append($("<option></option>", {value: data.messengers[i].name, text: data.messengers[i].name}));
                }


            }else{
                
                $('.mini_worksheet').remove();
                $('.block_worksheets').html('<h2>По вашему запросу ничего не найдено!</h2>');

            }
        });
    })
    $('.block_select').on('change', (e) => {
        filter(6, 1);
        $('#view_plus_mini').html(
            `<div><img src="images/landing/rotate.png" alt="" class="circe_view">
            <span class="text_in_button_block_two">Смотреть еще</span></div>`);

    });
    // САМА ФИЛЬТРАЦИЯ
    var filter = (limit, page) => {
        var data = {
            direction: $('#directions_filter option:selected').val(),
            localtion: $('#locations_filter option:selected').val(),
            experience: $('#experiences_filter option:selected').val(),
            period: $('#period_filter option:selected').val(),
            limit: limit,
            page: page
        }
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/findworksheets'
        }).done(function(data){
            if(data.ok){

                var page = Math.ceil(data.count_work/10);
                sessionStorage.setItem('col_page_work', page);
                console.log(data)
                var len = data.worksheets.length;
                $('.mini_worksheet').remove();
                if (len == 0){
                    $('.block_worksheets').html('<h2>По вашему запросу ничего не найдено!</h2>');
                } else {
                    $('.block_worksheets').text('');
                    for (i=0; i < len; i++) {
                        $('.block_worksheets').append(`
                        <div class="mini_worksheet">
                            <div class="mini_worksheet_one">
                                <div class="icon_user"><img src="images/landing/Group.png" width="40px" height="54px"></div>
                            </div>
                            <div class="mini_worksheet_two">
                                <div class="mini_worksheet_two_title">${data.worksheets[i].level} ${data.worksheets[i].directions}</div>
                                <div class="mini_worksheet_two_social">
                                    <ul>
                                        <li><img src="/uploads${data.worksheets[i].flag_path}"></li>
                                        <li>${data.worksheets[i].residence_country}, ${data.worksheets[i].residence_city}</li>
                                        <li> </li>
                                        <li><img src="images/landing/social/green.png" alt="" class="social_icon"></li>
                                        <li><img src="images/landing/social/vk.png" alt="" class="social_icon"></li>
                                        <li><img src="images/landing/social/git.png" alt="" class="social_icon"></li>
                                        <li><img src="images/landing/social/LinkedIn.png" alt="" class="social_icon"></li>
                                        <li><img src="images/landing/social/google.png" alt="" class="social_icon"></li>
                                        <li><img src="images/landing/social/facebook.png" alt="" class="social_icon"></li>
                                        <li><img src="images/landing/social/telegram.png" alt="" class="social_icon"></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mini_worksheet_three">
                                <span class="blue_money">${data.worksheets[i].salary}</span>/в месяц
                            </div>
                            <div class="mini_worksheet_splin">

                            </div>
                            <div class="mini_worksheet_four">
                                <button class="blue_button" type="button" name="button_open_worksheet" id="${data.worksheets[i].id}"> Открыть анкету</button>
                            </div>
                        </div>
                        `)
                    }
                }

            }else{
                
                $('.mini_worksheet').remove();
                $('.block_worksheets').html('<h2>По вашему запросу ничего не найдено!</h2>');

            }
        });
    };
    // КЛАССНАЯ ШТУКА - СОБЫТИЕ ДЛЯ СГЕНЕРИРОВАННЫХ ЭЛЕМЕНТОВ!!!
    $(document).delegate( ".block_rewiews_item", "click", (e) => {
        var id = '';
        if (e.target.className != 'block_rewiews_item'){
            if (e.target.parentElement.className != 'block_rewiews_item'){
                if (e.target.parentElement.parentElement.className != 'block_rewiews_item'){
                    if (e.target.parentElement.parentElement.parentElement.className == 'block_rewiews_item') {
                        id = e.target.parentElement.parentElement.parentElement.id;
                    } else {
                        id = '';
                    }
                } else {
                    id = e.target.parentElement.parentElement.id;
                }
            } else {
                id = e.target.parentElement.id;
            }
        } else {
            id = e.target.id;
        }

        var data = {
            id
        }

        if (id) {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/api/landing/findrewiew'
            }).done(function(data){
                if(data.ok){

                    $('#rew_image').html(`<img src="/uploads${data.rew.image_path}" alt="">`);
                    $('#rew_name').html(`${data.rew.fio}<span>${data.rew.company}</span>`);
                    $('#rew_text').text(data.rew.rewiew);

                } else {

                    $('#rew_image').html('<img src="images/landing/user_rewiew.png" alt="">');
                    $('#rew_name').html('Ваше имя будет здесь<span>Название вашей компании</span>');
                    $('#rew_text').text('Здесь будет текст вашего отзыва. Спасибо что оставите его для нас');

                }
            });
        } else {
            $('#rew_image').html('<img src="images/landing/user_rewiew.png" alt="">');
            $('#rew_name').html('Ваше имя будет здесь<span>Название вашей компании</span>');
            $('#rew_text').text('Здесь будет текст вашего отзыва. Спасибо что оставите его для нас');
        }

    });
    // Переключение отзывов
    $('#arrow_left').on('click', (e) => {
        if (sessionStorage.getItem('arrow_item')){
            var arrow_item = JSON.parse(sessionStorage.getItem('arrow_item'));
        } else {
            var arrow_item = 0
        }

        if (arrow_item > 0){
            arrow_item -=1;

            sessionStorage.setItem('arrow_item', JSON.stringify(arrow_item));

            var data = {
                arrow: arrow_item
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/api/landing/arrowrewiew'
            }).done(function(data){
                if(data.ok){
                    if (data.rew.length > 3){
                        $('.block_rewiews_item:eq(3)').remove();
                        $('.block_rewiews_item:eq(0)').before(`
                        <div class="block_rewiews_item" id="${data.rew[0].id}">
                            <div class="rewiews_item_ellips">
                                <div class="rewiew_icon">
                                    <img src="/uploads${data.rew[0].image_path}" alt="">
                                </div>
                            </div>
                            <div class="rewiew_name">
                                <p>${data.rew[0].fio}</p>
                            </div>
                            <div class="rewiew_company">${data.rew[0].company}</div>
                        </div>
                        `);
                    }
                }
            });
        }

    });
    $('#arrow_right').on('click', (e) => {
        if (sessionStorage.getItem('arrow_item')){
            var arrow_item = JSON.parse(sessionStorage.getItem('arrow_item'));
        } else {
            var arrow_item = 0
        }
        arrow_item +=1;
        sessionStorage.setItem('arrow_item', JSON.stringify(arrow_item));

        var data = {
            arrow: arrow_item
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/arrowrewiew'
        }).done(function(data){
            if(data.ok){
                if (data.rew.length > 3){
                    $('.block_rewiews_item:eq(0)').remove();
                    $('.block_reviews').append(`
                    <div class="block_rewiews_item" id="${data.rew[data.rew.length-1].id}">
                        <div class="rewiews_item_ellips">
                            <div class="rewiew_icon">
                                <img src="/uploads${data.rew[data.rew.length-1].image_path}" alt="">
                            </div>
                        </div>
                        <div class="rewiew_name">
                            <p>${data.rew[data.rew.length-1].fio}</p>
                        </div>
                        <div class="rewiew_company">${data.rew[data.rew.length-1].company}</div>
                    </div>
                    `);
                } else {
                    sessionStorage.setItem('arrow_item', JSON.stringify(arrow_item-1));
                }
            }
        });

    });
    $('#submit_it_recruiter').on('click', (e) => {
        var data = {
            fio: $('#it_rec_fio').val(),
            skype: $('#it_rec_skype').val(),
            email: $('#it_rec_email').val(),
            time: $('#it_rec_time').val(),
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/itrecruiter',
            beforeSend: function() {
                $('#submit_it_recruiter').before('<img src="images/landing/loading.gif" alt="" id="loading_gif">');
                $('#submit_it_recruiter').hide();
            }
        }).done(function(data){
            $('#submit_it_recruiter').show();
            $('#loading_gif').remove();
            if (data.ok){
                $('#show_thanks').show();
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
                $('#it_recruiter').hide();
                $('input:not([type=checkbox])').val('');
            } else{
                $('#status_it_recruiter').text(data.text);
                $('#status_it_recruiter').css('opacity', '1');
                data.fields.forEach(function(item){
                    $('#' + item).addClass('error');
                });
            }
        });

    });
    $('.ellips_close').on('click', () => {
        $('input').removeClass('error');
        $('textarea').removeClass('error');
        $('#consultation #p_error_one').remove();
        $('#give_feedback #p_error_one').remove();
        $('.modal_row_status').css('opacity', '0');
        $('input:not([type=checkbox])').val('');
        $('textarea').val('');

        $('.select_items_ckeck').prop("checked", false);
        $('.select_items_ckeck_all').prop("checked", false);
        $('input[type="checkbox"]').prop("checked", false);

        $('#not_button_level span').text('Нажмите чтобы выбрать...');
        $('#not_button_directions span').text('Нажмите чтобы выбрать...');

        $('#calendar2 tbody td.ok_day').removeAttr('id');
        $('#calendar-offer').text('dd.mm.yyyy');

    })
    $('#submit_not').on('click', (e) => {
        var residence = $('#not_residence').val().split(',');
        var directions = [];
        $("#directions_parametet .select_items_ckeck:checked").parent('.select_items_label').each(function(){
            directions.push($(this).text().toLowerCase().replace(/\s/g, ''));
        });
        var level = [];
        $("#level_parametet .select_items_ckeck:checked").parent('.select_items_label').each(function(){
            level.push($(this).text().toLowerCase().replace(/\s/g, ''));
        });
        if (residence.length < 2){
            residence.push('');
        }

        var data = {
            residence_country: residence[0].toLowerCase() || '',
            residence_city: residence[1].toLowerCase() || '',
            directions: directions,
            level: level,
            skills: $('#not_skills').val().toLowerCase().split(' / '),
            language: $('#not_language').val().toLowerCase().split(' / '),
            email: $('#not_email').val()
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/notification'
        }).done(function(data){
            if(data.ok){
                $('#show_thanks').show();
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
                $('#parameter_notifications').hide();
                $('input:not([type=checkbox])').val('');

                $('.select_items_ckeck').prop('checked', false);
                $('.select_items_ckeck_all').prop('checked', false);

                $('#not_button_level span').text('Нажмите чтобы выбрать...');
                $('#not_button_directions span').text('Нажмите чтобы выбрать...');

            } else {
                $('#status_not_parameters').text(data.text);
                $('#status_not_parameters').css('opacity', '1');
                data.fields.forEach(function(item){
                    $('#' + item).addClass('error');
                });
            }
        });
        
    });
    $('#news_subscribe').on('click', (e) => {
        var data = {
            email: $('#news_email').val()
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/subscription'
        }).done(function(data){
            if(data.ok){
                $('#show_thanks').show();
                $('.modal_block').show();
                $('#show_thanks .thanks_title').text('Спасибо!');
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
                $('input:not([type=checkbox])').val('');
            } else {
                $('#show_thanks').show();
                $('.modal_block').show();
                $('#show_thanks .thanks_title').text('Ошибочка!');
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
            }
        });
    });
    $('#submit_contact').on('click', (e) => {
        var data = {
            text: $('#contact_text').val(),
            email: $('#contact_email').val()
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/contactus'
        }).done((data) => {
            if (data.ok){
                $('#show_thanks').show();
                $('.modal_block').show();
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_title').text('Спасибо!');
                $('#show_thanks .thanks_body').text(data.text);
                $('input:not([type=checkbox])').val('');
            } else {
                $('#show_thanks').show();
                $('.modal_block').show();
                $('#show_thanks .thanks_title').text('Ошибочка!');
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
            }
        });
    });
    $('#offer_job_button').on('click', (e) => {
        $('#show_worksheet').hide();
        $('#offer_job').show();
        $('#offer_job').css('top', $(window).scrollTop()+50);
        $('.modal_window_substrate').css('height', $('#offer_job .modal_window_white').height()+20);
    })
    $('#offer_job_submit').on('click', (e) => {
        var data = {
            id: $('#hidden_id').text(),
            link: $('#link-offer').val(),
            name: $('#name-offer').val(),
            contacts: $('#contacts-offer').val(),
            date: $('#calendar-offer').text(),
            time: $('#time-offer').val(),
            message: $('#message-offer').val()
        }
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/landing/joboffer',
            beforeSend: function() {
                $('#offer_job_submit').before('<img src="images/landing/loading.gif" alt="" id="loading_gif">');
                $('#offer_job_submit').hide();
            }
        }).done((data) => {
            $('#offer_job_submit').show();
            $('#loading_gif').remove();
            if (data.ok){
                $('#offer_job').hide();
                $('#show_thanks').show();
                $('.modal_block').show();
                $('#show_thanks').css('top', $(window).scrollTop()+200);
                $('#show_thanks .thanks_body').text(data.text);
                $('input:not([type=checkbox])').val('');
                $('textarea').val('');
                $('#calendar-offer').text('dd.mm.yyyy');
                $('#calendar2 tbody td.ok_day').removeAttr('id');

            } else {
                $('#status_offer_job').text(data.text);
                $('#status_offer_job').css('opacity', 1);
                data.fields.forEach(function(item){
                    $('#' + item).addClass('error');
                });
            }
        });

    });

    // Переключение страниц
    $(document).delegate("#page_table td", "click", (e) => {
        if(e.target.textContent != "..." && e.delegateTarget.id != 'active_page' && $('#page_table .last_p').text() != $('#page_table .first_p').text()){
            if (e.target.className.indexOf('page')!=-1) {

                var first = parseInt($('#page_table .first_p').text());
                var last = parseInt($('#page_table .last_p').text());
                var page = parseInt(e.target.textContent);

                $('#page_table .page').remove();

                if (page == first && last-first >= 4 || page == first+1 && last-first >= 4) {
                    $('#page_table .backward_p').before('<td class="first_p page">1</td>');
                    $('#page_table .backward_p').before('<td class="page">2</td>');
                    $('#page_table .backward_p').before('<td class="page">3</td>');
                    $('#page_table .backward_p').before('<td class="page">...</td>');
                    $('#page_table .backward_p').before(`<td class="last_p page">${last}</td>`);
                } else if (page == last && last-first >= 4 || page == last-1  && last-first >= 4){
                    $('#page_table .backward_p').before('<td class="first_p page">1</td>');
                    $('#page_table .backward_p').before('<td class="page">...</td>');
                    $('#page_table .backward_p').before(`<td class="page">${last-2}</td>`);
                    $('#page_table .backward_p').before(`<td class="page">${last-1}</td>`);
                    $('#page_table .backward_p').before(`<td class="last_p page">${last}</td>`);
                } else if (page == first + 2 && last-first > 4){
                    $('#page_table .backward_p').before('<td class="first_p page">1</td>');
                    $('#page_table .backward_p').before('<td class="page">2</td>');
                    $('#page_table .backward_p').before('<td class="page">3</td>');
                    $('#page_table .backward_p').before('<td class="page">4</td>');
                    $('#page_table .backward_p').before('<td class="page">...</td>');
                    $('#page_table .backward_p').before(`<td class="last_p page">${last}</td>`);
                } else if (page == last - 2 && last-first > 4){
                    $('#page_table .backward_p').before('<td class="first_p page">1</td>');
                    $('#page_table .backward_p').before('<td class="page">...</td>');
                    $('#page_table .backward_p').before(`<td class="page">${last-3}</td>`);
                    $('#page_table .backward_p').before(`<td class="page">${last-2}</td>`);
                    $('#page_table .backward_p').before(`<td class="page">${last-1}</td>`);
                    $('#page_table .backward_p').before(`<td class="last_p page">${last}</td>`);
                } else {
                    if (last-first > 4){
                        $('#page_table .backward_p').before('<td class="first_p page">1</td>');
                        $('#page_table .backward_p').before('<td class="page">...</td>');
                        $('#page_table .backward_p').before(`<td class="page">${page-1}</td>`);
                        $('#page_table .backward_p').before(`<td class="page">${page}</td>`);
                        $('#page_table .backward_p').before(`<td class="page">${page+1}</td>`);
                        $('#page_table .backward_p').before('<td class="page">...</td>');
                        $('#page_table .backward_p').before(`<td class="last_p page">${last}</td>`);
                    } else if (last == 5){
                        $('#page_table .backward_p').before('<td class="first_p page">1</td>');
                        $('#page_table .backward_p').before('<td class="page">2</td>');
                        $('#page_table .backward_p').before('<td class="page">3</td>');
                        $('#page_table .backward_p').before('<td class="page">4</td>');
                        $('#page_table .backward_p').before(`<td class="last_p page">${last}</td>`);
                    } 
                    else {
                        $('#view_plus_mini').html(col_page(sessionStorage.getItem('col_page_work')));
                        $('#page_table .page').removeAttr('id');
                    }
                }

                $('#page_table td:contains("'+page+'"):eq(0)').attr('id', 'active_page');

                filter(10, page);

                var top = $('.block_two .block_two_filter').offset().top;
                //анимируем переход на расстояние - top за 1000 мс
                $('body,html').animate({scrollTop: top}, 500);
            }

        }
    })
    $(document).delegate("#page_table td.close_all", "click", (e) => {
        $('#view_plus_mini').html(
            `<div><img src="images/landing/rotate.png" alt="" class="circe_view">
            <span class="text_in_button_block_two">Смотреть еще</span></div>`);
        filter(6, 1);
        var top = $('.block_two .block_two_filter').offset().top;
        //анимируем переход на расстояние - top за 1000 мс
        $('body,html').animate({scrollTop: top}, 500);
    });
    $(document).delegate("#view_plus_mini div", "click", (e) => {
        $('#view_plus_mini').html(col_page(sessionStorage.getItem('col_page_work')));
        filter(10, 1);
    });

    var col_page = (page) => {
        var line_code = '';
        if (page > 4){
            var bs = 0;
            for (i=1; i < parseInt(page); i++){
                if (i == page-1 || bs == 2){
                    line_code = `${line_code}<td class="page">...</td>`;
                    break;
                } else if (i==1){
                    line_code = `<td class="first_p page" id="active_page">1</td>`;
                }
                else {
                    line_code = `${line_code}<td class="page">${i}</td>`;
                    bs++;
                }
            }
        } else {
            if (page > 1) {
                for (i=1; i < parseInt(page); i++){
                    if (i == 1){
                        line_code = `<td class="first_p page" id="active_page">1</td>`;
                    } else {
                        line_code = `${line_code}<td class="page">${i}</td>`;
                    }
                }
            }
        }
        if (page == 1){
            var g_code = 
                    `<table id="page_table">
                        <tr>
                            <td class="forward_p" hidden><<</td>
                            <td class="first_p last_p page" id="active_page">1</td>
                            <td class="backward_p" hidden>>></td>
                            <td class="close_all">X</td>
                        </tr>
                    </table>`
        } else {
            var g_code = 
                    `<table id="page_table">
                        <tr>
                            <td class="forward_p" hidden><<</td>
                            ${line_code}
                            <td class="last_p page">${page}</td>
                            <td class="backward_p" hidden>>></td>
                            <td class="close_all">X</td>
                        </tr>
                    </table>`
        }
        return g_code;
    };
});
