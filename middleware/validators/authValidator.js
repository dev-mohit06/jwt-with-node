const { body } = require('express-validator');
const User = require('../../models/user');

const registrationValidation = [
    body("fullname")
        .notEmpty().withMessage("fullname must be non-empty.")
        .matches(/^[a-zA-Z\s]+$/).withMessage("only alphabetical characters and spaces are allowed"),

    body("username")
        .custom(async value => {
            let user;

            try {
                user = await User.findOne({
                    where: {
                        username: value,
                    },
                });

            } catch (err) {
                console.log(`Somting went wrong because of : ${err}`);
            }

            if (user) {
                throw new Error("username already in use");
            }

        })
        .notEmpty().withMessage("username must be non-empty.")
        .isLength({ min: 5, max: 20 }).withMessage("username withing a length between 5 and 20 characters."),

    body("password")
        .notEmpty().withMessage("password must be non-empty.")
        .isStrongPassword().withMessage("password is week.")
]

const loginValidation = [
    body("username")
    .notEmpty().withMessage("username must be non empty.")
    .custom(async value => {
        let user;
        try{
            user = await User.findOne({
                where : {
                    username : value,
                },
            });            
        }catch(error){
            console.log(`Somting went wrong because of : ${err}`);
        }

        if(!user){
            throw new Error("User not found.");
        }
    }),
    body("password")
    .notEmpty().withMessage("password must be non empty."),
]

module.exports = {
    registrationValidation,
    loginValidation
}