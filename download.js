const https = require('https');
const fs = require('fs');
const ProgressBar = require('progress');

const data = require('./data/data.json');

data.forEach((item) => {
    // if (item.id > 10) return;
    const file = fs.createWriteStream(`data/gen/${item.name}`);
    const request = https.get(item.link, (response) => {
        const bar = new ProgressBar(`Downloading ${item.name} [:bar] :percent :etas`, {
            complete: '=',
            incomplete: ' ',
            width: 20,
            total: parseInt(response.headers['content-length'], 10)
        });
        response.pipe(file);
        response.on('data', (chunk) => {
            bar.tick(chunk.length);
        });
    });
});