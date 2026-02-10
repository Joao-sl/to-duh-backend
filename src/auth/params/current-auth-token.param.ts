import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtAccessTokenPayloadDto } from '../dto/jwt-token-payload.dto';

export const CurrentAuthToken = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return request['tokenPayload'] as JwtAccessTokenPayloadDto;
  },
);
