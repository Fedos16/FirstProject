const auth = require('./api/auth');
const savedata = require('./api/savedata');
const updatedata = require('./api/updatedata');
const removedata = require('./api/removedata');
const finddata = require('./api/finddata');

const recruiters = require('./admin_panel/recruiters');
const worksheets = require('./admin_panel/worksheets');
const users = require('./admin_panel/users');
const statistics = require('./admin_panel/statistics');
const rewiews = require('./admin_panel/rewiews');
const additionaly = require('./admin_panel/additionaly');

const inputdata = require('./inputdata');
const main_page = require('./landing/main_page');

module.exports = {
    auth,
    savedata,
    recruiters,
    updatedata,
    removedata,
    worksheets,
    inputdata,
    finddata,
    users,
    statistics,
    main_page,
    rewiews,
    additionaly
};