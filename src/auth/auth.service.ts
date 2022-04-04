import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthHelper } from './helpers/auth.helper';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly authHelper: AuthHelper,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && this.authHelper.matchPassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(data) {
    const { password, email, username } = data;
    const hash = this.authHelper.hashPassword(password);
    return this.usersService.addUser({
      email,
      password: hash,
      role: 'admin',
      username,
    });
  }

  async updatePassword(data) {
    const { password, newPassword, email } = data;
    const user = await this.usersService.findByEmail(email);
    if (user && this.authHelper.matchPassword(password, user.password)) {
      const hash = this.authHelper.hashPassword(newPassword);
      return this.usersService.updateUser({
        email: user.email,
        password: hash,
        role: user.role,
        username: user.username,
      });
    } else {
      throw new HttpException(
        'Credentials not correct.',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
