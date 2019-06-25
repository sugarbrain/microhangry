import 'reflect-metadata';
import DatabaseConfig from './config/database';
import * as Express from 'express';
import * as bodyParser from 'body-parser';
import * as swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import UserRouter from "./routes/user.route";
import AuthRouter from "./routes/auth.route";
import PermissionRouter from './routes/permission.route';
import PlaceCategoryRouter from './routes/placeCategory.route';
import PlaceRouter from "./routes/place.route";
import MealRouter from './routes/meal.route';
import AccessRouter from './routes/access.route';
import CheckoutSlotRouter from "./routes/checkoutSlot.route";

class Core {
    public app: Express.Application;
    public PORT = process.env.PORT || 8080;

    constructor() {
        this.app = Express();
        this._config();
    }

    public async start() {
        console.log(`Core API started.`);

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

        const options = {
            swaggerDefinition: {
                info: {
                    title: 'Hangry - Core API',
                    version: '0.2.0',
                    description: 'For people that are hungry for microservices!',
                },
            },
            schemes: ["http"],
            apis: ["**/*.ts"],
        };

        const specs = swaggerJsdoc(options);

        // Routing
        this.app.use("/auth", AuthRouter);
        this.app.use("/accesses", AccessRouter);
        this.app.use("/users", UserRouter);
        this.app.use("/permissions", PermissionRouter);
        this.app.use("/place-categories", PlaceCategoryRouter);
        this.app.use("/places", PlaceRouter);
        this.app.use("/meals", MealRouter);
        this.app.use("/checkout-slots", CheckoutSlotRouter);
        this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));
    }
}

new Core().start();
