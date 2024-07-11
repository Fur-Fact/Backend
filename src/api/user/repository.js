const User = require('./model');
const crypto = require('crypto')

exports.findUserById = async (id) => {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        throw error;
    }
};

exports.findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

exports.createUser = async (userData) => {
    return await User.create(userData);
};

exports.findUserByEmailAndPassword = async (email, password) => {
    const hashedPassword = crypto.pbkdf2Sync(
        password,
        process.env.SALT_KEY,
        50,
        100,
        'sha512'
    ).toString('base64');

    const user = await User.findOne({ where: { email, password: hashedPassword } });
    return user;
};

