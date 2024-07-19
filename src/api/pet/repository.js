const Pet = require("./model");

exports.createPet = async (petData) => {
  return await Pet.create(petData);
};

exports.updatePet = async (petId, updateData) => {
  return await Pet.findByIdAndUpdate(petId, updateData, { new: true });
};

exports.deletePet = async (petId) => {
  return await Pet.findByIdAndDelete(petId);
};

exports.getPet = async (petId) => {
  return await Pet.findById(petId);
};
