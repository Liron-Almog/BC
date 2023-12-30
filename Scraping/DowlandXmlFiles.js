"use strict";
const puppeteer = require('puppeteer');
const sleep = require('sleep-promise');
const SLEEP_THREE_SECS = 3000;
const DOWNLOAD_TYPE = {
    ALL: 'י',
    PRICES: 'ח',
    SALES: 'ע'
};
/**
 * The script downloads files from the supermarkets site's according to the request :
 *  PRICES = files with regular prices only
 *  SALES = files with sales prices only
 *  ALL = all the files.
 *
 * @param url = the site that you want to download the files
 * @returns {Promise<void>}
 */
async function downloadFilesByScarping(url,downloadType) {

    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        const data = await page.evaluate((downloadType) => {//gets all the buttons id

            const trs = Array.from(document.querySelectorAll('tr'));
            const newTrs = trs.filter(tr => tr.children[2].textContent.includes(downloadType) && tr.children[1].textContent !== "");
            const data = newTrs.map(tr => tr.children[5].children[0].id);

            return data;
        },downloadType);
        let counter = 0;
        await sleep(SLEEP_THREE_SECS + 2000)
        for(let btn of data) {//downlands all the files
            if(counter <= 468) {
                await sleep(SLEEP_THREE_SECS)
                await page.click(`#${btn}`)
            }
            console.log(counter)
            counter++;
        }
        await browser.close()
    }
    catch (error){
        console.log('An error occured: ' + error);
    }
}

//downloadFilesByScarping("http://zolvebegadol.binaprojects.com/Main.aspx",DOWNLOAD_TYPE.PRICES);
//downloadFilesByScarping("http://maayan2000.binaprojects.com/Main.aspx",DOWNLOAD_TYPE.PRICES);
//downloadFilesByScarping("https://goodpharm.binaprojects.com/Main.aspx",DOWNLOAD_TYPE.PRICES);
//downloadFilesByScarping("http://shefabirkathashem.binaprojects.com/Main.aspx",DOWNLOAD_TYPE.PRICES);
//needs to download
downloadFilesByScarping("http://shuk-hayir.binaprojects.com/Main.aspx",DOWNLOAD_TYPE.PRICES);
//downloadFilesByScarping("https://www.kingstore.co.il/Food_Law/Main.aspx",DOWNLOAD_TYPE.PRICES);
