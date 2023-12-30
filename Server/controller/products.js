const dbConnection = require('../ConnectionToDB');

const productsHash = {"חלב": "חלב טרי",
                      "שמן": "שמן חמניות",
                      "שוקולד": "שוקולד פרה",
                      "גבינה": "גבינה לבנה",
                      "שמנת": "שמנת מתוקה",
                      "סבון": "אל סבון",
                      "מלח": "מלח מטבח",
                      "סוכר": "סוכר 1 ",}
const stopWords = ['ואו', 'ה', 'זה', ,'של', 'ירק', 'פרי', 'קרטון', 'כשרות', 'עם', 'אם', 'טרי' ];


exports.getProducts = async function (req, res) {
    const connection = dbConnection.connection;
    const product = req.query.product; // Use the correct parameter name 'product'
    const chain_id = req.query.chain_id;
    const store_id = req.query.store_id;
    console.log( product + chain_id + store_id)

    try {
        if (product !== undefined && chain_id !== undefined && store_id !== undefined) {
            let searchTerms = product.split(' ').filter(term => !stopWords.includes(term)).join(' ');

            if(productsHash.hasOwnProperty(searchTerms))
                searchTerms = productsHash[searchTerms];

            console.log(searchTerms);
            const sql = `SELECT * FROM Cheaper.products WHERE products.chain_id=${chain_id} AND products.store_id=${store_id} AND products.description LIKE '%${searchTerms}%' ORDER BY products.item_price ASC;`;
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
