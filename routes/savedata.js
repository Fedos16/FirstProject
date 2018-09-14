const express = require('express');
const router = express.Router();

const models = require('../models');

// СОХРАНЕНИЕ РЕКРУТЕРА
router.post('/recruries', (req, res) => {
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
    const status = "Модерация";

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

    }else{

        models.Recruiter.create({
            fio,
            birthday,
            location,
            education,
            languages,
            telephone,
            email,
            skype,
            linkedin,
            it_work,
            last_work,
            source,
            recommendations,
            requisites,
            directions,
            status
        })
        .then(recruiter => {
            console.log(recruiter);
            res.json({
                ok: true
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                ok: false,
                error: 'Ошибка, попробуйте позже!'
            });
        });
    }
});
// СОХРАНЕНИЕ АНКЕТЫ КАНДИДАТА
router.post('/worksheets', (req, res) => {
    const recruiter = req.body.recruiter;
    const recruiter_id = req.body.recruiter_id;
    const directions = req.body.directions;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const messenger = req.body.messenger;
    const social = req.body.social;
    const linkedin = req.body.linkedin;
    const residence = req.body.residence;
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
    const status = "Модерация";

    if (!recruiter || !directions || !name || !email || !phone || !messenger || !social || !linkedin || !residence || !level || !salary || !experiences || !w_experiences || !best_skills || !portfolio || !language || !download){

        const fields = [];
        if (!recruiter) fields.push('recruiter-c');
        if (!directions) fields.push('directions-c');
        if (!name) fields.push('name-c');
        if (!email) fields.push('email-c');
        if (!phone) fields.push('phone-c');
        if (!messenger) fields.push('messenger-c');
        if (!social) fields.push('social-c');
        if (!linkedin) fields.push('linkedin-c');
        if (!residence) fields.push('residence-c');
        if (!level) fields.push('level-c');
        if (!salary) fields.push('salary-c');
        if (!experiences) fields.push('experiences-c');
        if (!w_experiences) fields.push('w_experiences-c');
        if (!best_skills) fields.push('best_skills-c');
        if (!portfolio) fields.push('portfolio-c');
        if (!language) fields.push('language-c');
        if (!download) fields.push('download-c');

        res.json({
            ok: false,
            error: 'Все поля должны быть заполнены!',
            fields
        });

    }else{

        models.Worksheets.create({
            recruiter,
            recruiter_id,
            directions,
            name,
            email,
            phone,
            messenger,
            social,
            linkedin,
            residence,
            level,
            salary,
            experiences,
            w_experiences,
            best_skills,
            portfolio,
            language,
            recommendations,
            additional,
            download,
            status
        })
        .then(worksheets => {
            console.log(worksheets);
            res.json({
                ok: true
            });
        })
        .catch(err => {
            console.log(err);
            res.json({
                ok: false,
                error: 'Ошибка, попробуйте позже!'
            });
        });
    }
});

module.exports = router;