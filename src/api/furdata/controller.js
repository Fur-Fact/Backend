const xlsx = require('xlsx'); // 엑셀 파일 처리에 필요한 모듈
const fs = require('fs'); // 파일 시스템 모듈 추가
const furdataRepository = require('../furdata/repository');
const testRepository = require('../test/repository');

function readExcelAndConvertToJson(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    return jsonData;
}

exports.createFurdata = async(req, res) => {
    
    // const {testId} = req.body;
    
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    // if (!testId) {
    //     return res.status(400).send('testId is required.');
    // }

    const filePath = req.file.path;

    try {
        // const test = await testRepository.findTestById(testId);

        // if (!test) {
        //     return res.status(404).send({ result: 'fail', message: 'Test not found.' });
        // }
        // 엑셀 파일을 JSON으로 변환
        const jsonData = readExcelAndConvertToJson(filePath);
        
        // 파일 삭제 (변환 후 파일 삭제)
        fs.unlinkSync(filePath);

        furdataRepository.createFurdata(jsonData);

        res.status(200).send({ result: 'success', message: 'FurData successfully saved.' });
    } catch (error) {
        console.error('Error processing file:', error);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);  // 파일이 존재하면 삭제
        }
        res.status(500).send('Error processing file.');
    }
}