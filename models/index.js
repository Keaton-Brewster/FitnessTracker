const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {}

// Read all the files from the current directory
fs.readdirSync(__dirname)
    // Extract the name of the file
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    // Add a new key to the db object using that file name, 
    // And give it the value of the function that is exported from the file
    .forEach(file => {
        const fileName = file.substring(0, file.length - 3);
        db[fileName] = require(path.join(__dirname, file));
    });

// Export the db object that you created with the above function
module.exports = db;