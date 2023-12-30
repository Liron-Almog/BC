const fs = require("fs");

class MyModuleForFiles {

    async readDir(address){
        return new Promise((resolve, reject) => {
            fs.readdir(address,
                { encoding: 'utf8' }, (err, files) => {
                    if (err) reject(err);
                    else resolve(files);
                });
        });
    }
}
module.exports = new MyModuleForFiles();