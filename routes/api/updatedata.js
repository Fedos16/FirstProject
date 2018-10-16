const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt-nodejs');

const models = require('../../models');

router.post('/recruiters', (req, res) => {
    const fio = req.body.fio;
    const birthday = req.body.birthday;
    const location = req.body.location;
    const education = req.body.education;
    const languages = req.body.languages;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const skype = req.body.skype;
    const linkedin = req.body.linkedin;
    const it_work = req.body.it_work;
    const last_work = req.body.last_work;
    const source = req.body.source;
    const recommendations = req.body.recommendations;
    const requisites = req.body.requisites;
    const directions = req.body.directions;

    const id = req.body.id;

    if (!fio || !birthday || !location || !languages || !telephone || !email || !skype || !linkedin || !it_work || !last_work || !source || !recommendations || !directions){

        const fields = [];
        if (!fio) fields.push('fio');
        if (!birthday) fields.push('birthday');
        if (!location) fields.push('location');
        if (!languages) fields.push('languages');
        if (!telephone) fields.push('telephone');
        if (!linkedin) fields.push('linkedin');
        if (!email) fields.push('email');
        if (!skype) fields.push('skype');
        if (!it_work) fields.push('it_work');
        if (!last_work) fields.push('last_work');
        if (!source) fields.push('source');
        if (!recommendations) fields.push('recommendations');
        if (!directions) fields.push('directions');

        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields
        });
    }
    else{
        models.Recruiter.findById(id, (err, recruiter) => {
            if (err) res.json({ ok: false, error: 'Попробуйте позже!' });

            
            recruiter.fio = fio;
            recruiter.birthday = birthday;
            recruiter.location = location;
            recruiter.education = education;
            recruiter.languages = languages;
            recruiter.telephone = telephone;
            recruiter.email = email;
            recruiter.skype = skype;
            recruiter.linkedin = linkedin;
            recruiter.it_work = it_work;
            recruiter.last_work = last_work;
            recruiter.source = source;
            recruiter.recommendations = recommendations;
            recruiter.requisites = requisites;
            recruiter.directions = directions;

            recruiter.save((errs) => {
                if (errs) res.json({ ok: false, error: 'Попробуйте позже' });
                
                res.json({ ok: true });
              });

            

        });
    }
});
router.post('/worksheets', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    models.Worksheets.findById(id, (err, worksheets) => {
        if (err) res.json({ ok: false, error: 'Попробуйте позже!' });

        worksheets.status = status;

        worksheets.save((errs) => {
            if (errs) res.json({ ok: false, error: 'Попробуйте позже' });
        
            res.json({ ok: true });
        });

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
    const status = true;

    models.Recruiter.findByIdAndUpdate(id, { status: status }, (errs) => {
        if (errs) res.json( {ok: false, error: 'Попробуйте позже'} );
        res.json({ok: true});
    });
});
router.post('/rewiew', (req, res) => {

    const id = req.body.id;
    const status = "Активен";

    models.Rewiews.findByIdAndUpdate(id, {status: status }, (errs) => {
        if (errs) res.json( {ok: false, error: 'Попробуйте позже'} );
        res.json({ok: true});
    });
});

module.exports = router;