const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/moderation', (req, res) => {

    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'rewiews',
        submain: 'moderation'
    }
    if (login){

        models.Rewiews.find((err, rew) => {

            const data = {
                user: login,
                typeUser: userType,
                page: page,
                fio: [],
                company: [],
                position: [],
                rewiew: [],
                id: []
            }

            if (err) res.render('./rewiews/moderation', {data});
            
            for (var i=0; i < rew.length; i++){
                if (rew[i].status == "Модерация"){
                    data.fio.push(rew[i].fio);
                    data.company.push(rew[i].company);
                    data.position.push(rew[i].position);
                    data.rewiew.push(rew[i].rewiew);
                    data.id.push(rew[i]._id);
                }
            }

            res.render('./rewiews/moderation', {data});
        
        });
    }
    else{
        res.redirect('/administration/');
    }
});
router.get('/edit', (req, res) => {

    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'rewiews',
        submain: 'edit'
    }
    if (login){

        models.Rewiews.find((err, rew) => {

            const data = {
                user: login,
                typeUser: userType,
                page: page,
                fio: [],
                company: [],
                position: [],
                rewiew: [],
                id: [],
                status: []
            }

            if (err) res.render('./rewiews/edit', {data});
            
            for (var i=0; i < rew.length; i++){
                if (rew[i].status == "Активен" || rew[i].status == "Не Активен"){
                    data.fio.push(rew[i].fio);
                    data.company.push(rew[i].company);
                    data.position.push(rew[i].position);
                    data.rewiew.push(rew[i].rewiew);
                    data.id.push(rew[i]._id);
                    data.status.push(rew[i].status);
                }
            }

            res.render('./rewiews/edit', {data});
        
        });
    }
    else{
        res.redirect('/administration/');
    }
});
router.post('/findrewiew', (req, res) => {
    const id = req.body.id;
    
    models.Rewiews.findById(id, (err, rew) => {
        if (err) res.json({ ok: false, error: 'Попробуйте позже' });

        res.json({ ok: true, data: rew });
    })
});

module.exports = router;