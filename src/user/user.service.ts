import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from 'src/auth/dto/SignupDto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  findByEmail(email) {
    return this.userModel.findOne({ email }).lean();
  }

  addUser(user: SignupDto) {
    return this.userModel.create(user);
  }

  updateUser(user) {
    return this.userModel.findOneAndUpdate({ email: user.email }, user);
  }
}
