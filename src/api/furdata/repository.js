const FurData = require("./model");
const Test = require('../test/model');

exports.createFurdata = async (testId, jsonData) => {
    for (const data of jsonData) {
        const formattedData = {
            testId: parseInt(testId),
            name: data['보호자 성함'],
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
            Ti: data['탈륨(Tl)'],
            U: data['우라늄(U)'],
            Cs: data['세슘(Cs)']
        };

        try {
            const savedRecord = await FurData.create(formattedData);
            console.log('Saved Record:', savedRecord);
        } catch (error) {
            console.error('Error saving FurData:', error);
        }
    }
};


