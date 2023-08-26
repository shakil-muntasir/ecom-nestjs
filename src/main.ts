import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from 'src/validation.pipe';
import env from 'src/configs/env';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors();
    await app.listen(env.APP_PORT);
}
bootstrap();
