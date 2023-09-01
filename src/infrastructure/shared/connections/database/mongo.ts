import { Db, MongoClient } from "mongodb";
import { DB_NAME, DB_URL } from "../../../../../config";

const URL = DB_URL;
const NAME = DB_NAME;
let client: MongoClient;
let db: Db;

async function connect(): Promise<Db> {
    if (db) {console.log("DB already connected"); return db;}
    try {
        console.log("Connecting to DB...");
        client = await MongoClient.connect(URL);
        db = client.db(NAME);
        console.log("DB connected");
        return db;
    } catch (error) {
        console.error("DB connection failed", error);
        client.close()
        throw error;
    }
}

export default connect;