import express from 'express';
import 'dotenv/config';
import dbConnection from '../database/config.js';
import celdaRoutes from '../routers/celdaRouters.js';

export default class Server {
    constructor() {
        this.app = express();
        this.listen();
        this.dbConnect();
        this.pathCelda = '/api/celdas';
        this.route();
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
        });
    }

    async dbConnect() {
        await dbConnection();
    }

    route() {
        this.app.use(express.json());
        this.app.use(this.pathCelda, celdaRoutes);
    }
}
