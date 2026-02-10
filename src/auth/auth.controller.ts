import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { JwtRefreshTokenDto } from './dto/jwt-refresh-token.dto';
import { ResponseUserDto } from 'src/users/dto/response-user.dto';
import { CurrentAuthToken } from './params/current-auth-token.param';
import { JwtAccessTokenPayloadDto } from './dto/jwt-token-payload.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  SerializeOptions,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SerializeOptions({ type: ResponseUserDto })
  @Get('me')
  async getUser(@CurrentAuthToken() tokenPayload: JwtAccessTokenPayloadDto) {
    return await this.authService.getUser(tokenPayload.sub);
  }

  @Public()
  @Post('refresh')
  refreshToken(@Body() data: JwtRefreshTokenDto) {
    return this.authService.refreshToken(data);
  }

  @Public()
  @Post('login')
  signIn(@Body() data: LoginDto) {
    return this.authService.signIn(data);
  }

  @Public()
  @SerializeOptions({ type: ResponseUserDto })
  @Post('register')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }

  @SerializeOptions({ type: ResponseUserDto })
  @Patch('update')
  update(
    @CurrentAuthToken() tokenPayload: JwtAccessTokenPayloadDto,
    @Body() data: UpdateUserDto,
  ) {
    return this.authService.update(tokenPayload, data);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('delete')
  deleteUser(@CurrentAuthToken() tokenPayload: JwtAccessTokenPayloadDto) {
    return this.authService.deleteUser(tokenPayload);
  }
}
