
//take income request and modify
//call next when complete
module.exports = (req, res, next) => {

    //check and make sure user is logged in
    //if no user signed in - passport didnt find user in cookie
    //stop the request and send back message
    if (!req.user) {
        return res.status(401).send({error: 'You must log in!'});
    }

    //if user exists continue
    next();

};
