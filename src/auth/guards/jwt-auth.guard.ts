import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import jwtConfig from '../config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { JwtAccessTokenPayloadDto } from '../dto/jwt-token-payload.dto';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigs: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Login is required');

    try {
      const payload: JwtAccessTokenPayloadDto =
        await this.jwtService.verifyAsync(token, this.jwtConfigs);

      request['tokenPayload'] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token or expired');
    }
    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers?.authorization;

    if (!token || typeof token !== 'string') {
      return undefined;
    }

    return token.split(' ')[1];
  }
}
