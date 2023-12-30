const dbConnection = require('../ConnectionToDB');
// Access the database connection


exports.getUser = async function (req, res) {
    const connection = dbConnection.connection;
    const email = req.query.email;
    const password = req.query.password;

    try{
        if (email !== undefined && password !== undefined) {
            const sql = `SELECT * from Cheaper.users where users.email = '${email}' and users.password = '${password}'`
            await connection.query(sql, function (err, result) {
                console.log(result);
                if (err) throw err;
                if(result[0] === undefined){
                    res.status(400).json({error: 'User not found'});
                }
                else {
                    res.status(200).json(result);
                }
            });
        }
        else res.status(400).json({ error: 'User not found' });
    }
    catch(err){
        res.status(400).json(err);

    }
}

exports.postUser = async function (req, res) {
    const connection = dbConnection.connection;
    const { first_name, last_name, email, password } = req.body; // Assuming the data is sent in the request body

    try {
        if (first_name && last_name && email && password) {
            // Check if the user already exists
            const checkUserQuery = `SELECT * FROM Cheaper.users WHERE email = '${email}'`;
            connection.query(checkUserQuery, function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.status(400).json({ error: 'User already exists' });
                } else {
                    // Insert the new user into the database
                    const insertUserQuery = `INSERT INTO Cheaper.users (first_name, last_name, email, password) VALUES ('${first_name}', '${last_name}', '${email}', '${password}')`;
                    connection.query(insertUserQuery, function (error, results) {
                        if (error) throw error;
                        res.status(200).json({ message: 'User added successfully' });
                    });
                }
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


//add putUser to update password when user forgot password
