const Pet = require('./model');

exports.createPet = async (petData) => {
    return await Pet.create(petData);
};