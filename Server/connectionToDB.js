const mysql = require("mysql");

class ConnectionToDB {
    constructor() {
        this.connection = null;
        this.createConnection();
    }

    async createConnection() {
        try {
            this.connection = await mysql.createConnection({
                host: 'cheaper-db.ca8r7y0dkxxa.us-east-1.rds.amazonaws.com',
                user: 'admin',
                port: '3306',
                password: 'A316335207a',
                database: ''
            });

            this.connection.connect((err) => {
                if (err) {
                    console.error('Database connection failed: ' + err.stack);
                    return;
                }
                console.log('Connected to the database.');
            });
        } catch (error) {
            console.error('Error creating database connection:', error);
        }
    }
}

const instance = new ConnectionToDB();
module.exports = instance;
