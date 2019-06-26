module.exports = {
    "type": "postgres",
    "host": process.env.PREFERENCE_DB_HOST || "preference-db",
    "port": 5432,
    "username": process.env.PREFERENCE_DB_USER || "postgres",
    "password": process.env.PREFERENCE_DB_PASS || "postgres",
    "database": process.env.PREFERENCE_DB_NAME || "preference",
    "entities": ["src/entities/*.ts"],
    "migrations": ["src/database/migration/*.ts"],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "./src/database/migration"
    },
    "migrationRun": true
}
