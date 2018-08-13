const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/', (req, res) => {

    const login = req.session.userLogin;
    if (login){

        models.Worksheets.find((err, worksheets) => {

            const data = {
                user: login,
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
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {

    const login = req.session.userLogin;

    if (login){

        models.Recruiter.find((err, recruiter) => {

            const data = {
                fio: []
            }

            if (err) res.render('./worksheets/new_candidate', { data });

            for (var i = 0; i < recruiter.length; i++){
                if (recruiter[i].status){
                    data.fio.push(recruiter[i].fio);
                }

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
        if (err) res.json({ ok: false, error: 'Попробуйте позжу' });

        res.json({ ok: true, data: worksheets });
    })
});

module.exports = router;