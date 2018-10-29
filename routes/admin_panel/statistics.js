const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/', (req, res) => {

    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'statistics',
        submain: 'none'
    };
    const data = {
        user: login,
        typeUser: userType,
        page: page,
        year: []
    };
    if (login){

        models.Worksheets.find({status: 'Открыта'}, (errs, work) => {
            if (errs) res.render('./statistics/index', {data});

            for (var i=0; i < work.length; i++){
                if (data.year.indexOf(work[i].createdAt.getFullYear()) == -1) {
                    data.year.push(work[i].createdAt.getFullYear());
                }
            }

            res.render('./statistics/index', {data});
        });
    }
    else{
        res.redirect('/administration/');
    }
  
});
router.post('/searchmonth', (req, res) => {
    const year = req.body.year;

    var data = {
        month: []
    };

    var first = new Date(year-1, 12);
    var last = new Date(year, 12);

    var nameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    models.Worksheets.find({ $and: [{createdAt: {$gte : first, $lte: last}, status: 'Открыта'}] }, (errs, work) => {
        if (errs) res.json({ok: false, error: 'Попробуйте позже'});

        for (var x=0; x < work.length; x++){
            if (data.month.indexOf(work[x].createdAt.getMonth()) == -1){
                data.month.push(work[x].createdAt.getMonth());
            }
        }

        data.month.sort();

        for (var i=0; i<data.month.length; i++){
            data.month[i] = nameMonth[data.month[i]];
        }

        res.json({ok: true, data: data});
    });
});
router.post('/searchdata', (req, res) => {
    const year = req.body.year;
    const month = req.body.month;

    var nameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    var numMonth = nameMonth.indexOf(month);

    var first = new Date(year, numMonth);
    var last = new Date(year, numMonth+1);

    var count = new Date(year, numMonth+1, 0);


    var data = {
        1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [], 10: [], 11: [], 12: [], 13: [], 14: [], 15: [], 16: [], 17: [],
        18: [], 19: [], 20: [], 21: [], 22: [], 23: [], 24: [], 25: [], 26: [], 27: [], 28: [], 29: [], 30: [], 31: [], count: count.getDate()
    };
    
    models.Worksheets.find({ $and: [{createdAt: {$gte : first, $lte: last}, status: 'Открыта'}] }, (errs, work) => {
        if (errs) res.json({ok: false, data: data});
        
        for (var i=0; i < work.length; i++) {
            data[work[i].createdAt.getDate()].push(1);
        }

        res.json({ok: true, data: data});
    });
});
router.post('/searcdatatwo', (req, res) => {
    const year = req.body.year;
    const month = req.body.month;

    var nameMonth = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    var numMonth = nameMonth.indexOf(month);

    var first = new Date(year, numMonth);
    var last = new Date(year, numMonth+1);

    var data = {
        id: [],
        fio: [],
        skype: [],
        email: [],
        telephone: [],
        count: []
    }

    models.Recruiter.find({status: 'true'}, (errs, recr) => {
        if (errs) res.json({ok: false, error: 'Попробуйте позже'});

        for (var x=0; x<recr.length; x++){
            if(data.fio.indexOf(recr[x].fio) == -1){
                data.id.push(String(recr[x]._id));
                data.fio.push(recr[x].fio);
                data.skype.push(recr[x].skype);
                data.email.push(recr[x].email);
                data.telephone.push(recr[x].telephone);
                data.count.push([]);
            }
        }

        
        models.Worksheets.find({ $and: [{createdAt: {$gte : first, $lte: last}}, {status: 'Открыта'}, {recruiter_id: {$in : data.id } }] }, (errss, work) => {
            if (errss) res.json({ok: false, error: 'Попробуйте позже'});

            for (var i=0; i<work.length; i++){
                data.count[data.id.indexOf(work[i].recruiter_id)].push(1);
            }

            res.json({ok: true, data: data});
        });

    });

});

  module.exports = router;