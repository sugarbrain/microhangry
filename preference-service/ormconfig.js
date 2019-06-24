module.exports = {
    "type": "postgres",
    "host": "preference-db",
    "port": 5432,
    "username": "postgres",
    "password": "postgres",
    "database": "preference",
    "entities": ["src/entities/*.ts"],
    "migrations": ["src/database/migration/*.ts"],
    "cli": {
        "entitiesDir": "src/entities",
        "migrationsDir": "./src/database/migration"
    },
    "migrationRun": true
}