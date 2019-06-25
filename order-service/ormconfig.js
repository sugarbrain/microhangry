module.exports = {
    "type": "postgres",
    "host": process.env.DATABASE_HOST || "order-db",
    "port": process.env.DATABASE_PORT || 5432,
    "username": process.env.DATABASE_USER || "postgres",
    "password": process.env.DATABASE_PASS || "postgres",
    "database": process.env.DATABASE_NAME || "order",
    "logging": true,
    "entities": ["src/entities/*.ts"],
    "migrations": ["src/database/migration/*.ts"],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "./src/database/migration"
    },
    "migrationRun": true
}
