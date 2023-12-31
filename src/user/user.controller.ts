import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterUserResponse, UserInterface } from '../types';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Post('/register')
  registerUser(
    @Body() newUser: RegisterUserDto,
    @Res() res: Response,
  ): Promise<RegisterUserResponse | Response> {
    return this.userService.registerUser(newUser, res);
  }

  @Get('/:id')
  getOneFish(@Param('id') id: string): Promise<UserInterface> {
    return this.userService.getOneUser(id);
  }
}
