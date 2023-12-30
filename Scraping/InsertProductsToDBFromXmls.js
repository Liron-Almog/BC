"use strict";
const xml2js = require("xml2js");
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2");
const AdmZip = require("adm-zip");
const sleep = require("sleep-promise");
const NUMBER_OF_FIELDS = 7;
function getProducts(result){

    let keyArray = Object.keys(result)
    keyArray = [...keyArray,...Object.keys(result[keyArray[0]])]
    let products = result[keyArray[0]][keyArray[keyArray.length-1]];

    return products
}

/**
 * The function creates a new object with all the data from obj
 * and sets a unique propertys names
 * @param obj
 * @returns {{}}
 */
function getNewObj(obj){

    let property = Object.keys(obj);
    let newObj = {};

    property.forEach(item =>{
        let itemInLowerCase = item.toLowerCase();

        if(itemInLowerCase === 'priceupdatedate')
            newObj.PriceUpdateDate = obj[item];
        else if (itemInLowerCase === 'itemprice')
            newObj.ItemPrice = obj[item];
        else if (itemInLowerCase === 'itemcode')
            newObj.ItemCode = obj[item];
        else if (itemInLowerCase === 'manufactureritemdescription')
            newObj.ManufacturerItemDescription = obj[item];
        else if (itemInLowerCase === 'allowdiscount')
            newObj.AllowDiscount = obj[item];
        else if (itemInLowerCase === 'unitofmeasure')
            newObj.UnitOfMeasure = obj[item];
        else if (itemInLowerCase === 'bisweighted')
            newObj.bIsWeighted = obj[item];
    })
    if(Object.keys(newObj).length !== NUMBER_OF_FIELDS)
        return null;

    return newObj;
}

/**
 * The function extracts the chain id and the store id
 * without to know the name of a root tag in XML file
 * @param result
 * @returns Array with chain id and store id
 */
function getChainIdAndStoreId(result){

    let keyArray = Object.keys(result)
    let ChainIdStoreId = [];
    keyArray = [...keyArray,...Object.keys(result[keyArray[0]])]

    keyArray.forEach(item =>{//adds to ChainIdStoreId the values of chain and store id
        if(item.toLowerCase() ==='chainid' || item.toLowerCase() ==='storeid')
            ChainIdStoreId.push(result[keyArray[0]][item][0])
    })
    return ChainIdStoreId;
}
/**
 * The script inserts data to DB and deletes duplicate products
 */
async function main() {

    const myModuleFile = require('./src/MyModuleForFiles.js');
    const myModuleDB = require('./src/MyModuleForDB.js');

    try {
        const connection = await myModuleDB.createConnection(mysql);
        /**
         * Opens directory and for each file extracts all the wanted data from xml
         */
        const files = await myModuleFile.readDir("C:\\Users\\97250\\Downloads");
        for (let f of files){//goes on all the files
            if(f === 'desktop.ini')
                continue
            // Construct file path and load zip archive
            const filePath = path.join("C:\\Users\\97250\\Downloads", f);
            const zip = new AdmZip(filePath);

            // Extract XML file from zip archive and read its contents
            const xmlFile = zip.getEntries()[0];
            const xmlData = xmlFile.getData().toString("utf-8");

            // Parse XML data using xml2js library
            const result = await new Promise((resolve, reject) => xml2js.parseString(xmlData, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }));

            try {
                const ChainIdStoreId = getChainIdAndStoreId(result)
                if (ChainIdStoreId.length !== 2)//checks if there chain id and StoreId
                    break;

                const products = getProducts(result);
                for (let obj of products[0][Object.keys(products[0])[0]]) {//passes over each item
                    let newObj = getNewObj(obj);
                    if (newObj == null)
                        break;//there are problems in one of the fields

                    await myModuleDB.insertDataToProductsDB(connection, ChainIdStoreId[0], ChainIdStoreId[1]
                        , obj.PriceUpdateDate[0], obj.ItemPrice[0]
                        , obj.ItemCode[0], obj.ManufacturerItemDescription[0]
                        , obj.AllowDiscount[0], obj.UnitOfMeasure[0]
                        , obj.bIsWeighted[0])
                    console.log("added")
                    await sleep(100)// to prevents error: "maximum call stack size exceeded"
                }
            }
            catch (error){
                if (error instanceof TypeError)
                    console.log(error.message + `file name is : ${f}`)
                else throw new Error(`${error.message}`);
            }
        }
        await connection.end();
    }
    catch (err) {
        console.log(err)
    }
}
module.exports = { getProducts };
main();





