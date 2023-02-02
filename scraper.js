//Code modified from https://github.com/facundoolano/app-store-scraper
//These are the dependencies, you need 'converter' to convert the output into a csv
//fs syncs the csv to file
//gplay is our main function to scrape Apple App Store (iOs devices)! Yay!

const converter = require('json-2-csv');
const fs = require('fs')
var store = require('app-store-scraper');

let listOfSearchTerms = [
    'cancer'
];

for(var i = 0; i < listOfSearchTerms.length; i++){
    console.log(`Searching for ${listOfSearchTerms[i]}`)
    getAppDetails(listOfSearchTerms[i])
}

async function getAppDetails(searchTerm) {
    try {
        let res = await store.search({
            throttle: 5,
            term: searchTerm,
            num: 200,
            country: 'au',
            page: 1,
            fullDetail: true
        });
        if (res.length > 0) {
            converter.json2csv(res, (err, csv) => {
                if (err) {
                    throw err;
                }
                fs.writeFileSync(`results.csv`, csv);
            });
        } else {
            console.log(`No results found for search term `);
        }
    } catch (error) {
        console.error(`An error occurred while processing search term : ${searchTerm}`);
    }
}