const sequelize = require('./sequelize');
const User = require('../api/user/model');
const Pet = require('../api/pet/model');
const Test = require('../api/test/model');
const FurData = require('../api/furdata/model');

// User와 Pet 간의 관계 설정
User.hasMany(Pet, { foreignKey: 'user_id' });
Pet.belongsTo(User, { foreignKey: 'user_id' });

// Test와 FurData 간의 관계 설정
Test.hasMany(FurData, {
  foreignKey: 'testId',
  as: 'FurData',
  onDelete: 'CASCADE', // 추가된 부분
});

// FurData 모델 정의 파일에서
FurData.belongsTo(Test, {
  foreignKey: 'testId',
  as: 'test',
});

async function initializeDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database & tables created!');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    throw err; // 에러 발생 시 예외를 던져 서버 시작을 중단하도록 함
  }
}

module.exports = initializeDatabase;
