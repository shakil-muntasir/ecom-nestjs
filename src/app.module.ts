import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

import env from './configs/env';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: env.DB_HOST,
            port: env.DB_PORT,
            username: env.DB_USERNAME,
            password: env.DB_PASSWORD,
            database: env.DB_DATABASE,
            autoLoadEntities: true,
            synchronize: env.DB_SYNC,
        }),
        UsersModule,
        CategoriesModule,
        ProductsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
