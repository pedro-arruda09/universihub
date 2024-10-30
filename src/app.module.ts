import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as modules from './domain/modules';
import { ConfigModule, ConfigType } from '@nestjs/config';
import globalConfig from './infrastructure/config/global.config';

const modulesList = Object.keys(modules).map(moduleIndex => modules[moduleIndex as keyof typeof modules]);

@Module({
    imports: [
        ConfigModule.forFeature(globalConfig),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(globalConfig)],
            inject: [globalConfig.KEY],
            useFactory: async (globalConfigurations: ConfigType<typeof globalConfig>) => {
                return {
                    type: globalConfigurations.database.type,
                    host: globalConfigurations.database.host,
                    port: globalConfigurations.database.port,
                    username: globalConfigurations.database.username,
                    database: globalConfigurations.database.database,
                    password: globalConfigurations.database.password,
                    autoLoadEntities: globalConfigurations.database.autoLoadEntities,
                    synchronize: globalConfigurations.database.synchronize,
                };
            },
        }),
        ...modulesList,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
