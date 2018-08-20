const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/edit', (req, res) => {

      
    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'recruiters',
        submain: 'edit'
    }
    if (login){

        models.Recruiter.find((err, recruiter) => {

            const data = {
                user: login,
                typeUser: userType,
                page: page,
                fio: [],
                location: [],
                telephone: [],
                directions: [],
                id: [],
                status: []
            }

            if (err) res.render('./recruiters/edit', {data});
            
            for (var i=0; i < recruiter.length; i++){
                
                data.fio.push(recruiter[i].fio);
                data.location.push(recruiter[i].location);
                data.telephone.push(recruiter[i].telephone);
                data.directions.push(recruiter[i].directions);
                data.id.push(recruiter[i]._id);
                data.status.push(recruiter[i].status);
                
            }

            res.render('./recruiters/edit', {data});
        
        });
    }
    else{
        res.redirect('/');
    }
})

router.get('/moderation', (req, res) => {
    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'recruiters',
        submain: 'moderation'
    };
    const data = {
        user: login,
        typeUser: userType,
        page: page,
        fio: [],
        location: [],
        telephone: [],
        directions: [],
        id: []
    }
    if (login){

        models.Recruiter.find({status: 'Модерация'}, (errs, recruiter) => {
            if (errs) res.render('./recruiters/moderation', {data});

            for (var i=0; i < recruiter.length; i++){
                
                data.fio.push(recruiter[i].fio);
                data.location.push(recruiter[i].location);
                data.telephone.push(recruiter[i].telephone);
                data.directions.push(recruiter[i].directions);
                data.id.push(recruiter[i]._id);
                
            }

            res.render('./recruiters/moderation', {data});
        });

    }
    else{
        res.redirect('/');
    }
});

router.get('/new', (req, res) => {

    const login = req.session.userLogin;
    if (login){
        res.render('./recruiters/new_recruiter');
    }
    else{
        res.redirect('/');
    }

});



router.post('/findrecruiter', (req, res) => {
    
    const id = req.body.id;
    
    models.Recruiter.findById(id, (err, recruiter) => {
        if (err) res.json({ ok: false, error: 'Попробуйте позжу' });

        res.json({ ok: true, data: recruiter });
    })

})

module.exports = router;