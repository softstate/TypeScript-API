import * as mongoose from 'mongoose';
import * as dotenv from "dotenv";
dotenv.config();

const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_URL,
    MONGO_PORT,
    MONGO_QUERY
  } = process.env;

class Database {
    private DB_URL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}:${MONGO_PORT}${MONGO_QUERY}`;
    private DATABASE;
    
    
    constructor() { }

    async startConnection() {
        try {
            console.log("\x1b[33m%s\x1b[0m", "aguardando conexão com o banco de dados...")
            await mongoose.connect(this.DB_URL,{useNewUrlParser: true, useUnifiedTopology: true })
                .then(() => {
                   this.conectionStatus("connected", this.DB_URL);
                })
                .catch((err) => {
                    this.conectionStatus("error", this.DB_URL);
                });
        } catch (error) {
            return this.conectionStatus("error", this.DB_URL);
        }
    }

    conectionStatus(status,url) {
        this.DATABASE = mongoose.connection;
        switch(status) {
            case "connected":
                this.DATABASE.on('connected', () => console.log("\x1b[32m%s\x1b[0m", 'Mongoose está conectado ao ' + url));
                break;

            case "disconnected":
                this.DATABASE.on('disconnected', () => console.log("\x1b[33m%s\x1b[0m", "Mongoose está desconectado do " + url));
                break;

            case "error":
                this.closeConnection(console.log("\x1b[31m%s\x1b[0m", 'Exiting...\n', '\x1b[33m', 'Mongoose não teve exito ao conectar na URL: ' + url), () => {
                    process.exit(0);
                });
                break;

            default:
                return;
            }
    }

    closeConnection(message, callback) {
        this.DATABASE = mongoose.connection;
        this.DATABASE.close(() => {
            callback();
        })
    }
}
export default Database;