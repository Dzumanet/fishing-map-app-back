import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FishService } from './fish.service';
import { CreateFishDto } from './dto/fish.dto';
import { Fish } from './fish.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from '../user/user.entity';
import {
  CreateFishResponse,
  FishInterface,
  GetListOfFishResponse,
} from '../types';

@Controller('fish')
export class FishController {
  constructor(@Inject(FishService) private fishService: FishService) {}

  @Get('/')
  getListOfFish(): Promise<GetListOfFishResponse> {
    return this.fishService.getFish();
  }

  @Get('/search')
  searchFish(@Query('fishName') fishName: string): Promise<FishInterface> {
    return this.fishService.findAllFish(fishName);
  }

  @Post('/add')
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createFish: CreateFishDto,
    @UserObj() user: User,
  ): Promise<CreateFishResponse> {
    return this.fishService.addFish(createFish, user);
  }

  @Get('/user-fish')
  @UseGuards(AuthGuard('jwt'))
  getUserFish(@Req() request): Promise<Fish[]> {
    const userId = request.user.id;
    return this.fishService.getUserFish(userId);
  }

  @Get('/one/:id')
  getOneFish(@Param('id') id: string): Promise<FishInterface> {
    return this.fishService.findOneFish(id);
  }

  @Patch('/edit/:id')
  @UseGuards(AuthGuard('jwt'))
  updateFish(
    @Param('id') id: string,
    @Body() updateFish: CreateFishDto,
  ): Promise<CreateFishResponse> {
    return this.fishService.updateFish(id, updateFish);
  }

  @Delete('/remove/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteFish(@Param('id') id: string) {
    return this.fishService.deleteFish(id);
  }
}
