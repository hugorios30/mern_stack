const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
    app.post('/api/account/signup', (req, res, next) => {
        const {body} = req;
        const {password} = body;
        let {email} = body;
        let {fullName} = body;
        let {telephone} = body;

        if(!email){
            return res.send({
                success: false,
                message: 'ERROR: Email cannot be blank'
            });
        }

        if(!password){
            return res.send({
                success: false,
                message: 'ERROR: Password cannot be blank'
            });
        }

        email = email.toLowerCase();
        email = email.trim();

        User.find({email: email}, (err, previousUsers) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'ERROR: Server Error'
                });
            } else if(previousUsers.length > 0){
                return res.send({
                    success: false, 
                    message: 'ERROR:  Account already exists'
                });
            }

            const newUser = new User();

            newUser.fullName = fullName;
            newUser.telephone = telephone;
            newUser.email = email;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                console.log(err);
                if(err){
                    return res.send({
                        success: false,
                        message: 'ERROR: Server Error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'SUCCESS: Signed up'
                });
            });
        });
    });

    app.post('/api/account/signin', (req, res, next) => {
        const {body} = req;
        const {password} = body;
        let email = body;
    });


};