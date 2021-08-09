const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS, SECRET} = require('../config/config');

const ENGLISH_ALPHANUMERIC_PATTERN = /^[a-zA-Z0-9]+$/;

const UserSchema = new mongoose.Schema({
    username: 
    { 
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value)
            },
            message: (props) => {
                console.log(props);
                return `${props.value} is invalid username. Username should consist only english letters and digits!`;
            }
        }
    },
    password: 
    {
        required: true,
        type: String,
        minlength: 8,
        validate: {
            validator: (value) => {
                return ENGLISH_ALPHANUMERIC_PATTERN.test(value)
            },
            message: (props) => {
                console.log(props);
                return `Password should consist only english letters and digits!`;
            }
        }
    }
});

UserSchema.pre('save', function (next) {
    bcrypt.genSalt(SALT_ROUNDS)
    .then(salt => {
        return bcrypt.hash(this.password, salt);
    }).then(hash => {
        console.log(hash);
        this.password = hash;
        next();
    })
    .catch(err => {
        //TODO: 
        console.log(err);
    })
})

module.exports = mongoose.model('User',UserSchema);