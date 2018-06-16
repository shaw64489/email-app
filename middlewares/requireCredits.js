
//take income request and modify
//call next when complete
module.exports = (req, res, next) => {

    //check and make sure user has credits
    //if user has less than one
    //stop the request and send back message
    if (req.user.credits < 1) {
        return res.status(403).send({error: 'Not enough credits!'});
    }

    //if user exists continue
    next();

};
