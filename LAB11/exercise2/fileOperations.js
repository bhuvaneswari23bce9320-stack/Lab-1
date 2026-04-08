// Exercise 2: Node.js File System Operations
// Demonstrates creating, reading, appending, and deleting files using the fs module

// Step 1: Import the built-in file system module using require()
const fs = require('fs');

// Define the file name to work with
const fileName = 'sample.txt';

console.log('==================================================');
console.log('    Node.js File System Operations - Exercise 2   ');
console.log('==================================================\n');

// -------------------------------------------------------
// STEP 1: CREATE a new file using fs.writeFile()
// -------------------------------------------------------
// fs.writeFile(filename, data, callback) - creates or overwrites a file
fs.writeFile(fileName, 'Hello! This file was created by Node.js fs module.\n', (err) => {

    // Error-first callback: first argument is always the error object
    if (err) {
        console.error('ERROR - Creating file failed:', err.message);
        return; // Stop execution if there's an error
    }

    console.log(`[1] File Created: "${fileName}" successfully.`);

    // -------------------------------------------------------
    // STEP 2: READ the file using fs.readFile()
    // -------------------------------------------------------
    // fs.readFile(filename, encoding, callback)
    fs.readFile(fileName, 'utf8', (err, data) => {

        if (err) {
            console.error('ERROR - Reading file failed:', err.message);
            return;
        }

        console.log(`\n[2] File Read Successfully. Contents of "${fileName}":`);
        console.log('--------------------------------------------------');
        console.log(data);
        console.log('--------------------------------------------------');

        // -------------------------------------------------------
        // STEP 3: APPEND data to the file using fs.appendFile()
        // -------------------------------------------------------
        // fs.appendFile(filename, data, callback) - adds data without overwriting
        const appendData = 'This line was APPENDED using fs.appendFile().\nNode.js file handling is asynchronous!\n';

        fs.appendFile(fileName, appendData, (err) => {

            if (err) {
                console.error('ERROR - Appending to file failed:', err.message);
                return;
            }

            console.log(`[3] Data Appended to "${fileName}" successfully.`);

            // Read the file again to confirm appended content
            fs.readFile(fileName, 'utf8', (err, updatedData) => {

                if (err) {
                    console.error('ERROR - Reading updated file failed:', err.message);
                    return;
                }

                console.log(`\n[4] Updated Contents of "${fileName}" after Append:`);
                console.log('--------------------------------------------------');
                console.log(updatedData);
                console.log('--------------------------------------------------');

                // -------------------------------------------------------
                // STEP 4: DELETE the file using fs.unlink()
                // -------------------------------------------------------
                // fs.unlink(filename, callback) - deletes the file
                fs.unlink(fileName, (err) => {

                    if (err) {
                        console.error('ERROR - Deleting file failed:', err.message);
                        return;
                    }

                    console.log(`[5] File "${fileName}" deleted successfully.`);

                    // Confirm deletion by attempting to read the file
                    fs.readFile(fileName, 'utf8', (err, data) => {

                        if (err) {
                            // This error is expected since the file was deleted
                            console.log(`\n[6] Confirmed: "${fileName}" no longer exists.`);
                            console.log('    Error caught (expected):', err.code); // ENOENT = file not found
                        } else {
                            console.log('File still exists (unexpected):', data);
                        }

                        console.log('\n==================================================');
                        console.log('All file operations completed successfully!');
                        console.log('Execution Order: writeFile → readFile → appendFile → readFile → unlink');
                        console.log('==================================================');
                    });
                });
            });
        });
    });
});
