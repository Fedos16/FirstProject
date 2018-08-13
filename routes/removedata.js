const express = require('express');
const router = express.Router();

const models = require('../models');

router.post('/recruiters', (req, res) => {
    const id = req.body.id;

    if (!id){
        res.json( { ok: false, error: 'Очень странно! Обратитесь к разработчику' } );
    }
    else{
        models.Recruiter.findById(id, (err, recruiter) => {
            if (err) res.json( { ok: false, error: 'Попробуйте позже'} );

            recruiter.status = false;

            recruiter.save((errs) => {
                if (errs) res.json({ ok: false, error: 'Попробуйте позже' });
                
                res.json({ ok: true });
              });
        })
    }
});

module.exports = router;