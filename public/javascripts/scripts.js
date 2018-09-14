$(function(){

    $('input').on('focus', function(){
        $('p.error').remove();
        $('input').removeClass('error');
    });
    

    // СОЗДАНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ ДЛЯ АВТОРИЗАЦИИ В СИСТЕМЕ
    $('#form_submit').on('click', function(e){
        e.preventDefault();
    
        var data = {
            login: $('#register-login').val(),
            password: $('#register-password').val(),
            passwordConfirm: $('#register-password-confirm').val(),
            typeUser: 'user',
            email: $('#register-email').val()
        };
    
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/auth/register'
        }).done(function(data){
            if (!data.ok){

                if (!$('p.error').text()){
                    $('#form_submit').before('<p class="error">' + data.error + '</p>');
                }
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            } else{
                $('#register-login').val('');
                $('#register-password').val('')
                $('#register-password-confirm').val('')
                $('#register-email').val('')

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
                $(location).attr('href', '/administration/worksheets/moderation');
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
    })

    $('#modal_button').on('click', ()=>{
        $('.modal_back').attr('id', 'display_none');
        $('.modal_back_edit').attr('id', 'display_none');
        var status = sessionStorage.getItem('refresh');
        var logout = sessionStorage.getItem('logout');
        if (status) {
            sessionStorage.removeItem('refresh');
            location.reload();
        }
        else if (logout){
            sessionStorage.removeItem('logout');
            $(location).attr('href', '/api/auth/logout');
        }
    });


    // СОХРАНЕНИЕ НОВОЙ АНКЕТЫ КАНДИДАТА В БАЗУ ДАННЫХ
    $('#save_new_candidate').on('click', (e) => {
        
        var level = $("input[name='level']:checked").map(function() {
            return this.value;
        }).get().join(", ") || "";

        var recommendations = $('#recomendations-c:checked').val() || "";

        var data = {
            recruiter: $('#recruiter-c option:selected').text(),
            recruiter_id: $('#recruiter-c').val(),
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

        sessionStorage.setItem('activ_id_recruiter', id);

        var data = {
            id: id
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/administration/recruiters/findrecruiter' // Вот эту штуку перенести в API
        }).done(function(data){
            if (!data){
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо');
                $('#modal_button').attr('class', 'modal_button_e');
            }
            else{
                $('.modal_back_edit').removeAttr('id');
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
        sessionStorage.setItem('refresh', 'true');
    })

    $('.open_recruiter').on('click', (e) => {
        var id = e.target.parentElement.parentElement.getElementsByClassName('id_for_line')[0].textContent;

        sessionStorage.setItem('activ_id_recruiter', id);

        var data = {
            id: id
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/administration/recruiters/findrecruiter' // Вот эту штуку перенести в API
        }).done(function(data){
            if (!data){
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо');
                $('#modal_button').attr('class', 'modal_button_e');
            }
            else{
                $('.modal_back_edit').removeAttr('id');
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
                sessionStorage.setItem('refresh', 'true');
            }
        });
    });

    $('#cancel_recruiter').on('click', (e) => {
        alert('Пока не известно что делать! Удалять или заносить в базу как неактивного рекрутера');
        $('.modal_back_edit').attr('id', 'display_none')

    });

    $('#save_recruiter').on('click', (e) => {

        var data = {
            id: sessionStorage.getItem('activ_id_recruiter')
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/updatedata/recruitermoderation'
        }).done(function(data){
            if(!data.ok){
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо');
                $('#modal_button').attr('class', 'modal_button_e');
            } else{
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо');
                $('#modal_button').attr('class', 'modal_button_s');
                sessionStorage.setItem('refresh', 'true');
            }
        });

    })

    // ВСЕ, ЧТО КАСАЕТСЯ УДАЛЕНИЕ (СТАВИТСЯ СТАТУС False) РЕКРУТЕРА ИЗ БАЗЫ ДАННЫХ

    $('#modal_button_remove_no').on('click', () => {
        $('.modla_back_remove').attr('id', 'display_none');
    });

    $('.icon_delete').on('click', (e) => {
        var id = e.target.parentElement.parentElement.getElementsByClassName('id_for_line')[0].textContent;
        $('#warning_text').text('Уверены, что хотетие удалить рекрутера?');
        $('#warning_text').attr('class', 'modal_line_error');
        sessionStorage.setItem('id_remove_recruiter', id);
        sessionStorage.setItem('type_update', false);

        $('#modal_button_remove_no').attr('class', 'modal_button_remove_s');
        $('#modal_button_remove_yes').attr('class', 'modal_button_remove_e');

        $('.modla_back_remove').removeAttr('id');
    });
    $('.icon_cancel').on('click', (e) => {
        var id = e.target.parentElement.parentElement.getElementsByClassName('id_for_line')[0].textContent;
        $('#warning_text').text('Уверены, что хотетие вернуть рекрутера?');
        $('#warning_text').attr('class', 'modal_line_success');
        sessionStorage.setItem('id_remove_recruiter', id);
        sessionStorage.setItem('type_update', true);

        $('#modal_button_remove_no').attr('class', 'modal_button_remove_e');
        $('#modal_button_remove_yes').attr('class', 'modal_button_remove_s');

        $('.modla_back_remove').removeAttr('id');
    });

    $('#modal_button_remove_yes').on('click', () => {
        

        var data = {
            id: sessionStorage.getItem('id_remove_recruiter'),
            status: sessionStorage.getItem('type_update')
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
                sessionStorage.setItem('refresh', 'true');
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
            url: '/worksheets/findworksheets' // ВОТ ЭТУ ШТУКУ ПЕРЕНЕСТИ В API
        }).done(function(data){
            if (!data){
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо');
                $('#modal_button').attr('class', 'modal_button_e');
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
                sessionStorage.setItem('refresh', 'true');
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
                sessionStorage.setItem('refresh', 'true');
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

    // СОХРАНЕНИЕ ИЗМЕНЕНИЙ ДАННЫХ О ПОЛЬЗОВАТЕЛЕ
    $('#save_editing_user').on('click', (e) => {

        var data = {
            old_password: $('#old-password').val(),
            new_password: $('#new-password').val(),
            confirm_password: $('#confirm-password').val(),
            email: $('#new-email').val(),
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/updatedata/user'
        }).done(function(data){
            if (!data.ok){

                if (!$('p.error').text()){
                    $('#save_editing_user').before('<p class="error">' + data.error + '</p>');
                }
                
                if (data.fields){
                    data.fields.forEach(function(item){
                        $('input[name=' + item + ']').addClass('error');
                    });
                }
            }
            else{
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо')
                $('#modal_button').attr('class', 'modal_button_s')
                sessionStorage.setItem('logout', 'true');
            }
        });

    });

    // ИЗМЕНЕНИЕ СТАТУСА ПОЛЬЗОВАТЕЛЯ
    $('.status_for_user_td_true').on('click', (e) => {
        var left = $(e.target).offset().left;
        var top = $(e.target).offset().top;

        $('.status_for_user').css({
            'left': left,
            'top': top
        });
        $('.status_for_user').removeAttr('id');

        e.target.id = 'input_new_text';

        var id = e.target.parentElement.children[0].textContent
        sessionStorage.setItem('edit_status_user_id', id);
    });
    $('.status_for_user_td_false').on('click', (e) => {
        var left = $(e.target).offset().left;
        var top = $(e.target).offset().top;

        $('.status_for_user').css({
            'left': left,
            'top': top
        });
        $('.status_for_user').removeAttr('id');

        e.target.id = 'input_new_text';

        var id = e.target.parentElement.children[0].textContent
        sessionStorage.setItem('edit_status_user_id', id);
    });

    $('.status_for_user').on('click', (e) => {
        var text = e.target.textContent;


        $('#input_new_text').text(text);

        if (text == "Активен"){
            var data = {
                status: true,
                id: sessionStorage.getItem('edit_status_user_id')
            }
            $('#input_new_text').attr('class', 'status_for_user_td_true');
        } else{
            var data = {
                status: false,
                id: sessionStorage.getItem('edit_status_user_id')
            }
            $('#input_new_text').attr('class', 'status_for_user_td_false');
        }

        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/updatedata/userstatus'
        }).done(function(data){
            if (!data.ok){
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо');
                $('#modal_button').attr('class', 'modal_button_e');
                $('.status_for_user').attr('id', 'display_none');

            } else{
                sessionStorage.setItem('refresh', 'true');
                $('.status_for_user').attr('id', 'display_none');
            }
        });

        $('#input_new_text').removeAttr('id');
        



    });

    $('.status_for_user').on('mouseleave', (e) => {
        $('.status_for_user').attr('id', 'display_none');
    })

    // УДАЛЕНИЕ ПОЛЬЗОВАТЕЛЯ
    $('.icon_delete_user').on('click', (e) => {
        var id = e.target.parentElement.parentElement.children[0].textContent;
        
        var data = {
            id: id
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/removedata/user'
        }).done(function(data){
            if (!data.ok){
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_error');
                $('#modal_line').text(data.error);
                $('#modal_button').text('Плохо');
                $('#modal_button').attr('class', 'modal_button_e');
            }else{
                $('.modal_back').attr('id', '');
                $('#modal_line').attr('class', 'modal_line_success');
                $('#modal_line').text("Данные успешно сохранены");
                $('#modal_button').text('Хорошо');
                $('#modal_button').attr('class', 'modal_button_s');
                sessionStorage.setItem('refresh', 'true');
            }
        });

    });

    // РАЗДЕЛ TOOLTIP СТАТИСТИКА
    //---- Для первой диаграммы
    //месяц
    $('#tooltip_month_one').on('click', (e) => {
        var text = e.target.textContent;
        var date = new Date();
        $('#title_month_stat_one').text(text);
        $('#tooltip_month_one').css('display', 'none');
        if ($('#title_year_stat_one').text() == 'Год'){
            $('#title_year_stat_one').text(date.getFullYear());
        }

        var data = {
            month: text,
            year: $('#title_year_stat_one').text()
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/administration/statistics/searchdata'
        }).done(function(data){
            if(!data.ok){
                console.log('Error!');
            }
            else{

                var arr = [['Day', 'Новые']];


                for (i=1; i < data.data.count+1; i++){
                    arr.push([String(i), data.data[i].length]);
                }

                if(document.URL.indexOf('statistics') != -1) {
                    // МОЯ ПЕРВАЯ ДИАГРАММА
                    google.charts.load('current', {'packages':['corechart', 'bar']});
                    google.charts.setOnLoadCallback(drawChart);
            
                    function drawChart() {
                        var data = google.visualization.arrayToDataTable(arr);
            
                        var options = {
                            curveType: 'function',
                            legend: { position: 'none' }
                        };
            
                        var chart = new google.visualization.AreaChart(document.getElementById('curve_chart_one'));
            
                        chart.draw(data, options);
                    }
                }
            }
        });

    });
    $('#tooltip_month_one').on('mouseleave', (e) => {
        $('#tooltip_month_one').css('display', 'none');
    });
    $('#title_month_stat_one').on('mouseenter', (e) => {
        $('#tooltip_month_one').css({
            'display':'flex',
            'top': $('#title_month_stat_one').position().top+30
        });

        $('#tooltip_year_one').css('display', 'none');
    });
    $('#tooltip_month_one').on('mouseenter', (e) => {
        $('#tooltip_month_one').css('display', 'flex');
    });
    $('#title_month_stat_one').on('mouseleave', (e) => {
        $('#tooltip_month_one').css('display', 'none');
    });
    //год
    $('#tooltip_year_one').on('click', (e) => {
        var text = e.target.textContent;
        $('#title_year_stat_one').text(text);
        $('#tooltip_year_one').css('display', 'none');

        var data = {
            year: text
        }

        $('#first_d_month ul').remove();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/administration/statistics/searchmonth'
        }).done(function(data){
            if(!data.ok){
                console.log('Error!');
            }
            else{
                $('#first_d_month').append('<ul></ul>')

                for (x=0; x < data.data.month.length; x++){
                    $('#first_d_month ul').append('<li>' + data.data.month[x] + '</li>')
                }

                $('#title_month_stat_one').text('Месяц');
            }
        });

    });
    $('#tooltip_year_one').on('mouseleave', (e) => {
        $('#tooltip_year_one').css('display', 'none');
    });
    $('#title_year_stat_one').on('mouseenter', (e) => {
        $('#tooltip_year_one').css({
            'display': 'flex',
            'top': $('#title_year_stat_one').position().top+30
        });
        $('#tooltip_month_one').css('display', 'none');
    });
    $('#tooltip_year_one').on('mouseenter', (e) => {
        $('#tooltip_year_one').css('display', 'flex');
    });
    $('#title_year_stat_one').on('mouseleave', (e) => {
        $('#tooltip_year_one').css('display', 'none');
    });

    //---- Для второй диаграммы
    //месяц
    $('#tooltip_month').on('click', (e) => {
        var text = e.target.textContent;
        var date = new Date();
        $('#title_month_stat').text(text);
        $('#tooltip_month').css('display', 'none');
        if ($('#title_year_stat').text() == 'Год'){
            $('#title_year_stat').text(date.getFullYear());
        }

        var data = {
            year: $('#title_year_stat').text(),
            month: text
        }

        $('.table_rec_edit tbody').remove();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/administration/statistics/searcdatatwo'
        }).done(function(data){
            if(!data.ok){
                console.log('Error!');
            }
            else{
                $('.table_rec_edit').append('<tbody></tbody>');

                var arr = [['Рекрутер', 'Анкет', { role: 'style' } ]]

                for (var x=0; x < data.data.fio.length; x++){

                    $('.table_rec_edit tbody').append('<tr></tr>');
                    $('.table_rec_edit tbody tr:last-child').append('<td>' + String(Number(x)+1) + '</td>');
                    $('.table_rec_edit tbody tr:last-child').append('<td>' + data.data.fio[x] + '</td>');
                    $('.table_rec_edit tbody tr:last-child').append('<td>' + data.data.skype[x] + '</td>');
                    $('.table_rec_edit tbody tr:last-child').append('<td>' + data.data.email[x] + '</td>');
                    $('.table_rec_edit tbody tr:last-child').append('<td>' + data.data.telephone[x] + '</td>');
                    $('.table_rec_edit tbody tr:last-child').append('<td>' + data.data.count[x].length + '</td>');

                    arr.push([ 
                        data.data.fio[x].split(' ')[0] +' '+ data.data.fio[x].split(' ')[1].charAt(0)+ '. ' + data.data.fio[x].split(' ')[2].charAt(0) + '.', 
                        data.data.count[x].length,  
                        'color: #76A7FA'
                    ])
                }

                google.charts.load('current', {packages: ['corechart', 'bar']});
                google.charts.setOnLoadCallback(drawBasic);

                function drawBasic() {

                    var data = google.visualization.arrayToDataTable(arr);

                    var chart = new google.visualization.ColumnChart(
                        document.getElementById('curve_chart_two'));

                    chart.draw(data);
                }
            }
        });

    });
    $('#tooltip_month').on('mouseleave', (e) => {
        $('#tooltip_month').css('display', 'none');
    });
    $('#title_month_stat').on('mouseenter', (e) => {
        $('#tooltip_month').css({
            'display':'flex',
            'top': $('#title_month_stat').position().top+30
        });

        $('#tooltip_year').css('display', 'none');
    });
    $('#tooltip_month').on('mouseenter', (e) => {
        $('#tooltip_month').css('display', 'flex');
    });
    $('#title_month_stat').on('mouseleave', (e) => {
        $('#tooltip_month').css('display', 'none');
    });
    //год
    $('#tooltip_year').on('click', (e) => {
        var text = e.target.textContent;
        $('#title_year_stat').text(text);
        $('#tooltip_year').css('display', 'none');

        var data = {
            year: text
        }

        $('#second_d_month ul').remove();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/administration/statistics/searchmonth'
        }).done(function(data){
            if(!data.ok){
                console.log('Error!');
            }
            else{
                $('#second_d_month').append('<ul></ul>')

                for (x=0; x < data.data.month.length; x++){
                    $('#second_d_month ul').append('<li>' + data.data.month[x] + '</li>')
                }

                $('#title_month_stat').text('Месяц');
            }
        });
    });
    $('#tooltip_year').on('mouseleave', (e) => {
        $('#tooltip_year').css('display', 'none');
    });
    $('#title_year_stat').on('mouseenter', (e) => {
        $('#tooltip_year').css({
            'display': 'flex',
            'top': $('#title_year_stat').position().top+30
        });
        $('#tooltip_month').css('display', 'none');
    });
    $('#tooltip_year').on('mouseenter', (e) => {
        $('#tooltip_year').css('display', 'flex');
    });
    $('#title_year_stat').on('mouseleave', (e) => {
        $('#tooltip_year').css('display', 'none');
    });

    // Отображение, скрытие диаграмм
    $('#first_hh_stat').on('click', (e) => {
        var display = $('#curve_chart_one').css('display');
        if (display == 'none'){
            $('#curve_chart_one').removeAttr('style');
        }
        else{
            $('#curve_chart_one').css('display', 'none');
        }
    });
    $('#second_hh_stat').on('click', (e) => {
        var display = $('#curve_chart_two').css('display');
        if (display == 'none'){
            $('#curve_chart_two').removeAttr('style');
            $('.table_rec_edit').removeAttr('style');
        }
        else{
            $('#curve_chart_two').css('display', 'none');
            $('.table_rec_edit').css('display', 'none');
        }
    });

    // Фильтрация кандидатов, которые на модерации
    $('#rec_filter').on('change', (e) => {
        var row = document.getElementsByClassName('table_rec_edit')[0].rows
        var recFilter = $('#rec_filter').val();

        for (var i=1; i < row.length; i++){
            row[i].removeAttribute('style');
        }

        if (recFilter == 'true') {
            for (var i=1; i < row.length; i++){
                if (row[i].cells[7].textContent == 'false'){
                    row[i].setAttribute('style', 'display: none;');
                }
            }
        } else if (recFilter == 'false') {
            for (var i=1; i < row.length; i++){
                if (row[i].cells[7].textContent == 'true'){
                    row[i].setAttribute('style', 'display: none;');
                }
            }
        }
    });

});  