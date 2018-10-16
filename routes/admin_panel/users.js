const express = require('express');
const router = express.Router();

const models = require('../../models');

router.get('/create', (req, res) => {
  
    const login = req.session.userLogin;
    const userType = req.session.userType;
    const page = {
        main: 'users',
        submain: 'create'
    };
    const data = {
      user: login,
      typeUser: userType,
      page: page
    };
    if (login){
      if (userType == "Developer" || userType == 'SuperAdmin'){
        res.render('./users/create', {data});
      }
      else{
        res.redirect('/users/settings');
      }
    }
    else{
      res.redirect('/administration/');
    }
  
});

router.get('/settings', (req, res) => {

  const login = req.session.userLogin;
  const userType = req.session.userType;
  const page = {
    main: 'users',
    submain: 'settings'
  };
  const data = {
    user: login,
    typeUser: userType,
    page: page
  };

  if (login){
    res.render('./users/settings', {data});
  }
  else{
    res.redirect('/administration/');
  }

});

router.get('/edit', (req, res) => {
  
  const login = req.session.userLogin;
  const userType = req.session.userType;
  const page = {
      main: 'users',
      submain: 'edit'
  };
  const data = {
    user: login,
    typeUser: userType,
    page: page,
    login: [],
    status: [],
    email: [],
    id: []
  };
  if (login){
    if (userType == "Developer" || userType == 'SuperAdmin'){

      models.User.find({ typeUser: 'user' }, (erro, user) => {

        if (erro) res.render('./users/edit', {data});

        for (var i=0; i < user.length; i++){
          data.login.push(user[i].login);
          data.status.push(user[i].status);
          data.email.push(user[i].email);
          data.id.push(user[i]._id);
        }

        res.render('./users/edit', {data});

      });
    }
    else{
      res.redirect('/users/settings');
    }
  }
  else{
    res.redirect('/administration/');
  }

});

module.exports = router;