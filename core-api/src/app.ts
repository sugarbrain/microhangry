import 'reflect-metadata';
import DatabaseConfig from './config/database';
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import UserRouter from "./routes/user.route";
import AuthRouter from "./routes/auth.route";
import PermissionRouter from './routes/permission.route';
import PlaceCategoryRouter from './routes/placeCategory.route';
import PlaceRouter from "./routes/place.route";
import MealRouter from './routes/meal.route';
import AccessRouter from './routes/access.route';
import CheckoutSlotRouter from "./routes/checkoutSlot.route";
import PreferenceRoute from './routes/preference.route';
import NotificationRouter from "./routes/notification.route";
import OrderRouter from "./routes/order.route";

class Core {
    public app: Express.Application;
    public HOST = process.env.HOST || 'localhost';
    public PORT = process.env.PORT || 8080;

    constructor() {
        this.app = Express();
        this._config();
    }

    public async start() {
        console.log(`Core API started.`);

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
        this.app.use("/auth", AuthRouter);
        this.app.use("/accesses", AccessRouter);
        this.app.use("/users", UserRouter);
        this.app.use("/permissions", PermissionRouter);
        this.app.use("/place-categories", PlaceCategoryRouter);
        this.app.use("/places", PlaceRouter);
        this.app.use("/meals", MealRouter);
        this.app.use("/checkout-slots", CheckoutSlotRouter);
        this.app.use("/preferences", PreferenceRoute);
        this.app.use("/notifications", NotificationRouter);
        this.app.use("/orders", OrderRouter);
    }
}

new Core().start();
