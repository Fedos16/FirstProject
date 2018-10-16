const express = require('express');
const router = express.Router();

const models = require('../../models');

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
                directions_short: [],
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

                var arr_directions = recruiter[i].directions.split(', ');
                if (arr_directions.length > 3){
                    arr_directions = arr_directions.slice(0, 3);
                    data.directions_short.push(arr_directions.join(', ') + ' ...');
                    arr_directions = [];
                } else {
                    data.directions_short.push(recruiter[i].directions);
                }

                
            }

            res.render('./recruiters/edit', {data});
        
        });
    }
    else{
        res.redirect('/administration/');
    }
});
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
        page: page
    }
    if (login){

        models.Recruiter.find({status: 'Модерация'}, {fio: 1, residence: 1, telephone: 1, directions: 1}, (errs, recruiter) => {
            if (errs) res.render('./recruiters/moderation', {data});

            data.recruiter = recruiter;

            res.render('./recruiters/moderation', {data});
        });

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
router.get('/r:id', (req, res) => {

    const id = req.params.id;

    models.Recruiter.findOne( {_id: id, status: 'Редактирование'}, (errs, recruiter) => {
        if (errs) {
            res.send('ERROR!');
        }else{
            var fio = recruiter.fio;
            console.log(fio);
            res.render('./recruiters/editing_user', {fio});
        }
    });
});
router.post('/findrecruiter', (req, res) => {
    
    const id = req.body.id;
    
    models.Recruiter.findById(id, (err, recruiter) => {
        if (err) res.json({ ok: false, error: 'Попробуйте позже' });

        res.json({ ok: true, data: recruiter });
    })

})

module.exports = router;