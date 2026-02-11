import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import databaseConfig from './config/database.config';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ProjectsModule,
    ConfigModule.forRoot({}),
    ConfigModule.forFeature(databaseConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [databaseConfig.KEY],
      useFactory: (databaseConfigs: ConfigType<typeof databaseConfig>) => ({
        type: databaseConfigs.type,
        host: databaseConfigs.host,
        port: databaseConfigs.port,
        database: databaseConfigs.database,
        username: databaseConfigs.username,
        password: databaseConfigs.password,
        synchronize: databaseConfigs.synchronize,
        autoLoadEntities: databaseConfigs.autoLoadEntities,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
