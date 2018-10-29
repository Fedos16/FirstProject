const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const models = require('../../models');
const nodemailer = require('nodemailer');

const myEmail = 'olegator072@gmail.com';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myEmail,
        pass: 'Asser220'
    }
});

router.post('/recruiters', (req, res) => {
    const fio = req.body.fio;
    const birthday = req.body.birthday;
    const residence = req.body.residence;
    const telephone = req.body.telephone;
    const skype = req.body.skype;
    const linkedin = req.body.linkedin;
    const place_work = req.body.place_work;
    const time_work_it = req.body.time_work_it;
    const email = req.body.email;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const directions = req.body.directions;
    const source = req.body.source;
    const coop_com = req.body.coop_com;
    const school = req.body.school;
    const languages = req.body.languages;
    const pay_details = req.body.pay_details;

    const status = req.body.status;

    const id = req.body.id;

    const fields = [];

    if (!fio || !email || !telephone){

        if (!fio) fields.push('fio');
        if (!email) fields.push('email');
        if (!telephone) fields.push('email');

        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields
        });
    } else if (password && password != confirm_password){

        fields.push('password');
        fields.push('password_confirm')
        res.json({
            ok: false,
            error: 'Введынные пароли не совпадают!',
            fields
        });

    }
    else{
        models.Recruiter.findById(id, (err, recruiter) => {
            if (err) res.json({ ok: false, error: 'Попробуйте позже!' });

            recruiter.fio = fio;
            recruiter.birthday = birthday;
            recruiter.residence = residence;
            recruiter.telephone = telephone;
            recruiter.skype = skype;
            recruiter.linkedin = linkedin;
            recruiter.place_work = place_work;
            recruiter.time_work_it = time_work_it;
            recruiter.email = email;
            if (password){
                bcrypt.hash(password, null, null, (err, hash) => {
                    if (err) res.json( { ok: false, error: 'Неизвестная ошибка' } );
                    recruiter.password = hash;
                });
            }
            recruiter.directions = directions;
            recruiter.source = source;
            recruiter.coop_com = coop_com;
            recruiter.school = school;
            recruiter.languages = languages;
            recruiter.pay_details = pay_details;
            if (status){
                recruiter.status = status;
            }

            recruiter.save((errs) => {
                if (errs) res.json({ ok: false, error: 'Попробуйте позже' });
                
                res.json({ ok: true });
              });

            

        });
    }
});
router.post('/worksheets', (req, res) => {
    const id = req.body.id;
    const directions = req.body.directions;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const messenger = req.body.messenger;
    const data_messenger = req.body.data_messenger;
    const social = req.body.social;
    const linkedin = req.body.linkedin;
    const residence = req.body.residence;
    const relocate = req.body.relocate;
    const level = req.body.level;
    const salary = req.body.salary;
    const experiences = req.body.experiences;
    const w_experiences = req.body.w_experiences;
    const best_skills = req.body.best_skills;
    const portfolio = req.body.portfolio;
    const language = req.body.language;
    const recommendations = req.body.recommendations;
    const additional = req.body.additional;
    const download = req.body.download;
    const status = req.body.status;

    var locations = residence.split(', ');
    var residence_country = locations[0];
    var residence_city = locations[1] || 'нет данных';

    if (!name || !email || !phone || !residence_country || !residence_city){

        const fields = [];
        if (!name) fields.push('name-c');
        if (!email) fields.push('email-c');
        if (!phone) fields.push('phone-c');
        if (!residence_city || !residence_country) fields.push('residence-c');

        res.json({
            ok: false,
            text: 'Все поля должны были заполнены!',
            fields
        });

    }else{

        models.Worksheets.findById(id, (err, work) => {
            if (err) res.json({ ok: false, error: 'Попробуйте позже!' });

            work.directions = directions;
            work.name = name;
            work.email = email;
            work.phone = phone;
            work.messenger = messenger;
            work.data_messenger = data_messenger;
            work.social = social;
            work.linkedin = linkedin;
            work.residence_country = residence_country;
            work.residence_city = residence_city;
            work.relocate = relocate;
            work.level = level;
            work.salary = salary;
            work.experiences = experiences;
            work.w_experiences = w_experiences;
            work.best_skills = best_skills;
            work.portfolio = portfolio;
            work.language = language;
            work.recommendations = recommendations;
            work.additional = additional;
            work.download = download;
            if (status){
                work.status = status;
            }

            work.save((errs) => {
                if (errs) res.json({ ok: false, error: 'Попробуйте позже' });
                
                res.json({ ok: true });
              });

        });
                
    }
});
router.post('/rewiew', (req, res) => {
    const fio = req.body.fio;
    const company = req.body.company;
    const position = req.body.position;
    const rewiew = req.body.rewiew;

    const id = req.body.id;

    if (!fio || !company || !position || !rewiew){

        const fields = [];
        if (!fio) fields.push('fio');
        if (!company) fields.push('company');
        if (!position) fields.push('position');
        if (!rewiew) fields.push('rewiew');
        

        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields
        });
    }
    else{
        models.Rewiews.findById(id, (err, rew) => {
            if (err) res.json({ ok: false, error: 'Попробуйте позже!' });
            
            rew.fio = fio;
            rew.company = company;
            rew.position = position;
            rew.rewiew = rewiew;

            rew.save((errs) => {
                if (errs) res.json({ ok: false, error: 'Попробуйте позже' });
                
                res.json({ ok: true });
              });

        });
    }
});
router.post('/worksheetmoderation', async (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    const reason = req.body.reason;

    var id_rec = await models.Worksheets.findById(id, {recruiter_id: 1});
    var email_rec = await models.Recruiter.findById(id_rec.recruiter_id, {email: 1});

    models.Worksheets.findByIdAndUpdate(id, { status: status }, (errs) => {
        if (errs) res.json( {ok: false, error: 'Попробуйте позже'} );

        if (status == 'Открыта') {
            var mailOptionsClient = {
                from: 'HR Network <' + myEmail + '>',
                to: email_rec.email,
                subject: "Анкета кандидата одобрена",
                html: `
                <h2 style="color: #2C98F1;">Поздравляем!<h2>
                <h3>Анкета вашего Кандидата успешно прошла модерацию</h3>
                <p>Теперь анкета вашего Кандидата открыта для всего мира. Любой работадатель может предложить ему вакансию. Если кандидат будет принят на работу, вы получите вознаграждение в виде определенного %</p>
                `
            };
            transporter.sendMail(mailOptionsClient, (error) => {
                if (error) res.json({ok: false, text: 'Попробуйте позже!'});
                res.json({ok: true});
            });
        } else if (status == 'Редактирование') {
            mailOptionsClient = {
                from: 'HR Network <' + myEmail + '>',
                to: email_rec.email,
                subject: "Анкета кандидата отклонена",
                html: `
                <h2 style="color: #e82c0c;">Сожалеем!<h2>
                <h3>Анкета вашего Кандидата была отклонена</h3>
                <p><b>Причина:</b> ${reason}<p>
                <p>Перейдите по <a href="http://localhost:3000/administration/worksheets/id${id}">ссылке</a> для редактирования анкеты вашего Кандидата</p>
                `
            };
            transporter.sendMail(mailOptionsClient, (error) => {
                if (error) res.json({ok: false, text: 'Попробуйте позже!'});
                res.json({ok: true});
            });
        }


    });

});
router.post('/user', (req, res) => {

    const login = req.session.userLogin;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    const confirm_password = req.body.confirm_password;
    const email = req.body.email;

    var fields = []

    if (!new_password || !confirm_password || !old_password){
        if (!new_password) fields.push('new-password');
        if (!confirm_password) fields.push('confirm-password');
        if (!old_password) fields.push('old-password');

        res.json( {ok: false, error: 'Заполнены не все обязательные поля', fields});
    }
    else if (new_password != confirm_password){

        fields = ['new-password', 'confirm-password'];
        res.json( {ok: false, error: 'Пароли не совпадают', fields });
    }
    else if(email && !/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/.test(email)){

        fields = ['email'];
        res.json( {ok: false, error: 'E-mail имеет не верный формат', fields });
    }
    else if (new_password.length < 4){
        fields = ['new-password', 'confirm-password'];
        res.json( {ok: false, error: 'Длинна пароля не менее 5 символов', fields });
    }
    else{

        models.User.findOne({ login: login }, (error, user) => {
            if (error) res.json( {ok: false, error: 'Пользователь не найден'} );

            bcrypt.compare(old_password, user.password, function(err, result) {
                if (!result) {
                res.json({
                    ok: false,
                    error: 'Старый пароль введен не верно!',
                    fields: ['old-password']
                });
                } else {

                    bcrypt.hash(new_password, null, null, (err, hash) => {
                        if (err) res.json( { ok: false, error: 'Неизвестная ошибка' } );
                        if (email){
                            user.email = email;
                        }
                        user.password = hash;
                        user.save((errs) => {
                            if (errs) res.json({ ok: false, error: 'Попробуйте позже' });
                            
                            res.json({ ok: true });
                        });
                    })

                }
            });
        });
    }

});
router.post('/userstatus', (req, res) => {

    const id = req.body.id;
    const status = req.body.status;

    models.User.findByIdAndUpdate(id, {status: status }, (errs) => {
        if (errs) res.json( {ok: false, error: 'Попробуйте позже'} );
        res.json({ok: true});
    });
});
router.post('/recruitermoderation', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;
    const reason = req.body.reason;

    models.Recruiter.findByIdAndUpdate(id, { status: status }, (errs, rec) => {
        if (errs) res.json( {ok: false, error: 'Попробуйте позже'} );

        if (status == 'true') {
            var mailOptionsClient = {
                from: 'HR Network <' + myEmail + '>',
                to: rec.email,
                subject: "Ваша анкета одобрена",
                html: `
                <h2 style="color: #2C98F1;">Поздравляем!<h2>
                <h3>Ваша анкета успешно прошла модерацию</h3>
                <p>Теперь вы являетесь частью нашей команды. Можете приступать к внесению анкет в нашу базу, каждая анкета проходит модерацию, о результатах мы будем уведомлять вас по E-mail.</p>
                <h4>ВНИМАНИЕ: За нарушение правил сервиса вы будете удалены из базы рекрутеров!</h4>
                `
            };
            transporter.sendMail(mailOptionsClient, (error) => {
                if (error) res.json({ok: false, text: 'Попробуйте позже!'});
                res.json({ok: true});
            });
        } else if (status == 'Редактирование') {
            mailOptionsClient = {
                from: 'HR Network <' + myEmail + '>',
                to: rec.email,
                subject: "Ваша анкета отклонена",
                html: `
                <h2 style="color: #e82c0c;">Сожалеем!<h2>
                <h3>Ваша анкета была отклонена</h3>
                <p><b>Причина:</b> ${reason}<p>
                <p>Перейдите по <a href="http://localhost:3000/administration/recruiters/id${id}">ссылке</a> для редактирования вашей Анкеты</p>
                `
            };

            transporter.sendMail(mailOptionsClient, (error) => {
                if (error) res.json({ok: false, text: 'Попробуйте позже!'});
                res.json({ok: true});
            });
        }
    });
});
router.post('/rewiewmoderation', (req, res) => {

    const id = req.body.id;
    const status = "Активен";

    models.Rewiews.findByIdAndUpdate(id, {status: status }, (errs) => {
        if (errs) res.json( {ok: false, error: 'Попробуйте позже'} );
        res.json({ok: true});
    });
});

module.exports = router;