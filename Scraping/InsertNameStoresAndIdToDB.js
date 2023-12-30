"use strict";
const puppeteer = require('puppeteer');
const mysql = require('mysql2');
const myModuleDB = require('./src/MyModuleForDB.js');
const sleep = require('sleep-promise');
const SLEEP_TWO_MIN = 2000;
/**
 * The script extracts the information from the
 * chosen site and inserts the information to DB
 */

/**
 * @param url
 * @param insertData
 * @returns {Promise<void>}
 */
async function InsertNameStoresAndIdToDB(url) {

    try {
        const connection = await myModuleDB.createConnection(mysql)
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(
            url,
            {waitUntil: 'networkidle2'});

        const data = await page.evaluate(() => {
            let trs = Array.from(document.querySelectorAll('tr'));
            trs = trs.filter(tr => tr.children[2].textContent.includes('ח') &&
                tr.children[1].textContent !== "");

            let chainId = (function (){

                let start;
                let startedRead = false,
                    str = trs[1].children[0].textContent

                for(let i = 0; i < str.length; i++)
                    if(/^\d+$/.test(str[i]) && !startedRead) {
                        startedRead = true;
                        start = i;
                    }
                    else if(str[i] === '-')
                        return str.slice(start,i);
            })();
            return trs.map(tr => tr.children[1].textContent.trim() + "#" + chainId);
        })
        await browser.close();
        for(let str of data) {
            let num = str.substring(0, str.indexOf(' '));
            let branch = str.slice(num.length,str.indexOf('#'));
            let chainId = str.slice(branch.length+num.length+1);
            await myModuleDB.insertDataToStoresDB(connection,num,branch,chainId);
        }
        await connection.end();
    }
    catch (error) {
        console.log('An error occured: ' + error);
    }
}
async function main(){
    await InsertNameStoresAndIdToDB("http://zolvebegadol.binaprojects.com/Main.aspx");
    // await sleep(SLEEP_TWO_MIN)
    // InsertNameStoresAndIdToDB("http://maayan2000.binaprojects.com/Main.aspx");
    // await sleep(SLEEP_TWO_MIN)
    // await InsertNameStoresAndIdToDB("https://goodpharm.binaprojects.com/Main.aspx");
}
main()
