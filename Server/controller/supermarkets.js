const dbConnection = require('../ConnectionToDB');

exports.getSupermarkets = async function (req, res) {
    const connection = dbConnection.connection;
    const chain_id = req.query.chain_id;

    try {
        const sql = `SELECT store_name, store_id FROM Cheaper.chain_names NATURAL JOIN Cheaper.stores where chain_id = '${chain_id}'`;
        await connection.query(sql, function (err, result) {

            if (result.length === 0) {
                return res.status(404).json({ error: 'Stores not found' });
            }

            return res.status(200).json(result);
        });

    } catch (err) {
        res.status(400).json(err);
    }

};
