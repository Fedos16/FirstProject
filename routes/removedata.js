const express = require('express');
const router = express.Router();

const models = require('../models');

router.post('/recruiters', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    if (!id){
        res.json( { ok: false, error: 'Очень странно! Обратитесь к разработчику' } );
    }
    else{
        models.Recruiter.findById(id, (err, recruiter) => {
            if (err) res.json( { ok: false, error: 'Попробуйте позже'} );

            recruiter.status = status;

            recruiter.save((errs) => {
                if (errs) res.json({ ok: false, error: 'Попробуйте позже' });
                
                res.json({ ok: true });
              });
        })
    }
});

router.post('/user', (req, res) => {
    const id = req.body.id;

    models.User.findByIdAndRemove(id, (err) => {
        if (err) res.json({ok: false, error: 'Попробуйте позже!'});
        res.json({ok: true});
    });
});

module.exports = router;