const request = require('request');
const cheerio = require('cheerio');
const url = 'https://ppdb.smktelkom-lpg.sch.id/assets/img/berkas/berkas-kk/'

request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);
        const links = $('a[href^="/assets/img/berkas/berkas-kk/"]');
        const result = [];
        links.each(function () {
            result.push($(this).text());
        });
        const json = result.map((item, index) => {
            return {
                id: index + 1,
                name: item
            };
        });
        const fs = require('fs');
        fs.writeFile('kk.json', JSON.stringify(json, null, 4), (err) => {
            if (err) {
                console.error(err);
                return;
            };
            console.log('File has been created');
        });
    }
});