//KEYS.JS - figure out which set of credentials to use

//if prod or not
if (process.env.NODE_ENV === 'production') {

    //we are in production
    //retrun the prod set of keys
    //export and require in the dev keys
    module.exports = require('./prod');

} else {

    //we are in development
    //retrun the dev set of keys
    //export and require in the dev keys
    module.exports = require('./dev');
}