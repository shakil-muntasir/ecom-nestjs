import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';
import { UsersController } from './users/users.controller';
import { Order } from './orders/orders.entity';
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
        AuthModule,
        OrdersModule
    ],
    
    controllers: [AppController,  UsersController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        AppService
    ],
})
export class AppModule {}
