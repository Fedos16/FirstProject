const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/moderation', (req, res) => {

    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'worksheets',
        submain: 'none'
    }
    if (login){

        models.Worksheets.find((err, worksheets) => {

            const data = {
                user: login,
                typeUser: userType,
                page: page,
                name: [],
                residence: [],
                telephone: [],
                directions: [],
                experience: [],
                id: []
            }

            if (err) res.render('./worksheets/index', {data});
            
            for (var i=0; i < worksheets.length; i++){
                if (worksheets[i].status == "Модерация"){
                    data.name.push(worksheets[i].name);
                    data.residence.push(worksheets[i].residence);
                    data.telephone.push(worksheets[i].phone);
                    data.directions.push(worksheets[i].directions);
                    data.experience.push(worksheets[i].experiences);
                    data.id.push(worksheets[i]._id);
                }
            }

            res.render('./worksheets/index', {data});
        
        });
    }
    else{
        res.redirect('/administration/');
    }
});

router.get('/new', (req, res) => {

    const login = req.session.userLogin;

    if (login){

        models.Recruiter.find({ status: 'true' }, (err, recruiter) => {

            const data = {
                fio: [],
                id: []
            }

            if (err) res.render('./worksheets/new_candidate', { data });

            for (var i = 0; i < recruiter.length; i++){
                data.fio.push(recruiter[i].fio);
                data.id.push(recruiter[i]._id);
                

            }

            res.render('./worksheets/new_candidate', { data });

        });
    }
    else{
        res.redirect('/');
    }

});

router.post('/findworksheets', (req, res) => {
    const id = req.body.id;
    
    models.Worksheets.findById(id, (err, worksheets) => {
        if (err) res.json({ ok: false, error: 'Попробуйте позже' });

        res.json({ ok: true, data: worksheets });
    })
});

module.exports = router;