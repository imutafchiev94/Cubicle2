const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const {SALT_ROUNDS, SECRET} = require('../config/config');


const register = async ({username, password}) => {
    

    let existingUser = await User.findOne({username: username}).lean();

    if(existingUser !== null) {
        throw ({message: 'User with this username already exists'})
    }
        let salt = await bcrypt.genSalt(SALT_ROUNDS);
        let hash = await bcrypt.hash(password,salt);


        
        const user = new User({username, password: hash});

        return await user.save();
    
}

const login = async ({username, password}) => {
    let user = await User.findOne({username: username}).lean();

    if(!user) throw ({message: 'Wrong credentials'});

    let isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) throw ({message: 'Wrong credentials'});

    console.log(isMatch);

    let token = jwt.sign({_id: user._id, username: user.username}, SECRET)

    return token;
}

module.exports = {
    register,
    login
}