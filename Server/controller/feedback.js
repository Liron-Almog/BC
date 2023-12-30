const dbConnection = require('../ConnectionToDB');
// Access the database connection



exports.postFeedback = async function (req, res) {

    const connection = dbConnection.connection;
    const { sliderValue } = req.body; // Assuming the data is sent in the request body

    try {
        if (sliderValue) {
            // Check if the user already exists
            const query = `INSERT INTO Cheaper.feedback (user_feedback) VALUES (${sliderValue});`;
            connection.query(query, function (error, results) {
                if (error) throw error;
                res.status(200).json({ message: 'successfully' });
            });
        } else {
            res.status(400).json({ error: 'error'});
        }
    } catch (error) {
        res.status(400).json(error);
    }
};


//add putUser to update password when user forgot password
