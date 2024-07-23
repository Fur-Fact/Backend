const FurData = require("./model");
const testRepository = require('../test/repository');
const sequelize = require('../../data/sequelize'); 

exports.createFurdata = async (jsonData) => {

    const transaction = await sequelize.transaction();  // 트랜잭션 시작

    try {
        for (const data of jsonData) {
            // Test 모델 데이터를 준비한다.
            const testData = {
                hospital: data['병원명'],
                receivedAt: new Date(data['접수일']),
                resultDate: new Date(data['결과등록일']),
                guardianName: data['보호자 성함'],
                contactNumber: data['연락처'],
                petName: data['동물명'],
                species: data['종'],
                breed: data['품종'],
                age: data['나이'],
                gender: data['성별'],
                weight: data['몸무게'],
                hereditaryDisease: data['유선종양'],
                feedingMethod: data['급여주식'],
                supplements: data['급여영양제'],
                medication: data['복용중인 약'],
            };

            const test = await testRepository.createTest(testData, { transaction });

            // FurData 모델 데이터를 준비한다.
            const formattedData = {
                testId: test.id,
                Ca: data['칼슘(Ca)'],
                Mg: data['마그네슘(Mg)'],
                Na: data['나트륨(Na)'],
                K: data['칼륨(K)'],
                P: data['인(P)'],
                Zn: data['아연(Zn)'],
                Cu: data['구리(Cu)'],
                Se: data['셀레늄(Se)'],
                Fe: data['철(Fe)'],
                Cr: data['크롬(Cr)'],
                V: data['바나듐(V)'],
                Mn: data['망간(Mn)'],
                Mo: data['몰리브덴(Mo)'],
                Co: data['코발트(Co)'],
                S: data['황(S)'],
                B: data['붕소(B)'],
                Li: data['리튬(Li)'],
                Sr: data['스트론튬(Sr)'],
                Hg: data['수은(Hg)'],
                Pb: data['납(Pb)'],
                Al: data['알루미늄(Al)'],
                Cd: data['카드뮴(Cd)'],
                As: data['비소(As)'],
                Ba: data['바륨(Ba)'],
                Sb: data['안티몬(Sb)'],
                Bi: data['비스무스(Bi)'],
                Tl: data['탈륨(Tl)'],
                U: data['우라늄(U)'],
                Cs: data['세슘(Cs)'],
            };

            // FurData 모델 데이터를 생성한다.
            await FurData.create(formattedData, { transaction });
        }

        await transaction.commit();  // 모든 데이터가 성공적으로 저장되면 트랜잭션 커밋
        console.log('All records saved successfully');
    } catch (error) {
        await transaction.rollback();  // 에러 발생 시 트랜잭션 롤백
        console.error('Error saving records:', error);
    }
};


