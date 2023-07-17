import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { OrdersService } from './orders/orders.service';
import { OrdersController } from './orders/orders.controller';
import { UsersController } from './users/users.controller';
import { OrderRepository } from './orders/order.repository';
import { Order } from './orders/order.entity';
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
        TypeOrmModule.forFeature([Order,OrderRepository]),
    ],
    
    controllers: [AppController, UsersController, OrdersController],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        AppService,
        OrdersService,
    ],
})
export class AppModule {}
