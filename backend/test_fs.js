const fs = require('fs');
console.log('Script started');
try {
    fs.writeFileSync('test_output.txt', 'This is a test');
    console.log('File written successfully');
} catch (err) {
    console.error('Error writing file:', err);
}
