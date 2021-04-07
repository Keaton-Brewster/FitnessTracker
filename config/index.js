const {
    MongoClient
} = require('mongodb');

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const uri = "mongodb+srv://FitnessTracker:FitnessTrackerDBKPB@cluster0-shard-00-01.baqrb.mongodb.net:27017/test?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function main() {
    try {
        await client.connect();
    } catch {
        error => {
            console.error(`client connection error /config/::17 ==> ${error}`);
        };
    } finally {
        await client.close();
    }
}

module.exports = main;