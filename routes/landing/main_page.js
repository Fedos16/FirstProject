const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const myEmail = 'olegator072@gmail.com';
const models = require('../../models');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myEmail,
        pass: 'Asser220'
    }
});

router.get('/', (req, res) => {
  
    var data = {
      session_status: false,
      session_rec_id: null
    }

    res.render('./landing/index', {data});
    
});
router.post('/consultation', (req, res) => {
    const company = req.body.company;
    const name = req.body.name;
    const messenger = req.body.messenger;
    const data_messenger = req.body.data_messenger;
    const email = req.body.email;
    const time = req.body.time;
    const additional_info = req.body.additional_info;

    var fields = [];

    if (!company || !name || !email || !messenger || !data_messenger || !time){
        if (!company) fields.push('consult_company');
        if (!name) fields.push('consult_name');
        if (!email) fields.push('consult_email');
        if (!messenger) fields.push('messenger');
        if (!data_messenger) fields.push('consult_data_messenger');
        if (!time) fields.push('consult_time');

        res.json({ok: false, text: 'Не все поля заполнены', fields: fields});
    }
    else if (email && !/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/.test(email)){
        fields.push('consult_email')
        res.json({ok: false, text: 'E-mail имеет не верный формат', fields: fields});
    }
    else{
        var mailOptionsClient = {
            from: 'HR Network <' + myEmail + '>',
            to: email,
            subject: "Забронирована консультация",
            html: `
            <p>Мы уже обрабатываем вашу заявку.<br>В скором времени менеджер HR Network свяжется с Вами</p>
            <br>
            <h4>Компания: </h4><p>${company}</p>
            <h4>Имя: </h4><p>${name}</p>
            <h4>Мессенджер: </h4><p>${messenger} ${data_messenger}</p>
            <h4>E-mail: </h4><p>${email}</p>
            <h4>Время для связи: </h4><p>${time}</p>
            <h4>Дополнительная информация</h4><p>${additional_info}</p>
            `
        };
        var mailOptionsManager = {
            from: 'HR Network <' + myEmail + '>',
            to: myEmail,
            subject: "Компания. Забронирована консультация",
            html: `
            <h4>Компания: </h4><p>${company}</p>
            <h4>Имя: </h4><p>${name}</p>
            <h4>Мессенджер: </h4><p>${messenger} ${data_messenger}</p>
            <h4>E-mail: </h4><p>${email}</p>
            <h4>Время для связи: </h4><p>${time}</p>
            <h4>Дополнительная информация</h4><p>${additional_info}</p>
            `
        };

        transporter.sendMail(mailOptionsManager, (error) => {
            if (error) res.json({ok: false, text: 'Попробуйте позже!'});

            transporter.sendMail(mailOptionsClient, (error) => {
                if (error) res.json({ok: false, text: 'Попробуйте позже!'});
                res.json({ok: true, text: 'Ваша заявка обрабатывается. Команда HR Network свяжется с Вами'});
            });
        });
    }
});
router.post('/additionaldoc', (req, res) => {
    const typeDocument = req.body.typeDocument;

    var data = {};
    if (typeDocument == 'Directions'){
        models.Directions.find((err, dir) => {
            if (err) res.json({ok: false, text: 'Попробуйте позже'});

            data.directions = dir;
            res.json({ok: true, data});
        });
    } else {
        res.json({ok: false, text: 'Ничего не найдено!'});
    }
});
// ПРЕДЗАГРУЗОЧНЫЕ ДАННЫЕ
router.post('/preloaddata', async (req, res) => {

    var dir = await models.Directions.find({}, {name: 1, _id: 0});
    var loc =  await models.Locations.find({}, {name: 1, _id: 0});
    var rew = await models.Rewiews.find({status: 'Активен'}, {fio: 1, company: 1, image_path: 1}).sort({'createdAt': -1}).limit(4);
    var worksheets = await models.Worksheets.find({status: 'Открыта'}, {level: 1, directions: 1, residence_country: 1, residence_city: 1, salary: 1, flag_path: 1}).sort({"createdAt": -1}).limit(6);
    var count_work = await models.Worksheets.countDocuments({status: 'Открыта'});
    var messengers = await models.Messengers.find({}, {name: 1});

    res.json({ok: true, dir, loc, rew, worksheets, count_work, messengers});

});
router.post('/findworksheets', async (req, res) => {
    const direction = req.body.direction;
    const localtion = req.body.localtion;
    const experience = req.body.experience;
    const period = req.body.period;
    const limit = req.body.limit;
    var page = parseInt(req.body.page);

    page = page*10-10;

    var data = {
        status: 'Открыта'
    };

    if (direction != 'Выбрать'){
        data.directions = direction;
    }
    if (localtion != 'Выбрать'){
        data.residence_country = localtion;
    }
    if (experience != 'Выбрать'){
        data.experiences = experience;
    }
    if (period != 'Выбрать'){
        // Периода пока нет!!!
    }

    try{
        var worksheets = await models.Worksheets.find(data, {level: 1, directions: 1, residence_country: 1, residence_city: 1, salary: 1, flag_path: 1}).sort({"createdAt": -1}).skip(page).limit(limit);
        var count_work = await models.Worksheets.countDocuments(data);
        res.json({ok: true, worksheets, count_work});
    } catch (err) {
        res.json({ok: false, text: 'По вашему запросу ничего не найдено!'});
    }
});
//ПОИСК ОДНОЙ АНКЕТЫ
router.post('/findworksheet', (req, res) => {

    const id = req.body.id;

    models.Worksheets.findById(id, (err, worksheets) =>{
        if (err) res.json({ok: false, text: 'В базе нет подходящих анкет!'});
        
        res.json({ok: true, worksheets});
    });
});
router.post('/findrewiew', (req, res) => {

    const id = req.body.id;

    models.Rewiews.findById(id, (err, rew) =>{
        if (err) res.json({ok: false, text: 'Отзыв не найден'});
        
        res.json({ok: true, rew});
    });
});
router.post('/arrowrewiew', (req, res) => {
    const arrow = req.body.arrow;

    models.Rewiews.find({status: 'Активен'}, {fio: 1, company: 1, image_path: 1}, (err, rew) => {
        if (err) res.json({ok: false, text: 'Попробуйте позже'});

        res.json({ok: true, rew})
    }).sort({'createdAt': -1}).skip(arrow).limit(4);
});
router.post('/itrecruiter', (req, res) => {
    const fio = req.body.fio;
    const skype = req.body.skype;
    const email = req.body.email;
    const time = req.body.time;

    var fields = [];

    if (!fio || !skype || !email || !time){
        if (!fio) fields.push('it_rec_fio');
        if (!skype) fields.push('it_rec_skype');
        if (!email) fields.push('it_rec_email');
        if (!time) fields.push('it_rec_time');

        res.json({ok: false, text: 'Не все поля заполнены', fields});
    }
    else if (email && !/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/.test(email)){
        fields.push('it_rec_email')
        res.json({ok: false, text: 'E-mail имеет не верный формат', fields});
    }
    else{
        var mailOptionsClient = {
            from: 'HR Network <' + myEmail + '>',
            to: myEmail,
            subject: "Новая заявка на обучение",
            html: `
            <h4>Ф. И. О.: </h4><p>${fio}</p>
            <h4>Skype: </h4><p>${skype}</p>
            <h4>E-mail: </h4><p>${email}</p>
            <h4>Удобное время для обучения: </h4><p>${time}</p>
            `
        };

        transporter.sendMail(mailOptionsClient, (error) => {
            if (error) res.json({ok: false, text: 'Попробуйте позже!'});
            res.json({ok: true, text: 'Ваша заявка обрабатывается. Команда HR Network свяжется с Вами'});
        });
    }

});
router.post('/notification', (req, res) => {
    const residence_country = req.body.residence_country;
    const residence_city = req.body.residence_city;
    const directions = req.body.directions;
    const level = req.body.level;
    const skills = req.body.skills;
    const language = req.body.language;
    const email = req.body.email;

    var fields = [];

    if (!email || !residence_country || !residence_city || !directions[0] || !level[0]){
        if (!email) fields.push('not_email');
        if (!residence_city || !residence_country) fields.push('not_residence');
        if (!directions[0]) fields.push('not_button_directions');
        if (!level[0]) fields.push('not_button_level');
        res.json({ok: false, text: 'Не все поля заполнены!', fields});
    } else if (email && !/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/.test(email)){
        fields.push('not_email');
        res.json({ok: false, text: 'E-mail имеет не верный формат!', fields});
    } else {
        models.Notifications.create({
            residence_country,
            residence_city,
            directions,
            level,
            skills,
            language,
            email
        }).then(not => {
            console.log(not);
            res.json({
                ok: true, 
                text: 'Ваша заявка обрабатывается. Вы получите письмо на указанный E-mail при появлении подходящих кандидатов.'
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                ok: false,
                text: 'Ошибка, попробуйте позже!'
            });
        });
    }
});
router.post('/subscription', (req, res) => {
    const email = req.body.email;

    if (!email){
        res.json({ok: false, text: 'Заполните E-mail'});
    } else if (email && !/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/.test(email)){
        res.json({ok: false, text: 'E-mail имеет не верный формат'});
    } else {
        models.Subscript.findOne({email: email, status: true}, (err, sub) => {
            if (err) res.json({ok: false, text: 'Попробуйте позже!'});
            if (!sub) {
                models.Subscript.create({
                    email,
                    status: true
                }).then(not => {
                    console.log(not);
                    res.json({
                        ok: true, 
                        text: 'Вы успешно подписались на новости нашей компании!'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        ok: false,
                        text: 'Ошибка, попробуйте позже!'
                    });
                });
            } else {
                res.json({ok: false, text: 'Подписка уже оформлена!'});
            }
        });
    }
});
router.post('/contactus', (req, res) => {
    const text = req.body.text;
    const email = req.body.email;

    if (!text || !email){
        res.json({ok: false, text: 'Не все поля заполнены!'});
    } else if(email && !/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/.test(email)){
        res.json({ok: false, text: 'E-mail имеет не верный формат'});
    } else {
        var mailOptionsClient = {
            from: 'HR Network <' + myEmail + '>',
            to: myEmail,
            subject: "Новое сообщение от пользователя",
            html: `
            <h4>E-mail пользователя: </h4><p>${email}</p>
            <h4>Текст сообщения: </h4><p>${text}</p>
            `
        };

        transporter.sendMail(mailOptionsClient, (error) => {
            if (error) res.json({ok: false, text: 'Попробуйте позже!'});
            res.json({ok: true, text: 'Ваше сообщение отпрвлено, наша команда скоро свяжется с Вами!'});
        });
    }
});
router.post('/joboffer', (req, res) => {
    const id = req.body.id;
    const link = req.body.link;
    const name = req.body.name;
    const contacts = req.body.contacts;
    const date = req.body.date;
    const time = req.body.time;
    const message = req.body.message;

    var fields = [];

    if (!name || !contacts) {
        if (!name) fields.push('name-offer');
        if (!contacts) fields.push('contacts-offer');
        res.json({ok: false, text: 'Не все поля заполнены!', fields});
    } else {
        var mailOptionsClient = {
            from: 'HR Network <' + myEmail + '>',
            to: myEmail,
            subject: "Новое предложение для Кандидата",
            html: `
            <h4>Имя: </h4><p>${name}</p>
            <h4>Контакты: </h4><p>${contacts}</p>
            <h4>Ссылка на вакансию: </h4><p>${link}</p>
            <h4>Удобное время для связи: </h4><p>${date} - ${time}</p>
            <h4>Сообщение: </h4><p>${message}</p>

            <h3>ID Кандидата: </h3><p>${id}</p>
            `
        };

        transporter.sendMail(mailOptionsClient, (error) => {
            if (error) res.json({ok: false, text: 'Попробуйте позже!'});
            res.json({ok: true, text: 'Ваша заявка принята, команда HR свяжется с Вами в указанное время'});
        });
    }
})
module.exports = router;