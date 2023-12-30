const dbConnection = require('../ConnectionToDB');

exports.getChains = async function (req, res) {
    const connection = dbConnection.connection;
    //const supermarkets = req.query;

    try {
        const sql = `SELECT distinct(chain_name),chain_id FROM Cheaper.chain_names NATURAL JOIN Cheaper.stores;`; // SELECT * from Cheaper.stores`;
        await connection.query(sql, function (err, result) {

            if (result.length === 0) {
                return res.status(404).json({ error: 'Stores not found' });
            }

            else{
                let array = [];
                for(let i = 0;i < result.length; i++)
                    array.push({chain_name:result[i].chain_name, chain_id:result[i].chain_id})
                console.log(array)
                return res.status(200).json(array);
            }
        });

    } catch (err) {
        res.status(400).json(err);
    }

};
