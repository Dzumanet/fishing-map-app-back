import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserResponse } from '../types';
import { User } from './user.entity';
import { Response } from 'express';
import { hashPwd } from '../utils/hash-pwd';

@Injectable()
export class UserService {
  async registerUser(
    newUser: RegisterUserDto,
    res: Response,
  ): Promise<RegisterUserResponse | Response> {
    try {
      if (newUser.userName.length < 5) {
        return res.json({ invalidLoginLength: true });
      } else if (newUser.pwd.length < 5) {
        return res.json({ invalidPwdLength: true });
      }

      const checkUser = await User.findOne({
        where: { userName: newUser.userName },
      });

      if (checkUser) {
        return res.json({
          exists: true,
          accountCreated: false,
        });
      }

      const user = new User();
      user.userName = newUser.userName;
      user.pwdHash = hashPwd(newUser.pwd);

      await user.save();

      return res.json({
        accountCreated: true,
      });
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  }

  async getOneUser(id: string): Promise<User> {
    return await User.findOne({ where: { id } });
  }
}
