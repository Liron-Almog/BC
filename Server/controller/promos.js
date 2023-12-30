const dbConnection = require('../ConnectionToDB');

exports.getPromos = async function (req, res) {
    const connection = dbConnection.connection;
    const chain_id = req.query.chain_id; // Use the correct parameter name 'product'
    const store_id = req.query.store_id;

    try {
        if (chain_id !== undefined && store_id !== undefined) {

            const sql = `SELECT description, promotion_id, item_code, start_date, end_date FROM Cheaper.promotions WHERE chain_id='${chain_id}' AND store_id='${store_id}' GROUP BY promotion_id;`;

            await connection.query(sql, function (err, result) {

                if (err) throw err;
                if (result[0] === undefined) {
                    res.status(400).json({ error: 'Product not found' });
                } else {
                    res.status(200).json(result);
                }
            });
        } else {
            res.status(400).json({ error: 'Product not found' });
        }
    } catch (err) {
        res.status(400).json(err);
    }
};
