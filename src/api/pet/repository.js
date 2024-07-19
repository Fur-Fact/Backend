const Pet = require("./model");

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
