const petRepository = require("./repository");
const { uploadImage } = require("../../middleware/s3Upload");

// 펫 생성
exports.registerPet = [
  uploadImage.single("image"),
  async (req, res) => {
    const user = req.user;
    const { name, age, gender, species, weight, feed } = req.body;

    // 입력 데이터 검증
    if (!user || !name || !age || !gender || !species || !weight) {
      return res.status(400).send({
        result: "fail",
        message: "필수 필드를 모두 입력해야 합니다.",
      });
    }

    try {
      const image = req.file ? req.file.location : null;
      const newPet = await petRepository.createPet({
        userId: user.id,
        name,
        age,
        image,
        gender,
        species,
        weight,
        feed,
      });

      res
        .status(200)
        .send({ result: "success", message: "펫 등록에 성공했습니다." });
    } catch (err) {
      console.error("Error during pet registration:", err);
      res
        .status(500)
        .send({ result: "fail", message: "펫 등록에 실패했습니다." });
    }
  },
];

// 펫 조회
exports.getPet = async (req, res) => {
  const { petId } = req.params;

  try {
    const pet = await petRepository.getPet(petId);
    if (pet) {
      res.status(200).send({ result: "success", pet });
    } else {
      res
        .status(404)
        .send({ result: "fail", message: "펫을 찾을 수 없습니다." });
    }
  } catch (err) {
    console.error("Error during pet retrieval:", err);
    res
      .status(500)
      .send({ result: "fail", message: "펫 정보 조회에 실패했습니다." });
  }
};

// 펫 수정
exports.updatePet = async (req, res) => {
  const { petId } = req.params;
  const updateData = req.body; // 받은 데이터 전체를 업데이트 데이터로 사용

  try {
    const pet = await petRepository.getPet(petId);
    if (!pet) {
      return res
        .status(404)
        .send({ result: "fail", message: "펫을 찾을 수 없습니다." });
    }

    await pet.update(updateData);
    res
      .status(200)
      .send({
        result: "success",
        message: "펫 정보가 업데이트 되었습니다.",
        pet,
      });
  } catch (err) {
    console.error("Error during pet update:", err);
    res
      .status(500)
      .send({ result: "fail", message: "펫 정보 업데이트에 실패했습니다." });
  }
};

// 펫 삭제
exports.deletePet = async (req, res) => {
  const { petId } = req.params;

  try {
    const deleted = await petRepository.deletePet(petId);
    if (deleted) {
      res
        .status(200)
        .send({ result: "success", message: "펫 정보가 삭제되었습니다." });
    } else {
      res
        .status(404)
        .send({ result: "fail", message: "삭제할 펫을 찾을 수 없습니다." });
    }
  } catch (err) {
    console.error("Error during pet deletion:", err);
    res
      .status(500)
      .send({ result: "fail", message: "펫 정보 삭제에 실패했습니다." });
  }
};
