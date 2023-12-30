const dbConnection = require('../ConnectionToDB');

exports.getListExist = async function (req, res) {


    const connection = dbConnection.connection;
    const listName = req.query.listName;
    const email = req.query.email;
    console.log(email,listName)

    try {
        const sql = `SELECT * from Cheaper.carts where carts.email='${email}' and '${listName}'=carts.cart_name;`
        await connection.query(sql, function (err, result) {

            if (err) throw err;

            if (result.length === 0) {
                return res.status(200).json({ message: 'The name is available' });
            }
            else return res.status(400).json({ error: 'Sorry, this name is in use'});
        });


    } catch (err) {
        res.status(400).json(err);
    }

};
