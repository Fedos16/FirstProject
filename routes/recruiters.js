const express = require('express');
const router = express.Router();

const models = require('../models');

router.get('/edit', (req, res) => {

      
    const login = req.session.userLogin;
    if (login){

        models.Recruiter.find((err, recruiter) => {

            const data = {
                user: login,
                fio: [],
                location: [],
                telephone: [],
                directions: [],
                id: []
            }

            if (err) res.render('./recruiters/edit', {data});
            
            for (var i=0; i < recruiter.length; i++){
                if (recruiter[i].status){
                    data.fio.push(recruiter[i].fio);
                    data.location.push(recruiter[i].location);
                    data.telephone.push(recruiter[i].telephone);
                    data.directions.push(recruiter[i].directions);
                    data.id.push(recruiter[i]._id);
                }
            }

            res.render('./recruiters/edit', {data});
        
        });
    }
    else{
        res.redirect('/');
    }
})

router.get('/create', (req, res) => {
    const login = req.session.userLogin;
    const data = {
        user: login
    }
    if (login){
        res.render('./recruiters/create', {data});
    }
    else{
        res.redirect('/');
    }
})

router.post('/findrecruiter', (req, res) => {
    
    const id = req.body.id;
    
    models.Recruiter.findById(id, (err, recruiter) => {
        if (err) res.json({ ok: false, error: 'Попробуйте позжу' });

        res.json({ ok: true, data: recruiter });
    })

})

module.exports = router;