import { createConnection, getRepository, Repository, ObjectType, EntitySchema } from 'typeorm';
/**
* @namespace Config
* @class DatabaseConfig
*/
export default class DatabaseConfig {
    public static connectionName: string = `default`;

    public static async connect() {
        for (let i = 0; i < 5; i++) {
            try {
                await createConnection(DatabaseConfig.connectionName);
                console.log(`Connected successfully to ${DatabaseConfig.connectionName.toUpperCase()}.`);
                break;
            } catch (e) {
                console.log(`Couldn't connect to database: ${e.message}\n\nTrying again in 3 sec...`);
                await new Promise(_ => setTimeout(_, 3000));
            }
        }
    }

    /**
     * Gets repository for the given entity class.
     *
     * @param entity
     */
    public static getRepository<T>(entity: ObjectType<T> | EntitySchema<T> | string): Repository<T> {
        return getRepository(entity, DatabaseConfig.connectionName);
    }
}