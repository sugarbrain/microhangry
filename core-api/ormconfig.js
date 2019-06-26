module.exports = {
    "type": "postgres",
    "host": process.env.CORE_DB_HOST || "core-db",
    "port": 5432,
    "username": process.env.CORE_DB_USER || "postgres",
    "password": process.env.CORE_DB_PASS || "postgres",
    "database": process.env.CORE_DB_NAME || "core",
    "logging": true,
    "entities": ["src/entities/*.ts"],
    "migrations": ["src/database/migration/*.ts"],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "./src/database/migration"
    },
    "migrationRun": true
}
