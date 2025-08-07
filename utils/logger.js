const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, "..", "logs");
if(!fs.existsSync(logDirectory)){
    fs.mkdirSync(logDirectory);
}

const logFilePath = path.join(logDirectory,'error.log');

const logError = (error) => {
    const timestamp = new Date().toISOString();
    const errorMessage = typeof error === 'string'? error : (error.stack || error.errorMessage);
    const logLine = `[${timestamp}] ${errorMessage}\n`;

    fs.appendFile(logFilePath,logLine,(err) => {
        if(err){
            console.error('Failed to write to log File:',err);
        }
    });
};

module.exports = {logError};