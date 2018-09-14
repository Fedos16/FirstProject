const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/filter', (req, res) => {

    const login = req.session.userLogin;
  
    if (login){
        
        models.TestSheet.find((error, test) => {

            var data = {
                direction: []
            }

            if (error) res.render('./filter', { data });

            for (var x=0; x < test.length; x++){
                if (data.direction.indexOf(test[x].direction) == -1){
                    data.direction.push(test[x].direction);
                }
            }

            res.render('./filter', { data });

        })

    }else{
        res.redirect('/');
    }
    
});
router.post('/search', (req, res) => {
    var experience = req.body.experince;
    var direction = req.body.direction;

    if (experience && direction){
        models.TestSheet.find({ experience: experience, direction: direction }, (err, test) => {

            var data = {
                name: [],
                level: [],
                salary: []
            }

            if (err) res.json({ ok: false, data: data });

            for (var x=0; x < test.length; x++){
                data.name.push(test[x].name);
                data.level.push(test[x].level);
                data.salary.push(test[x].salary);
            }

            res.json({ ok: true, data: data });
        });
    }
    else{
        if (experience){
            models.TestSheet.find({ experience: experience }, (err, test) => {

                var data = {
                    name: [],
                    level: [],
                    salary: []
                }

                if (err) res.json({ ok: false, data: data });

                for (var x=0; x < test.length; x++){
                    data.name.push(test[x].name);
                    data.level.push(test[x].level);
                    data.salary.push(test[x].salary);
                }

                res.json({ ok: true, data: data });
            });
        }
        else if(direction){
            models.TestSheet.find({ direction: direction }, (err, test) => {

                var data = {
                    name: [],
                    level: [],
                    salary: []
                }

                if (err) res.json({ ok: false, data: data });

                for (var x=0; x < test.length; x++){
                    data.name.push(test[x].name);
                    data.level.push(test[x].level);
                    data.salary.push(test[x].salary);
                }

                res.json({ ok: true, data: data });
            });
        }
        else{
            models.TestSheet.find((err, test) => {

                var data = {
                    name: [],
                    level: [],
                    salary: []
                }

                if (err) res.json({ ok: false, data: data });

                for (var x=0; x < test.length; x++){
                    data.name.push(test[x].name);
                    data.level.push(test[x].level);
                    data.salary.push(test[x].salary);
                }

                res.json({ ok: true, data: data });
            });
        }
    }
});
router.post('/filter', (req, res) => {

    const data = req.body.data;

    var direction = data[0];
    var name = data[1];
    var contact = data[2];
    var linkedin = data[3];
    var residence = data[4];
    var level = data[5];
    var salary = data[6];
    var experience = data[7].replace('+', '').replace(' ', '').replace('year', '').replace('s', '');
    var workExperience = data[8];
    var bestSkills = data[9];
    var language = data[10];
    var download = data[11];

    if (experience >= 1 && experience <= 3){
        experience = '1 - 3 года';
    }
    else if (experience >= 4 && experience <= 7){
        experience = '4 - 7 лет';
    }
    else if (experience >= 8 && experience <= 15){
        experience = '8 - 15 лет';
    }
    else if (experience >= 16){
        experience = 'Более 15 лет';
    }

    models.TestSheet.create({

        direction,
        name,
        contact,
        linkedin,
        residence,
        level,
        salary,
        experience,
        workExperience,
        bestSkills,
        language,
        download

    }).then(() => {
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
    
});

module.exports = router;