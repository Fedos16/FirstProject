const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/edit', async (req, res) => {

      
    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'recruiters',
        submain: 'edit'
    }
    if (login){

        var data = {
            user: login,
            typeUser: userType,
            page: page
        }

        try {
            var rec = await models.Recruiter.find({}, {fio: 1, residence: 1, telephone: 1, directions: 1, status: 1});
            data.rec = rec;
        } catch (e) {
            data.rec = [];
        }

        res.render('./recruiters/edit', {data});
        
    }
    else{
        res.redirect('/administration/');
    }
});
router.get('/moderation', async (req, res) => {
    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'recruiters',
        submain: 'moderation'
    };
    const data = {
        user: login,
        typeUser: userType,
        page: page
    }
    if (login){

        try{
            var rec = await models.Recruiter.find({status: 'Модерация'}, {fio: 1, residence: 1, telephone: 1, directions: 1});
            data.rec = rec;
        } catch(e){
            data.rec = [];
        }

        res.render('./recruiters/moderation', {data});

    }
    else{
        res.redirect('/administration/');
    }
});
router.get('/new', (req, res) => {

    const login = req.session.userLogin;
    if (login){
        res.render('./recruiters/new_recruiter');
    }
    else{
        res.redirect('/administration/');
    }

});
router.get('/id:id', async (req, res) => {

    const id = req.params.id;

    var rec
    try {
        rec = await models.Recruiter.findOne( {_id: id, status: 'Редактирование'});
    } catch (e) {
        rec = {};
    }

    res.render('./recruiters/editing_user', {rec});

});
router.post('/findrecruiter', (req, res) => {
    
    const id = req.body.id;
    
    models.Recruiter.findById(id, (err, recruiter) => {
        if (err) res.json({ ok: false, error: 'Попробуйте позже' });

        res.json({ ok: true, data: recruiter });
    })

})

module.exports = router;