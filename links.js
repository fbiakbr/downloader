const request = require('request');
const url = 'https://teddyinda.com/content/ktp/';
const cheerio = require('cheerio');

request(url, (error, response, html) => {
    const $ = cheerio.load(html);
    const links = $('a[href^="/content/ktp/"]');
    const result = [];
    links.each(function () {
        result.push($(this).text());
    });
    const json = result.map((item, index) => {
        return {
            id: index + 1,
            name: item,
            link: url + item
        };
    });
    const fs = require('fs');
    fs.writeFile('data/data.json', JSON.stringify(json, null, 4), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log('File has been created');
    });
});