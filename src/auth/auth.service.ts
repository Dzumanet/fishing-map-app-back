import {Injectable} from '@nestjs/common';
import {Response} from 'express';
import {User} from '../user/user.entity';
import {v4 as uuid} from 'uuid';
import {sign} from 'jsonwebtoken';
import {JwtPayload} from "./jwt.strategy";
import {AuthLoginDto} from "./dto/auth-login.dto";
import {hashPwd} from "../utils/hash-pwd";



@Injectable()
export class AuthService {
    private createToken(currentTokenId: string): {
        accessToken: string;
        expiresIn: number;
    } {
        const payload: JwtPayload = {id: currentTokenId};
        const expiresIn = 60 * 60 * 24;
        const accessToken = sign(payload, process.env.JWT_KEY, {expiresIn});

        return {
            accessToken,
            expiresIn,
        };
    }

    private async generateToken(user: User): Promise<string> {
        let token: string;
        let userWithThisToken = null;
        do {
            token = uuid();
            userWithThisToken = await User.findOne({
                where: {currentTokenId: token},
            });
        } while (!!userWithThisToken);
        user.currentTokenId = token;
        await user.save();

        return token;
    }

    async login(req: AuthLoginDto, res: Response): Promise<any> {
        try {
            const user = await User.findOne({
                where: {
                    userName: req.userName,
                    pwdHash: hashPwd(req.pwd),
                },
            });

            if (!user) {
                return res.json({
                    loggedIn: false,
                });
            }

            const token = await this.createToken(await this.generateToken(user));

            return res
                .cookie('jwt', token.accessToken, {
                    secure: false,
                    domain: 'localhost',
                    httpOnly: true,
                })
                .json({
                    loggedIn: true,
                    userId: user.id,
                    loggedUser: user.userName,
                });
        } catch (e) {
            return res.json({error: e.message});
        }
    }

    async logout(user: User, res: Response) {
        try {
            user.currentTokenId = null;
            await user.save();
            res.clearCookie('jwt', {
                secure: false,
                domain: 'localhost',
                httpOnly: true,
            });
            return res.json({loggedIn: false});
        } catch (e) {
            return res.json({error: e.message});
        }
    }
}
