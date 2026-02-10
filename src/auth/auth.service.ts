import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import jwtConfig from './config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { HashService } from 'src/auth/hash/hash.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { JwtRefreshTokenDto } from './dto/jwt-refresh-token.dto';
import {
  JwtAccessTokenPayloadDto,
  JwtRefreshTokenPayloadDto,
} from './dto/jwt-token-payload.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigs: ConfigType<typeof jwtConfig>,
  ) {}

  private async genAccessToken(id: number) {
    const accessToken = await this.jwtService.signAsync(
      {
        sub: id,
      },
      {
        secret: this.jwtConfigs.secret,
        expiresIn: this.jwtConfigs.accessTtl,
        audience: this.jwtConfigs.audience,
        issuer: this.jwtConfigs.issuer,
      },
    );

    return accessToken;
  }

  private async genRefreshToken(id: number) {
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: id,
      },
      {
        secret: this.jwtConfigs.secret,
        expiresIn: this.jwtConfigs.refreshTtl,
        audience: this.jwtConfigs.audience,
        issuer: this.jwtConfigs.issuer,
      },
    );

    return refreshToken;
  }

  getUser(id: number) {
    return this.usersService.findOneById(id);
  }

  async refreshToken(data: JwtRefreshTokenDto) {
    try {
      const payload: JwtRefreshTokenPayloadDto =
        await this.jwtService.verifyAsync(data.refreshToken, this.jwtConfigs);
      const accessToken = await this.genAccessToken(payload.sub);

      return { accessToken: accessToken };
    } catch {
      throw new UnauthorizedException('Invalid token or expired');
    }
  }

  async signIn(data: LoginDto) {
    const invalidCredentialsMsg = 'Invalid email or password';

    const user = await this.usersService.findOneByEmail(
      data.email,
      'unauthorized',
      invalidCredentialsMsg,
    );

    const passwordIsValid = await this.hashService.compareHash(
      data.password,
      user.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException(invalidCredentialsMsg);
    }

    const refreshTokenPromise = this.genRefreshToken(user.id);
    const accessTokenPromise = this.genAccessToken(user.id);

    const [refreshToken, accessToken] = await Promise.all([
      refreshTokenPromise,
      accessTokenPromise,
    ]);

    return { refreshToken: refreshToken, accessToken: accessToken };
  }

  async signUp(data: CreateUserDto) {
    const passwordHash = await this.hashService.generateHash(data.password);
    const userData = {
      ...data,
      password: passwordHash,
    };

    const createUser = await this.usersService.create(userData);
    return createUser;
  }

  async update(tokenPayload: JwtAccessTokenPayloadDto, data: UpdateUserDto) {
    const bodyIsEmpty = Object.values(data).filter(
      value => value !== undefined,
    );

    if (bodyIsEmpty.length === 0) {
      throw new BadRequestException('Request body is empty');
    }

    const user = await this.usersService.findOneById(tokenPayload.sub);
    user.name = data.name ?? user.name;

    if (data.newPassword) {
      const isPasswordCorrect = await this.hashService.compareHash(
        data.password ?? '',
        user.password,
      );

      if (!isPasswordCorrect) {
        throw new UnauthorizedException('Incorrect password');
      }

      const newPasswordHash = await this.hashService.generateHash(
        data.newPassword,
      );
      user.password = newPasswordHash;
    }

    return await this.usersService.save(user);
  }

  async deleteUser(data: JwtAccessTokenPayloadDto) {
    await this.usersService.deleteById(data.sub);
  }
}
