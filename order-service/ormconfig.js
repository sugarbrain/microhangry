module.exports = {
    "type": "postgres",
    "host": process.env.ORDER_DB_HOST || "order-db",
    "port": 5432,
    "username": process.env.ORDER_DB_USER || "postgres",
    "password": process.env.ORDER_DB_PASS || "postgres",
    "database": process.env.ORDER_DB_NAME || "order",
    "logging": true,
    "entities": ["src/entities/*.ts"],
    "migrations": ["src/database/migration/*.ts"],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "./src/database/migration"
    },
    "migrationRun": true
}
