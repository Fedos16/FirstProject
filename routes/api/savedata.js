const express = require('express');
const router = express.Router();
const path = require('path');
const models = require('../../models');
const Sharp = require('sharp');
const multer = require('multer');
const mkdirp = require('mkdirp');

const bcrypt = require('bcrypt-nodejs');

const config = require('../../config');
const diskStorage = require('../../utils/diskStorage');

const rs = () =>
  Math.random()
    .toString(36)
    .slice(-3);

const storage = diskStorage({
  destination: (req, file, cb) => {
    const dir = '/' + rs() + '/' + rs();
    req.dir = dir;

    mkdirp(config.DESTINATION + dir, err => cb(err, config.DESTINATION + dir));
    // cd(null, config.DESTINATION + dir);
  },
  filename: async (req, file, cb) => {
    const fileName = Date.now().toString(36) + path.extname(file.originalname);
    req.dir = req.dir + '/' + fileName;

    cb(null, fileName);
  },
  sharp: (req, file, cb) => {
    const resizer = Sharp()
      .resize(100, 99)
      .max()
      .withoutEnlargement()
      .toFormat('jpg')
      .jpeg({
        quality: 60,
        progressive: true
      });
    cb(null, resizer);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png' ) {
      const err = new Error('Extention');
      err.code = 'EXTENTION';
      return cb(err);
    }
    cb(null, true);
  }
}).single('file');

