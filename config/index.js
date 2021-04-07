const {
    MongoClient
} = require('mongodb');

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */

const uri = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.baqrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect = async () => {
    try {
        await client.connect();
    } catch {
        error => {
            console.error(`client connection error /config/::17 ==> ${error}`);
        };
    }
}

disconnect = async () => {
    try {
        await client.close();
    } catch {
        error => {
            console.error(`disconnect error /config/::27 ==> ${error}`);
        }
    }
}


show_dbs = async (client) => {
    try {
        await client.connect()
        databasesList = await client.db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch {
        error => {
            throw new Error(error);
        }
    } finally {
        await client.close();
    }

}

module.exports = remoteDB = {
    client: client,
    connect: connect,
    disconnect: disconnect,
    show_dbs: show_dbs,
};