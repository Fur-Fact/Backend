const Pet = require("./model");
const Test = require("../test/model");
const Furdata = require("../furdata/model");

exports.createPet = async (petData) => {
  return await Pet.create(petData);
};

exports.updatePet = async (petId, updateData) => {
  return await Pet.update(updateData, {
    where: { id: petId },
  });
};

exports.deletePet = async (petId) => {
  return await Pet.destroy({
    where: { id: petId },
  });
};

exports.getPet = async (petId) => {
  return await Pet.findByPk(petId);
};



exports.getPetsByUserId = async (userId) => {
  try {
    const pets = await Pet.findAll({
      where: {
        userId: userId,
      },
    });
    return pets;
  } catch (err) {
    console.error('Error during fetching pets by user id:', err);
    throw err;
  }
};