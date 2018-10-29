const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/moderation', (req, res) => {

    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'worksheets',
        submain: 'moderation'
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

            if (err) res.render('./worksheets/moderation', {data});
            
            for (var i=0; i < worksheets.length; i++){
                if (worksheets[i].status == "Модерация"){
                    data.name.push(worksheets[i].name);
                    data.residence.push(worksheets[i].residence_country + ', ' + worksheets[i].residence_city);
                    data.telephone.push(worksheets[i].phone);
                    data.directions.push(worksheets[i].directions);
                    data.experience.push(worksheets[i].experiences);
                    data.id.push(worksheets[i]._id);
                }
            }

            res.render('./worksheets/moderation', {data});
        
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
router.get('/id:id', async (req, res) => {

    const id = req.params.id;

    var work = {}
    try {
        work = await models.Worksheets.findOne( {_id: id, status: 'Редактирование'});
    } catch (e) {
        res.redirect('/');
    }
    res.render('./worksheets/editing_worksheet', {work});

});
router.get('/preview:id', async (req, res) => {

    const id = req.params.id;
    const login = req.session.userLogin;

    if (login) {
        var work = {}
        try {
            work = await models.Worksheets.findOne( {_id: id});
        } catch (e) {
            res.redirect('/administration/');
        }
        res.render('./worksheets/prewiew_worksheet', {work});
    } else {
        res.redirect('/administration/');
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