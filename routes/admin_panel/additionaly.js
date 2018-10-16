const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/', (req, res) => {
    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'additionaly',
        submain: 'none'
    }
    if (login){
        const data = {
            user: login,
            typeUser: userType,
            page: page,
            directions: {
                id: [],
                name: []
            },
            locations: {
                id: [],
                name: [],
                flag_path: []
            },
            messengers: {
                id: [],
                name: []
            }
        }

        models.Directions.find((errs, dir) => {
            if (errs) res.render('./additionaly/index', {data});

            for (var i=0; i < dir.length; i++){
                data.directions.name.push(dir[i].name);
                data.directions.id.push(dir[i]._id);
                
            }

            models.Locations.find((errs, loc) => {
                if (errs) res.render('./additionaly/index', {data});

                for (var i=0; i < loc.length; i++){
                    data.locations.name.push(loc[i].name);
                    data.locations.id.push(loc[i]._id);
                    data.locations.flag_path.push(loc[i].flag_path);
                    
                }

                models.Messengers.find((errs, mes) => {
                    if (errs) res.render('./additionaly/index', {data});
    
                    for (var i=0; i < mes.length; i++){
                        data.messengers.name.push(mes[i].name);
                        data.messengers.id.push(mes[i]._id);
                        
                    }
    
                    res.render('./additionaly/index', {data});
                });
            });
        });
    }else{
        res.redirect('/administration/');
    }

});

module.exports = router;