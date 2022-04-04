import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { jwtConstants } from '../dto/constant';

@Injectable()
export class AuthHelper {
  constructor() {}

  hashPassword(pass: string, rounds = jwtConstants.passwordHashingRound) {
    return bcrypt.hashSync(pass, rounds);
  }

  matchPassword(pass: string, hash: string, round = 10) {
    return bcrypt.compareSync(pass, hash);
  }
}
