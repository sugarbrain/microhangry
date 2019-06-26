module.exports = {
    "type": "postgres",
    "host": process.env.NOTIFICATION_DB_HOST || "notification-db",
    "port": 5432,
    "username": process.env.NOTIFICATION_DB_USER || "postgres",
    "password": process.env.NOTIFICATION_DB_PASS || "postgres",
    "database": process.env.NOTIFICATION_DB_NAME || "notification",
    "entities": ["src/entities/*.ts"],
    "migrations": ["src/database/migration/*.ts"],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "./src/database/migration"
    }
}
