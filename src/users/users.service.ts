import { DatabaseError } from 'pg';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

type ThrowErrorType = 'unauthorized' | 'forbidden' | 'badRequest' | 'notFound';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  private throwError(
    type: ThrowErrorType = 'notFound',
    errorMsg: string = 'User not found',
  ) {
    switch (type) {
      case 'unauthorized':
        return new UnauthorizedException(errorMsg);

      case 'forbidden':
        return new ForbiddenException(errorMsg);

      case 'badRequest':
        return new BadRequestException(errorMsg);

      case 'notFound':
        return new NotFoundException(errorMsg);

      default:
        return new NotFoundException(errorMsg);
    }
  }

  async findOneById(id: number, errorType?: ThrowErrorType, errorMsg?: string) {
    const user = await this.userRepo.findOneBy({
      id: id,
      is_active: true,
    });

    if (!user) throw this.throwError(errorType, errorMsg);
    return user;
  }

  async findOneByEmail(
    email: string,
    errorType?: ThrowErrorType,
    errorMsg?: string,
  ) {
    const user = await this.userRepo.findOneBy({
      email: email,
      is_active: true,
    });

    if (!user) throw this.throwError(errorType, errorMsg);
    return user;
  }

  async create(data: CreateUserDto) {
    try {
      const newUserData = this.userRepo.create(data);
      const user = await this.userRepo.save(newUserData);

      return user;
    } catch (error) {
      const dbError = error as DatabaseError;

      if (dbError.code === '23505') {
        throw new ConflictException({
          message: 'Email already in use',
          errors: { email: ['Email already in use'] },
        });
      }

      throw new InternalServerErrorException();
    }
  }

  async save(entity: User) {
    const user = await this.userRepo.save(entity);
    return user;
  }

  async deleteById(id: number, errorType?: ThrowErrorType, errorMsg?: string) {
    const user = await this.findOneById(id, errorType, errorMsg);
    await this.userRepo.remove(user);
  }
}
