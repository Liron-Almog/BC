class MyModuleForDB {

    static connection = null;

    /******************replaceAll***************************/
    replaceAll(string, find, replace) {
        return string.replace(new RegExp(find, 'g'), replace);
    }
    async connect(mysql){
        return await this.createConnection(mysql)
    }
    /******************createConnection***************************/
    async createConnection(mysql) {
        if (!this.connection) {
            this.connection = await mysql.createConnection({
                host: 'cheaper-db.ca8r7y0dkxxa.us-east-1.rds.amazonaws.com',
                user: 'admin',
                port: '3306',
                password: 'A316335207a',
                database: ''
            });
            return this.connection;
        }
        return this.connection;
    }

    /******************insertDataToStoresDB***************************/
    async insertDataToStoresDB(connection, storeId, branch, chainId) {

        branch = this.replaceAll(branch.trim(), "'", "''");
        branch = this.replaceAll(branch.trim(), `"`, `""`);

        await connection.execute(`DELETE
                                  FROM Cheaper.stores
                                  WHERE store_id = '${storeId}'
                                    AND store_name = "${branch}"
                                    AND chain_id = '${chainId}'`);

        await connection.execute(`INSERT INTO Cheaper.stores (store_id, store_name, chain_id)
                                  VALUES ('${storeId}', "${branch}", '${chainId}')`);
    }

    /******************insertDataToPromotion***************************/
    async insertDataToPromotion(connection,chainId,subChainId,storeId,
                                promotionId,promotionDescription,promotionUpdateDate,
                                promotionStartDate,promotionEndDate,promotionStartHour,
                                promotionEndHour,discountType,allowMultipleDiscounts,
                                maxQty,discountedPrice,discountedPricePerMida,itemCode){

        //fixes the string for DB
        promotionDescription = this.replaceAll(promotionDescription.trim(), "'", "''");
        promotionDescription = this.replaceAll(promotionDescription.trim(), `"`, `""`);

        await connection.execute(`DELETE
                                  FROM Cheaper.promotions
                                  WHERE store_id = '${storeId}'
                                    AND item_code = "${itemCode}"
                                    AND sub_chain_id = "${subChainId}"
                                    AND chain_id = '${chainId}'`);

        await connection.execute(`INSERT INTO Cheaper.promotions (chain_id, sub_chain_id, store_id
                                                        ,promotion_id,description,update_date,
                                                          start_date,end_date,start_hour,end_hour,
                                                          discount_type,allow_multiple_discounts,max_qty,
                                                          discount_price,discount_price_per_mida,item_code)
                                  VALUES ('${chainId}', '${subChainId}', '${storeId}','${promotionId}',
                                            "${promotionDescription}","${promotionUpdateDate}",
                                          "${promotionStartDate}","${promotionEndDate}","${promotionStartHour}",
                                          "${promotionEndHour}",'${discountType}','${allowMultipleDiscounts}',
                                          '${maxQty}','${discountedPrice}','${discountedPricePerMida}','${itemCode}')`);
    }


    async insertDataToProductsDB(connection, ChainId, StoreId, PriceUpdateDate, IPrice, ICode,
                                 IDescription, AllowDiscount, UnitOfMeasure, IsWeighted) {

        UnitOfMeasure = this.replaceAll(UnitOfMeasure.trim(), "'", "''");
        IDescription = this.replaceAll(IDescription.trim(), "'", "''");
        IsWeighted = this.replaceAll(IsWeighted.trim(), "'", "''");

        //deletes the row if existing
        await connection.execute(`DELETE
                                  FROM Cheaper.products
                                  WHERE item_code = ${ICode}
                                    AND chain_id = ${ChainId}
                                    AND store_id = ${StoreId};`);

        await connection.execute(`INSERT INTO Cheaper.products (chain_id, store_id, price_update_date, item_price,
                                           description, is_discount, unit_of_measure, is_weighted, item_code)
                     VALUES ('${ChainId}', '${StoreId}', '${PriceUpdateDate.trim()}',
                             '${IPrice}', '${IDescription.trim()}', '${AllowDiscount}',
                             '${UnitOfMeasure}', '${IsWeighted}'
                            ,'${ICode}')`);
    }
}
module.exports = new MyModuleForDB();
