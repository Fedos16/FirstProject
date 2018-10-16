const express = require('express');
const router = express.Router();

const models = require('../../models');

router.post('/additionaldoc', (req, res) => {
    const typeDocument = req.body.typeDocument;

    var data = {};
    if (typeDocument == 'Directions'){
        models.Directions.find((err, dir) => {
            if (err) res.json({ok: false, text: 'Попробуйте позже'});

            data.directions = dir;
            res.json({ok: true, data});
        });
    } else {
        res.json({ok: false, text: 'Ничего не найдено!'});
    }
});

module.exports = router;