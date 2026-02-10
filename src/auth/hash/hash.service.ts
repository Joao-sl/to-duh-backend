import bcrypt from 'bcryptjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  async generateHash(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async compareHash(password: string, passwordHash: string) {
    return await bcrypt.compare(password, passwordHash);
  }
}
