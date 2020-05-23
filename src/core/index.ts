import UserRoutes from './modules/routes/user';
import * as bodyParser from 'body-parser';
import Database from './database/db';
import * as express from 'express';
import * as morgan from 'morgan';
import * as dotenv from "dotenv";

dotenv.config();

class API {
    public APP: express.Application;
    private DB: Database;

    constructor() {
        this.DB = new Database();
        this.APP = express();
        this.databaseConnection();
        this.middleware();
        this.routes();
    }

    databaseConnection(){
        this.DB.startConnection();
    }

    closeDatabaseConnection(message, callback){
        this.DB.closeConnection(message, () => callback());
    }
    
    middleware() {
        this.APP.use(morgan('dev'));
        this.APP.use(bodyParser.json());
        this.APP.use(bodyParser.urlencoded({
            extended: true
        }));
    }
    
    routes() {
        this.APP.route('/api/users').get(UserRoutes.getAll);
        this.APP.route('/api/user/new').post(UserRoutes.create);
        this.APP.route('/api/user/:id').put(UserRoutes.update);
        this.APP.route('/api/user/:id').get(UserRoutes.getByID);
        this.APP.route('/api/user/:id').delete(UserRoutes.delete);
        this.APP.route('/').get((req, res) => res.status(200).json({
            'Hello': 'World!'
        }));
    }
}
export default new API();