$(document).ready(function(){

    var find_recruiter = () => {
        var data = {
            id: $('#id_work').text()
        }
    
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/administration/recruiters/findrecruiter'
        }).done(function(data){
            if (data.ok){
                $('#fio-r').val(data.data.fio)
                $('#birthday-r').val(data.data.birthday)
                $('#residence-r').val(data.data.residence)
                $('#phone-r').val(data.data.telephone)
                $('#skype-r').val(data.data.skype)
                $('#linkedin-r').val(data.data.linkedin)
                $('#place_work-r').val(data.data.place_work)
                $('#time_work_it-r').val(data.data.time_work_it)
                $('#email-r').val(data.data.email)
                $('#source-r').val(data.data.source)
                $('#coop_com-r').val(data.data.coop_com)
                $('#school-r').val(data.data.school)
                $('#language-r').val(data.data.language)
                $('#pay_details-r').val(data.data.pay_details)


                var directions = data.data.directions.split(', ');

                $('.modal_checkbox').prop('checked', false);

                for (var i=0; i < directions.length; i++){
                    $('.modal_checkbox[value="'+directions[i]+'"]').prop('checked', true);
                }
            } else {
                console.log('Error');
            }
        });
    }
    var find_worksheet = () => {
        var data = {
            id: $('#id_work_w').text()
        }
    
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/administration/worksheets/findworksheets'
        }).done(function(data){
            if (data.ok){
                $("#name-c").val(data.data.name);
                $('#directions-c option[value="'+data.data.directions+'"]').prop('selected', true);
                $("#phone-c").val(data.data.phone);
                $("#email-c").val(data.data.email);
                $('#all_messenger_new option[value="'+data.data.messenger+'"]').prop('selected', true);
                $("#data_messenger-c").val(data.data.data_messenger);
                $("#social-c").val(data.data.social);
                $("#linkedin-c").val(data.data.linkedin);
                $("#residence-c").val(data.data.residence_country + ', ' + data.data.residence_city);
                $("#relocate-c").val(data.data.relocate);
                $('#salary-c option[value="'+data.data.salary+'"]').prop('selected', true);
                $('#experiences-c option[value="'+data.data.experiences+'"]').prop('selected', true);
                $("#w_experiences-c").val(data.data.w_experiences);
                $("#best_skills-c").val(data.data.best_skills);
                $("#portfolio-c").val(data.data.portfolio);
                $("#language-c").val(data.data.language);
                $("#additional-c").val(data.data.additional);
                $("#download-c").val(data.data.download);
                $("#recr-c").val(data.data.recruiter);
                $("#status-c").val(data.data.status);

                var level = data.data.level.split(', ');
                for (i=0; i < level.length; i++){
                    $('.modal_checkbox[value="'+level[i]+'"]').prop('checked', true);
                }
                var recommendations = data.data.recommendations.split(', ');
                for (i=0; i < recommendations.length; i++){
                    $('.modal_checkbox[value="'+recommendations[i]+'"]').prop('checked', true);
                }
            } else {
                console.log(data);
            }
        });
    }
    var find_addytional_data = new Promise(
        (resolve, reject) => {
            var data = {
                typePage: 'EditWorksheets'
            }

            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/api/landing/preloaddata'
            }).done(function(data){
                if (data.ok){
                    var directions = data.dir;
                    var start = 0;
                    var arr = [];
                    for (x=0; x < 4; x++){
                        $('.modal_column_item:eq('+x+')').html('');
                    }
                    
                    for (i=0; i < directions.length; i++){
                        $('#directions-c').append($("<option></option>", {value: directions[i].name, text: directions[i].name}));
                        for (x=0; x < 4; x++){
                            for (y=start; y < directions.length; y++){
                                if (directions[y].name.length > 14){
                                    var short = directions[y].name.substr(0, 14)+'...';
                                } else { 
                                    var short = directions[y].name 
                                }
                                $('.modal_column_item:eq('+x+')').html($('.modal_column_item:eq('+x+')').html()+'<label class="modal_label" title="'+directions[y].name+'"><input type="checkbox" name="modal_checkbox-r" value="'+directions[y].name+'" class="modal_checkbox">'+short+'</label>');
                                arr.push(directions[y].name.toLowerCase());
                                break;
                            }
                            start ++;
                        }
                    }

                    var messenger = data.messengers;
                    for (i=0; i < messenger.length; i++){
                        $('#all_messenger_new').append($("<option></option>", {value: messenger[i].name, text: messenger[i].name}));
                    }


                    sessionStorage.setItem('new_directions', JSON.stringify(arr));
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        }
    );

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

            $('.modal_column_check').append('<div class="delete_new_direction '+un_id+'"><img src="/images/close_circle.png" alt=""></div>');

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
    $('#save_new_recruiter').on('click', (e) => {

        var directions = $(".modal_column_item input[name=modal_checkbox-r]:checked").map(function() {
            return this.value;
        }).get().join(", ");

        var data = {
            id: $('#id_work').text(),
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
            confirm_password: $('#password_confirm-r').val(),
            directions: directions,
            source: $('#source-r').val(),
            coop_com: $('#coop_com-r').val(),
            school: $('#school-r').val(),
            languages: $('#languages-r').val(),
            pay_details: $('#pay_details-r').val(),
            status: 'Модерация'
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/updatedata/recruiters'
        }).done(function(data){
            if (data.ok){
                $('#new_recruiter').hide();
                $('#s1, #s2, #s3').show();
               
            } else {
                $('#status_new_recruiter').css('opacity', 1);
                $('#status_new_recruiter').text(data.error);

                for (i=0; i<data.fields.length; i++){
                    $('#' + data.fields[i] + '-r').addClass('error');
                }
            }
        });

    });

    var preload_rec = () => {
        find_addytional_data
        .then(() => {
            find_recruiter();
        })
        .catch((err) => {
            console.log(err);
        });
    }
    var preload_work = () => {
        find_addytional_data
        .then(() => {
            find_worksheet();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    if ($('#id_work').text() != ''){
        preload_rec();
    } else if($('#id_work_w').text() != ''){
        preload_work();
    }

    $('input, textarea').focus(() => {
        $('#status_new_recruiter').css('opacity', 0);
        $('input, textarea').removeClass('error');
    });

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
    $('#save_new_candidate').on('click', (e) => {
        
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
            id: $('#id_work_w').text(),
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
            status: 'Модерация'
        }

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/api/updatedata/worksheets'
        }).done(function(data){
            
            if(data.ok){
                $('#new_recruiter').hide();
                $('#s1, #s2, #s3').show();
                
            }else{
                $('#status_new_recruiter').css('opacity', 1);
                $('#status_new_recruiter').text(data.text);
                data.fields.forEach(function(item){
                    $('#' + item).addClass('error');
                    if (item == 'messenger'){
                        $('#other_messenger_consult').addClass('error');
                    }
                });
            }
        });

    });

});