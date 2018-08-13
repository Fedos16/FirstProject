$(function(){

    // ДЕЙСТВИЯ С ДОКУМЕНТОМ ПРИ ОТКРЫТИИ
    $(document).ready(function() {

        var item = $('.item_activ').text();
        
        if (item == "Пользователи" || item == "Рекрутеры"){
            $('.ul_box_info').attr('id', '');
            if(String(window.location).indexOf('recruiters/create') != -1){
                $('.ul_box_info li:first-child').attr('id', 'sm_item_act');
            }
            else if(String(window.location).indexOf('recruiters/edit') != -1){
                $('.ul_box_info li:last-child').attr('id', 'sm_item_act');
            }
            else if(String(window.location).indexOf('users/create') != -1){
                $('.ul_box_info li:first-child').attr('id', 'sm_item_act');
            }
        }
        else{
            $('.ul_box_info').attr('id', 'display_none');
        }
    
    });

    $('input').on('focus', function(){
        $('p.error').remove();
        $('input').removeClass('error');
    });

    $('.ul_box_info').on('click', (e) => {
        var top_name = e.target.textContent;
        var left_name = $('.item_activ').text();

        if (left_name == 'Рекрутеры'){
            if (top_name == 'Создать'){
                $(location).attr('href', '/recruiters/create');
            }
            else{
                $(location).attr('href', '/recruiters/edit');
            }
        }
        else if(left_name == 'Пользователи'){

        }
    });
    

    // СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ ДЛЯ АВТОРИЗАЦИИ В СИСТЕМЕ
    $('#form_submit').on('click', function(e){
        
        e.preventDefault();
    
        var data = {
            login: $('#register-login').val(),
            password: $('#register-password').val(),
            passwordConfirm: $('#register-password-confirm').val()
        };
    
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/register'
        }).done(function(data){
            if (!data.ok){

                $('#form_submit').before('<p class="error">' + data.error + '</p>');
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            } else{
                $('#register-login').val('');
                $('#register-password').val('')
                $('#register-password-confirm').val('')

                $('#form_submit').before('<p class="success">Успешно!</p>');
            }
        });
    
    });

    // АВТРИЗАЦИЯ ПОЛЬЗОВАТЕЛЕЙ В СИСТЕМЕ
    $('#submit_login').on('click', (e)=> {
        e.preventDefault();
    
        var data = {
            login: $('#login-login').val(),
            password: $('#login-password').val(),
        };
    
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/login'
        }).done(function(data){
            if(!data.ok){
                $('.button_div').before('<p class="error">' + data.error + '</p>');
                
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            }else{
                $(location).attr('href', '/worksheets');
            }
        });
    });

    // СОХРАНЕНИЕ НОВОГО РЕКРУТЕРА В БАЗУ ДАННЫХ
    $('#save_rec').on('click', (e) => {

        e.preventDefault();

        var directions = $("input[name=checkBox]:checked").map(function() {
            return this.value;
        }).get().join(", ");

        var data = {
            fio: $('#fio').val(),
            birthday: $('#birthday').val(),
            location: $('#location').val(),
            education: $('#education').val(),
            languages: $('#languages').val(),
            telephone: $('#telephone').val(),
            email: $('#email').val(),
            skype: $('#skype').val(),
            linkedin: $('#linkedin').val(),
            it_work: $('#it_work').val(),
            last_work: $('#last_work').val(),
            source: $('#source').val(),
            recommendations: $('#recommendations').val(),
            requisites: $('#requisites').val(),
            directions: directions
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/savedata/recruries'
        }).done(function(data){
            if(!data.ok){

                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо')
                $('#modal_button').attr('class', 'modal_button_e')
                
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            }else{
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо')
                $('#modal_button').attr('class', 'modal_button_s')
            }
        });
    })

    $('#modal_button').on('click', ()=>{
        $('.modal_back').attr('id', 'display_none');
        $('.modal_back_edit').attr('id', 'display_none');
    });


    // СОХРАНЕНИЕ НОВОЙ АНКЕТЫ КАНДИДАТА В БАЗУ ДАННЫХ
    $('#save_new_candidate').on('click', (e) => {
        
        var level = $("input[name='level']:checked").map(function() {
            return this.value;
        }).get().join(", ") || "";

        var recommendations = $('#recomendations-c:checked').val() || "";

        var data = {
            recruiter: $('#recruiter-c option:selected').text(),
            directions: $('#directions-c option:selected').text(),
            name: $('#name-c').val(),
            email: $('#email-c').val(),
            phone: $('#phone-c').val(),
            messenger: $('#messenger-c').val(),
            social: $('#social-c').val(),
            linkedin: $('#linkedin-c').val(),
            residence: $('#residence-c').val(),
            level: level,
            salary: $('#salary-c').val(),
            experiences: $('#experiences-c option:selected').text(),
            w_experiences: $('#w_experiences-c').val(),
            best_skills: $('#best_skills-c').val(),
            portfolio: $('#portfolio-c').val(),
            language: $('#language-c').val(),
            recommendations: recommendations,
            additional: $('#additional-c').val(),
            download: $('#download-c').val(),
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/savedata/worksheets'
        }).done(function(data){
            if(!data.ok){
                $('html, body').animate({scrollTop: 0},500);

                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо')
                $('#modal_button').attr('class', 'modal_button_e')
                
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            }else{
                $('html, body').animate({scrollTop: 0},500);
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо')
                $('#modal_button').attr('class', 'modal_button_s')

            }
        });

    });

    // ОТОБРАЖЕНИЕ ОКНА РЕДАКТИРОВАНИЕ РЕКРУТЕРА И ДАННЫХ ДЛЯ РЕКРУТЕРА
    $('.icon_edit').on('click', (e) => {
        var id = e.target.parentElement.parentElement.getElementsByClassName('id_for_line')[0].textContent;
        $('.modal_back_edit').removeAttr('id');

        sessionStorage.setItem('activ_id_recruiter', id);

        var data = {
            id: id
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/recruiters/findrecruiter'
        }).done(function(data){
            if (!data){
                console.log('error');
            }
            else{
                if (data.ok){
                    $('#fio').val(data.data.fio);
                    $('#birthday').val(data.data.birthday);
                    $('#location').val(data.data.location);
                    $('#education').val(data.data.education);
                    $('#languages').val(data.data.languages);
                    $('#telephone').val(data.data.telephone);
                    $('#email').val(data.data.email);
                    $('#skype').val(data.data.skype);
                    $('#linkedin').val(data.data.linkedin);
                    $('#it_work').val(data.data.it_work);
                    $('#last_work').val(data.data.last_work);
                    $('#source').val(data.data.source);
                    $('#recommendations').val(data.data.recommendations);
                    $('#requisites').val(data.data.requisites);

                    var directions = data.data.directions.split(', ');

                    $('.level_checkbox').prop('checked', false);

                    for (var i=0; i < directions.length; i++){
                        $('.level_checkbox[value="'+directions[i]+'"]').prop('checked', true);
                    }
                }
            }
        });
        
    });

    $('.close_modal_edit').on('click', () => {
        $('.modal_back_edit').attr('id', 'display_none');
    })

    // ОБНОВЛЕНИЕ ДАННЫХ О РЕКРУТЕРЕ В БАЗЕ ДАННЫХ
    $('#save_edit_rec').on('click', (e) => {
        e.preventDefault();

        var directions = $("input[name=checkBox]:checked").map(function() {
            return this.value;
        }).get().join(", ");

        var data = {
            fio: $('#fio').val(),
            birthday: $('#birthday').val(),
            location: $('#location').val(),
            education: $('#education').val(),
            languages: $('#languages').val(),
            telephone: $('#telephone').val(),
            email: $('#email').val(),
            skype: $('#skype').val(),
            linkedin: $('#linkedin').val(),
            it_work: $('#it_work').val(),
            last_work: $('#last_work').val(),
            source: $('#source').val(),
            recommendations: $('#recommendations').val(),
            requisites: $('#requisites').val(),
            directions: directions,
            id: sessionStorage.getItem('activ_id_recruiter')
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/updatedata/recruiters'
        }).done(function(data){
            if(!data.ok){

                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо')
                $('#modal_button').attr('class', 'modal_button_e')
                
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            }else{
                $('.modal_back').removeAttr('id');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо')
                $('#modal_button').attr('class', 'modal_button_s')
            }
        });
    });

    // ВСЕ, ЧТО КАСАЕТСЯ УДАЛЕНИЕ (СТАВИТСЯ СТАТУС False) РЕКРУТЕРА ИЗ БАЗЫ ДАННЫХ

    $('#modal_button_remove_no').on('click', () => {
        $('.modla_back_remove').attr('id', 'display_none');
    });

    $('.icon_delete').on('click', (e) => {
        var id = e.target.parentElement.parentElement.getElementsByClassName('id_for_line')[0].textContent;
        $('.modla_back_remove').removeAttr('id');
        sessionStorage.setItem('id_remove_recruiter', id);
    });

    $('#modal_button_remove_yes').on('click', () => {
        

        var data = {
            id: sessionStorage.getItem('id_remove_recruiter')
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/removedata/recruiters'
        }).done(function(data){

            $('.modla_back_remove').attr('id', 'display_none');

            if(!data.ok){
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо')
                $('#modal_button').attr('class', 'modal_button_e')
                
            }else{
                $('.modal_back').removeAttr('id');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо')
                $('#modal_button').attr('class', 'modal_button_s')
            }
        });
    });

    // ОТКРЫТИЕ АНКЕТЫ ДЛЯ ПРОСМОТРА
    $('.close_modal_worksheets').on('click', ()=> {
        $('.modal_back_worksheets').attr('id', 'display_none');
    });

    $('.open_worksheets').on('click', (e)=> {

        var id = e.target.parentElement.parentElement.getElementsByClassName('id_for_line')[0].textContent;
        sessionStorage.setItem('worksheets_id', id);

        var data = {
            id: id
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/worksheets/findworksheets'
        }).done(function(data){
            if (!data){
                console.log('error');
            }
            else{
                if (data.ok){
                    $('#recruiter-c').val(data.data.recruiter);
                    $('#directions-c').val(data.data.directions);
                    $('#name-c').val(data.data.name);
                    $('#email-c').val(data.data.email);
                    $('#phone-c').val(data.data.phone);
                    $('#messenger-c').val(data.data.messenger);
                    $('#social-c').val(data.data.social);
                    $('#linkedin-c').val(data.data.linkedin);
                    $('#residence-c').val(data.data.residence);
                    $('#salary-c').val(data.data.salary);
                    $('#experiences-c').val(data.data.experiences);
                    $('#w_experiences-c').val(data.data.w_experiences);
                    $('#best_skills-c').val(data.data.best_skills);
                    $('#portfolio-c').val(data.data.portfolio);
                    $('#language-c').val(data.data.language);
                    $('#additional-c').val(data.data.additional);
                    $('#download-c').val(data.data.download);

                    var level = data.data.level.split(', ');

                    $('.level_checkbox').prop('checked', false);

                    for (var i=0; i < level.length; i++){
                        $('.level_checkbox[value="'+level[i]+'"]').prop('checked', true);
                    }
                    
                    var recommendations = data.data.recommendations
                    if (recommendations){
                        $('.level_checkbox[value="'+recommendations+'"]').prop('checked', true);
                    }
                    
                }
            }
        });

        $('.modal_back_worksheets').removeAttr('id');
    });

    $('#save_worksheets').on('click', () => {
        var data = {
            id: sessionStorage.getItem('worksheets_id'),
            status: "Открыта"
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/updatedata/worksheets'
        }).done(function(data){
            if(!data.ok){

                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо')
                $('#modal_button').attr('class', 'modal_button_e')
                
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            }else{
                $('.modal_back').removeAttr('id');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо')
                $('#modal_button').attr('class', 'modal_button_s')
            }
        });
    });

    $('#cancel_worksheets').on('click', () => {
        var data = {
            id: sessionStorage.getItem('worksheets_id'),
            status: "Отклонена"
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/updatedata/worksheets'
        }).done(function(data){
            if(!data.ok){

                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо')
                $('#modal_button').attr('class', 'modal_button_e')
                
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            }else{
                $('.modal_back').removeAttr('id');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо')
                $('#modal_button').attr('class', 'modal_button_s')
            }
        });
    });

    // КНОПКА ДЛЯ ЗАГРУЗКИ ДАННЫХ ИЗ ГУГЛ ТАБЛИЦ
    $('#button_filter').on('click', () => {

        var experince = $('#experience option:selected').text();
        var direction = $('#directions option:selected').text();

        if (experince == 'Опыт работы'){
            experince = '';
        }
        if (direction == 'Специальность'){
            direction = '';
        }

        var data = {
            direction: direction,
            experince: experince
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/inputdata/search'
        }).done(function(data){
            if (data.ok){
                $('.table_rec_edit tbody').remove();
                document.getElementsByClassName('table_rec_edit')[0].appendChild(document.createElement('tbody'));
                var tbody = document.getElementsByTagName('tbody')[0];

                for (var x=0; x < data.data.name.length; x++){
                    var tr = tbody.appendChild(document.createElement('tr'));
                    var td = tr.appendChild(document.createElement('td'));
                    td.textContent = x+1;
                    var td = tr.appendChild(document.createElement('td'));
                    td.textContent = data.data.name[x];
                    var td = tr.appendChild(document.createElement('td'));
                    td.textContent = data.data.level[x];
                    var td = tr.appendChild(document.createElement('td'));
                    td.textContent = data.data.salary[x];
                }
            }
        });

        /* ======================================== ВЫЙГРУЗКА ДАННЫХ ИЗ ГУГЛ ТАБЛИЦ
        var url = "https://script.google.com/macros/s/AKfycbw0i0n6sPYCDH-F6ljSCTzZm33ws_YtKXmGzo3Lk0uGuSyZs2dv/exec";

        var xhr = new XMLHttpRequest();
        
        xhr.open('GET', url);
        
        xhr.onreadystatechange = function(){
            if (xhr.readyState !==4) return;
            
            if (xhr.status == 200){
                try{
                    var r = JSON.parse(xhr.responseText),
                        result = r["result"];


                    for (var i=0; i < result.length; i++){
                        var data = {
                            data: result[i]
                        }

                        $.ajax({
                            type: 'POST',
                            data: JSON.stringify(data),
                            contentType: 'application/json',
                            url: '/api/inputdata/filter'
                        }).done(function(data){
                            document.getElementsByTagName('h3')[0].textContent = 'Строк обработано: ' + String(Number(i)+1);
                        });

                    }
                }
                catch(e){
                    console.log(e);
                }
            }
        }
        xhr.send();
        */


    });

});  