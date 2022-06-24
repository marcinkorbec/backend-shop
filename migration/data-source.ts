import { DataSource, DataSourceOptions } from 'typeorm';

export const connectionSource = new DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'megak_nest',
    entities: ["dist/**/**.entity{.ts,.js}"],
    bigNumberStrings: false,
    logging: true,
    migrationsTableName: 'migrations',
    migrations: ["dist/migration/*.ts, .js"],
    cli: {
        migrationsDir: 'migration'
    },
} as DataSourceOptions);