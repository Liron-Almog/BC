const dbConnection = require('../ConnectionToDB');
// Access the database connection

exports.postAddCart = async function (req, res) {
    const connection = dbConnection.connection;

    try {
        const { listItems, email, selectedStore, selectedSupermarket,listName } = req.body;
        const list_size = listItems.length
        const chainName= selectedSupermarket.chain_name;

        if (list_size > 0 && email && listName && selectedStore && listItems && chainName ) {
            const addCartNameQuery = `INSERT INTO Cheaper.carts (email,cart_name,list_size,chain_name)
                                    VALUES ('${email}','${listName}',${list_size},'${chainName}');`

            connection.query(addCartNameQuery, function (error, results) {
                if (error) throw error;
            });


            for (let i = 0; i < listItems.length; i++) {
                let item = listItems[i];
                item.unit_of_measure = replaceAll(item.unit_of_measure.trim(), "'", "''");
                item.unit_of_measure = replaceAll(item.unit_of_measure, `"`, `""`);
                item.title = replaceAll(item.title.trim(), "'", "''");
                item.title = replaceAll(item.title, `"`, `""`);

                const addCartItemsQuery = `INSERT INTO Cheaper.carts_data(title,item_code,price,unit_of_measure,email,list_name)
                                    VALUES ('${item.title}',${item.item_code},'${item.price}','${item.unit_of_measure}','${email}','${listName}');`
                connection.query(addCartItemsQuery, function (error, results) {
                    if (error) throw error;
                    if(i +1=== listItems.length)
                        res.status(200).json({message: 'successfully'});
                });
            }
            }
        else res.status(400).json({error: 'error'});
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getCarts = async function (req, res) {

    const connection = dbConnection.connection;
    const email = req.query.email;

    try{
        if (email !== "") {
            const sql = `SELECT * from Cheaper.carts where carts.email = '${email}';`
            await connection.query(sql, function (err, result) {

                if (err) throw err;
                if(result === undefined){
                    res.status(400).json({error: 'error'});
                }
                else {
                    res.status(200).json(result);
                }
            });
        }
        else res.status(400).json({ error: 'error' });
    }
    catch(err){
        res.status(400).json(err);
    }
}
exports.getCartItems = async function (req, res) {

    const connection = dbConnection.connection;
    const email = req.query.email;
    const title = req.query.title;

    try{
        if (email !== "") {
            const sql = `SELECT * from Cheaper.carts_data where carts_data.email = '${email}' and carts_data.list_name = '${title}';`
            connection.query(sql, function (err, result) {
                if (err) throw err;
                if(result === undefined){
                    res.status(400).json({error: 'error'});
                }
                else {
                    let array =[]
                    for(let i = 0;i < result.length; i++)
                        array.push({unit_of_measure:result[i].unit_of_measure, list_name:result[i].list_name, title:result[i].title, price:result[i].price,item_code:result[i].item_code})
                    console.log(array)
                    res.status(200).json(array);
                }
            });
        }
        else res.status(400).json({ error: 'error' });
    }
    catch(err){
        res.status(400).json(err);
    }
}
exports.deleteItem = async function (req, res) {

    const connection = dbConnection.connection;
    const email = req.query.email;
    const itemCode = req.query.itemCode;
    const listName = req.query.listName;
    try{

        if(email && itemCode && listName) {
            const sql = `DELETE from Cheaper.carts_data where carts_data.email = '${email}' and carts_data.item_code = ${itemCode} and carts_data.list_name = '${listName}' LIMIT 1;`
            connection.query(sql, function (err, result) {
                if (err) throw err;
                if (result === undefined) {
                    res.status(400).json({error: 'error'});
                } else {
                    const sql = `SELECT list_size from Cheaper.carts where carts.email = '${email}' and carts.cart_name = '${listName}';`
                    connection.query(sql, function (err, data) {

                        if (err) throw err;
                        if (result === undefined) {
                            res.status(400).json({error: 'error'});
                        } else {
                            let newSize = parseInt(data[0].list_size) -1;
                            const myQuery = `UPDATE Cheaper.carts SET carts.list_size = ${newSize} where carts.email = '${email}' and carts.cart_name = '${listName}';`
                            connection.query(myQuery, function (err, data) {

                                if (err) throw err;
                                if (result === undefined) {
                                    res.status(400).json({error: 'error'});
                                } else {
                                    res.status(200).json(result);
                                }
                            })
                        }
                    })
                    }
            });
        }
        else res.status(400).json({ message: 'succeed' });
    }
    catch(err){
        res.status(400).json(err);
    }
}
exports.deleteCart = async function (req, res) {


    try{
        const connection = dbConnection.connection;
        const email = req.query.email;
        const listName = req.query.listName;


        if(email && listName) {
            const sql = `DELETE from Cheaper.carts where carts.email = '${email}' and carts.cart_name = '${listName}';`
            connection.query(sql, function (err, result) {
                if (err) throw err;


                res.status(200).json({message: 'deleted'});
            })
        }
        else res.status(400).json({ message: 'succeed' });
    }
    catch(err){
        res.status(400).json(err);
    }
}
function replaceAll(string, find, replace) {
    return string.replace(new RegExp(find, 'g'), replace);
}
