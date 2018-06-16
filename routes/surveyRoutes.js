//require login middleware
const requireLogin = require('../middlewares/requireLogin');


module.exports = app => {

    //post - create survey route
    //make sure user is logged in - middleware
    app.post('/api/surveys', requireLogin, (req, res) => {

    });

}