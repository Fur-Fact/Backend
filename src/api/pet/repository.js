const Pet = require("./model");
const Test = require("../test/model");

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

exports.getPetsByUserNameAndPetName = async (userName, petName) => {
  try {
    const pets = await Test.findAll({
      where: {
        guardian_name: userName,
        pet_name: petName,
      },
    });
    return pets;
  } catch (err) {
    console.error('Error fetching pets by user name and pet name:', err);
    throw err;
  }
};