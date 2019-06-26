import 'reflect-metadata';
import DatabaseConfig from './config/database';
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import PreferenceRoute from './routes/preference.route';

class PreferenceApp {
    public app: Express.Application;
    public PORT = process.env.PREFERENCE_PORT || process.env.PORT || 8080;

    constructor() {
        this.app = Express();
        this._config();
    }

    public async start() {
        console.log(`Preferences SERVICE started.`);

        this.app.listen(this.PORT, () => {
            console.log(`Server listening in http://localhost:${this.PORT}`);
        });
    }

    private async _config(): Promise<void> {
        // Connecting to database
        await DatabaseConfig.connect();

        // Allowing body parser JSON
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));

        // Routing
        this.app.use("/preferences", PreferenceRoute);
    }
}

new PreferenceApp().start();
