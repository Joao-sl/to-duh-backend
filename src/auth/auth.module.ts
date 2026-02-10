import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import jwtConfig from './config/jwt.config';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { HashModule } from './hash/hash.module';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    HashModule,
    UsersModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
