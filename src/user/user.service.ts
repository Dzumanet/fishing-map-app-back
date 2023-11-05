import {Injectable} from '@nestjs/common';
import {RegisterUserDto} from "./dto/register-user.dto";
import {RegisterUserResponse} from "../types";
import {User} from "./user.entity";
import {Response} from 'express';

@Injectable()
export class UserService {

    async registerUser(newUser: RegisterUserDto, res: Response): Promise<RegisterUserResponse | Response> {
        try {

            if (newUser.userName.length < 3) {
                return res.json({invalidLength: true});
            }

            const checkUser = await User.findOne({
                where: {userName: newUser.userName}
            })

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
                accountCreated: true
            })

        } catch (err) {
            console.log(err)
            return res.sendStatus(500);

        }

    }

    async getOneUser(id: string): Promise<User> {
        return await User.findOne({where: {id}})

    }

}
