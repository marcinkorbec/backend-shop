import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ShopModule } from "./shop/shop.module";
import { BasketModule } from "./basket/basket.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
    imports: [
        ShopModule,
        BasketModule,
        UsersModule,
        TypeOrmModule.forRoot({
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
            autoLoadEntities: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
}
