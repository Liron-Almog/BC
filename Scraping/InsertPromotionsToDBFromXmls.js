"use strict";

const xml2js = require("xml2js");
const path = require("path");
const mysql = require("mysql2");
const AdmZip = require("adm-zip");
const sleep = require("sleep-promise");
const NUMBER_OF_FIELDS = 12;
const InsertProductsToDBFromXmls = require("./InsertProductsToDBFromXmls.js");
async function main() {

    const myModuleDB = require('./src/MyModuleForDB.js');
    const myModuleFile = require('./src/MyModuleForFiles.js');

    try {
        const connection = await myModuleDB.createConnection(mysql);

        const files = await myModuleFile.readDir("C:\\Users\\liron\\Desktop\\Final-Project\\ZolAndBigPromotionsFiles");
        for (let f of files){
            // Construct file path and load zip archive
            const filePath = path.join("C:\\Users\\liron\\Desktop\\Final-Project\\ZolAndBigPromotionsFiles", f);
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
                const chainIdStoreSubChain = getChainIdStoreSubChain(result)
                const products = InsertProductsToDBFromXmls.getProducts(result)
                for (let i of products[0].Promotion) {
                    let newObj = getNewObj(i);

                    if (newObj === null)
                        break;//there are problems in one of the fields

                    for (let item of i.PromotionItems[0].Item)
                        await myModuleDB.insertDataToPromotion(connection, chainIdStoreSubChain[0], chainIdStoreSubChain[1], chainIdStoreSubChain[2],
                            newObj.PromotionId[0], newObj.PromotionDescription[0], newObj.PromotionUpdateDate[0],
                            newObj.PromotionStartDate[0], newObj.PromotionEndDate[0], newObj.PromotionStartHour[0],
                            newObj.PromotionEndHour[0], newObj.DiscountType[0], newObj.AllowMultipleDiscounts[0],
                            newObj.MaxQty[0], newObj.DiscountedPrice[0], newObj.DiscountedPricePerMida[0],
                            item.ItemCode[0])
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
        console.log(err.message)
    }
}
function getChainIdStoreSubChain(result){

    let keyArray = Object.keys(result)
    let ChainIdStoreId = [];
    keyArray = [...keyArray,...Object.keys(result[keyArray[0]])]

    keyArray.forEach(item =>{//adds to ChainIdStoreId the values of chain and store id
        if(item.toLowerCase() ==='chainid' || item.toLowerCase() ==='storeid' ||
                                            item.toLowerCase() ==='subchainid')
            ChainIdStoreId.push(result[keyArray[0]][item][0])
    })
    return ChainIdStoreId;
}
function getNewObj(obj){

    let property = Object.keys(obj);
    let newObj = {};

    property.forEach(item =>{
        let itemInLowerCase = item.toLowerCase();

        if(itemInLowerCase === 'promotionid')
            newObj.PromotionId = obj[item];
        else if (itemInLowerCase === 'promotiondescription')
            newObj.PromotionDescription = obj[item];
        else if (itemInLowerCase === 'promotionupdatedate')
            newObj.PromotionUpdateDate = obj[item];
        else if (itemInLowerCase === 'promotionstartdate')
            newObj.PromotionStartDate = obj[item];
        else if (itemInLowerCase === 'promotionenddate')
            newObj.PromotionEndDate = obj[item];
        else if (itemInLowerCase === 'promotionstarthour')
            newObj.PromotionStartHour = obj[item];
        else if (itemInLowerCase === 'promotionendhour')
            newObj.PromotionEndHour = obj[item];
        else if (itemInLowerCase === 'discounttype')
            newObj.DiscountType = obj[item];
        else if (itemInLowerCase === 'allowmultiplediscounts')
            newObj.AllowMultipleDiscounts = obj[item];
        else if (itemInLowerCase === 'maxqty')
            newObj.MaxQty = obj[item];
        else if (itemInLowerCase === 'discountedprice')
            newObj.DiscountedPrice = obj[item];
        else if (itemInLowerCase === 'discountedpricepermida')
            newObj.DiscountedPricePerMida = obj[item];
        else if (itemInLowerCase === 'DiscountedPricePerMida')
            newObj.DiscountedPricePerMida = obj[item];
    })
    if(Object.keys(newObj).length !== NUMBER_OF_FIELDS)
        return null;

    return newObj;
}
main()