const Jimp = require('jimp');
const path = require('path');

process.on('message', async (m) => {
    console.log('CHILD received file path:', m.filePath);

    Jimp.read(m.filePath, (err, image) => {
        if (err) {
            throw err;
        } else {
            let servePath = m.filePath.replace('uploads', 'serve');
            servePath = servePath.replace(path.extname(servePath), '.jpg');
            image.write(servePath);
            process.send(`converted -> ${servePath}`);
            process.exit(0);
        }
    });
});