// SAVE IMAGE
router.post('/saveimage', (req, res) => {
  upload(req, res, err => {
    let error = '';
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        error = 'Картинка не более 2mb!';
      }
      if (err.code === 'EXTENTION') {
        error = 'Только jpeg и png!';
      }
    }

    res.json({
      ok: !error,
      error,
      path: req.dir
    });
  });
});
// СОХРАНЕНИЕ РЕКРУТЕРА
router.post('/recruiters', (req, res) => {
    const fio = req.body.fio;
    const birthday = req.body.birthday;
    const residence = req.body.residence;
    var telephone = req.body.telephone;
    const skype = req.body.skype;
    const linkedin = req.body.linkedin;
    const place_work = req.body.place_work;
    const time_work_it = req.body.time_work_it;
    const email = req.body.email;
    const password = req.body.password;
    const password_confirm = req.body.password_confirm;
    const directions = req.body.direction;
    const source = req.body.source;
    const coop_com = req.body.coop_com;
    const school = req.body.school;
    const language = req.body.language;
    const pay_details = req.body.pay_details;
    const divugle = req.body.divugle;
    const status = "Модерация";

    var fields = []

    if (!email || !fio || !password || !password_confirm || !telephone){

        if (!email) fields.push('email-r');
        if (!fio) fields.push('fio-r');
        if (!password) fields.push('password-r');
        if (!password_confirm) fields.push('password_confirm-r');
        if (!telephone) fields.push('phone-r');

        res.json({ok: false, text: 'Не все обязательные поля заполнены!', fields});

    } else if (password != password_confirm) {
        fields.push('password-r');
        fields.push('password_confirm-r');
        res.json({ok: false, text: 'Введенные пароли не совпадают!', fields});
    } else if (email && !/^[0-9a-z-.]+@[0-9a-z-]{2,}\.[a-z]{2,}$/.test(email)){
        fields.push('email-r');
        res.json({ok: false, text: 'E-mail имеет не верный формат!', fields});
    } else if (!divugle){
        res.json({ok: false, text: 'Примите условия работы!'});
    }
     else {

        telephone = telephone.replace(/\D/g, '');

        models.Recruiter.findOne({$or : [{email: email}, {telephone: telephone}]}, {
            email
        }).then(rec => {
            if (!rec) {
                bcrypt.hash(password, null, null, (err, hash) => {
                    models.Recruiter.create({
                        fio,
                        birthday,
                        residence,
                        telephone,
                        skype,
                        linkedin,
                        place_work,
                        time_work_it,
                        email,
                        password: hash,
                        directions,
                        source,
                        coop_com,
                        school,
                        language,
                        pay_details,
                        divugle,
                        status
                    })
                    .then(rec => {
                        console.log(rec);
                        res.json({
                            ok: true,
                            text: 'Данные успешно сохранены и отправлены на модерацию'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            ok: false,
                            text: 'Ошибка, попробуйте позже!'
                        });
                    });
                });
            } else {
                res.json({
                    ok: false,
                    text: 'Рекрутер уже существует'
                });
            }
        });
    }
});
// СОХРАНЕНИЕ АНКЕТЫ КАНДИДАТА
router.post('/worksheets', (req, res) => {
    var recruiter = "";
    const recruiter_id = req.body.recruiter_id;
    const directions = req.body.directions;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const messenger = req.body.messenger;
    const data_messenger = req.body.data_messenger;
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
        models.Recruiter.findById(recruiter_id, (err, rec) => {
            if (err) res.json({ ok: false, text: 'Авторизованный рекрутер не обнаружен!' });

            recruiter = rec.fio;

            models.Locations.findOne({ name: locations[0] }, {flag_path: 1}, {})
            .then(loc => {

                var flag_path = loc.flag_path ;
                models.Worksheets.create({
                    recruiter,
                    recruiter_id,
                    directions,
                    name,
                    email,
                    phone,
                    messenger,
                    data_messenger,
                    social,
                    linkedin,
                    residence_country,
                    residence_city,
                    flag_path,
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
                        ok: true,
                        text: 'Данные о кандидате сохранены и отправлены на модерацию.'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        ok: false,
                        text: 'Ошибка, попробуйте позже!'
                    });
                });
            })
            .catch(err => {
                console.log(err);

                var flag_path = '/netral/flag/flag.png';

                models.Worksheets.create({
                    recruiter,
                    recruiter_id,
                    directions,
                    name,
                    email,
                    phone,
                    messenger,
                    data_messenger,
                    social,
                    linkedin,
                    residence_country,
                    residence_city,
                    flag_path,
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
                        ok: true,
                        text: 'Данные о кандидате сохранены и отправлены на модерацию.'
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        ok: false,
                        text: 'Ошибка, попробуйте позже!'
                    });
                });
            });
        });
    }
});
// СОХРАНЕНИЕ ОТЗЫВА
router.post('/rewiews', (req, res) => {
    const fio = req.body.fio;
    const company = req.body.company;
    const position = req.body.position;
    const rewiew = req.body.rewiew;
    const status = "Модерация";
    const image_path = req.body.image_path;

    if (!fio || !company || !position || !rewiew){

        const fields = [];
        if (!fio) fields.push('fio-fideback');
        if (!company) fields.push('company-r');
        if (!position) fields.push('position-r');
        if (!rewiew) fields.push('rewiew-r');

        res.json({
            ok: false,
            text: 'Все поля должны были заполнены!',
            fields
        });

    }
    else if (!image_path){
        res.json({
            ok: false,
            text: 'Фото представителя компании не загружено!!!'
        });
    }
    else{

        models.Rewiews.create({
            fio,
            company,
            position,
            rewiew,
            image_path,
            status
        })
        .then(rew => {
            console.log(rew);
            res.json({
                ok: true,
                text: 'Ваш отзыв сохранен и направлен на модерацию. Скоро вы увидите его на нашем сайте'
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
router.post('/directionitem', (req, res) => {
    const name = req.body.text;

    if (!name){

        const fields = [];
        if (!name) fields.push('direction_data');

        res.json({
            ok: false,
            text: 'Все поля должны были заполнены!',
            fields
        });

    }
    else{
        models.Directions.findOne({name}, (err, dir) => {
            if (err) res.json({ok: false, text: 'Попробуйте позже'});
            if (!dir){
                models.Directions.create({
                    name
                })
                .then(rew => {
                    console.log(rew);
                    res.json({
                        ok: true,
                        text: 'Успешно сохранено'
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
            else {
                res.json({ok: false, text: 'Специальность уже есть в базе'});
            }
        });
        
    }
});
router.post('/locationitem', (req, res) => {
    const name = req.body.text;
    const flag_path = req.body.path

    if (!name || !flag_path){

        res.json({
            ok: false,
            text: 'Все поля должны были заполнены!'
        });

    }
    else{
        models.Locations.findOne({name}, (err, loc) => {
            if (err) res.json({ok: false, text: 'Попробуйте позже'});
            if (!loc) {
                models.Locations.create({
                    name,
                    flag_path
                })
                .then(rew => {
                    console.log(rew);
                    models.Worksheets.find({residence_country: name}, {id: 1}, (err, work) => {
                        if (err) res.json({ok: false, text: 'Попробуйте позже'});
                        for (var i=0; i < work.length; i++){
                            models.Worksheets.findByIdAndUpdate(work[i]._id, {flag_path: flag_path}, (errs) => {
                                if (errs) return false;
                                return true;
                            });
                        }
                        res.json({
                            ok: true,
                            text: 'Успешно сохранено'
                        });
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
                res.json({ok: false, text: 'Страна уже есть в базе!'});
            }
        });
        
    }
});
router.post('/messengeritem', (req, res) => {
    const name = req.body.text;

    if (!name){

        const fields = [];
        if (!name) fields.push('direction_data');

        res.json({
            ok: false,
            text: 'Все поля должны были заполнены!',
            fields
        });

    }
    else{
        models.Messengers.findOne({name}, (err, mes) => {
            if (err) res.json({ok: false, text: 'Попробуйте позже!'});
            if (!mes){
                models.Messengers.create({
                    name
                })
                .then(rew => {
                    console.log(rew);
                    res.json({
                        ok: true,
                        text: 'Успешно сохранено'
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
                res.json({ok: false, text: 'Мессенджер уже есть в базе'});
            }
        });
        
    }
});

module.exports = router;