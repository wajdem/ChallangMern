const { MongoClient } = require('mongodb');

let dbConnection


module.exports = {
    connectToDb: (wa) => {
        MongoClient.connect('mongodb://0.0.0.0:27017/datachallang')
        .then((client) => {
            dbConnection = client.db()
            return  wa()
        })
        .catch(err => {
            console.log(err)
            return wa(err)
        })
    },
    getDb: () => dbConnection
}