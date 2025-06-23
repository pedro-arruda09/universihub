import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id-pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
        new ParseIntIdPipe(),
    );

    app.enableCors({
        origin: 'http://localhost:4200',
        methods: 'GET,POST,PUT,DELETE,OPTIONS',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
        optionsSuccessStatus: 200,
        preflightContinue: false,
    });

    const documentBuilderConfig = new DocumentBuilder()
        .setTitle('Universihub')
        .setDescription('An interactive system to manage graduation courses and its participants.')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, documentBuilderConfig);
    SwaggerModule.setup('docs', app, document);

    await app.listen(3000);
}
bootstrap();
