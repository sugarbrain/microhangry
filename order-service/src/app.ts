import 'reflect-metadata';
import DatabaseConfig from './config/database';
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import OrderRoute from './routes/order.route';

class OrderApp {
    public app: Express.Application;
    public HOST = process.env.HOST || 'localhost';
    public PORT = process.env.PORT || 8081;

    constructor() {
        this.app = Express();
        this._config();
    }

    public async start() {
        console.log(`Order SERVICE started.`);

        this.app.listen(this.PORT, () => {
            console.log(`Server listening in http://${this.HOST}:${this.PORT}`);
        });
    }

    private async _config(): Promise<void> {
        // Connecting to database
        await DatabaseConfig.connect();

        // Allowing body parser JSON
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Routing
        this.app.use("/orders", OrderRoute);
    }
}

new OrderApp().start();
