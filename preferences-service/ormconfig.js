module.exports = {
    "type": "postgres",
    "host": "preferences-db",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "preferences",
    "entities": ["src/entities/*.ts"],
    "migrations": ["src/database/migration/*.ts"],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "./src/database/migration"
    },
    "migrationRun": true
}