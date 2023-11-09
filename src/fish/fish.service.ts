import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Fish } from './fish.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import {
  CreateFishResponse,
  GetListOfFishResponse,
  RegisterUserResponse,
} from '../types';
import { CreateFishDto } from './dto/fish.dto';

@Injectable()
export class FishService {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
  ) {}

  async getFish(): Promise<GetListOfFishResponse> {
    return await Fish.find();
  }

  async addFish(
    createFish: CreateFishDto,
    user: User,
  ): Promise<CreateFishResponse> {
    const { fishName, weight, lat, lon } = createFish;

    if (
      typeof fishName !== 'string' ||
      typeof weight !== 'number' ||
      fishName === '' ||
      weight <= 0 ||
      typeof lat !== 'number' ||
      typeof lon !== 'number'
    ) {
      throw new BadRequestException('Invalid fish data!');
    }

    const newFish = new Fish();

    newFish.fishName = createFish.fishName;
    newFish.weight = createFish.weight;
    newFish.description = createFish.description;
    newFish.catchDateTime = createFish.catchDateTime;
    newFish.lat = createFish.lat;
    newFish.lon = createFish.lon;

    await newFish.save();

    newFish.user = user;

    await newFish.save();

    return {
      success: true,
      fish: newFish,
    };
  }

  async findOneFish(id: string): Promise<Fish> {
    const fish = await Fish.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!fish) {
      throw new NotFoundException('Fish not found');
    }
    fish.user.pwdHash = undefined;
    fish.user.currentTokenId = undefined;

    fish.catchDateTime = new Date(fish.catchDateTime);

    return fish;
  }

  async findAllFish(fishName: string): Promise<Fish> {
    return await Fish.findOne({
      where: { fishName },
    });
  }

  async deleteFish(id: string) {
    await Fish.delete(id);
  }

  async updateFish(id: string, updateFish: CreateFishDto): Promise<CreateFishResponse> {
    const { fishName, weight, lat, lon } = updateFish;
    const fish = await Fish.findOneOrFail({
      where: { id },
    });

    if (!fish) {
      throw new NotFoundException('Fish not found!');
    }

    if (
      typeof fishName !== 'string' ||
      typeof weight !== 'number' ||
      fishName === '' ||
      weight <= 0 ||
      typeof lat !== 'number' ||
      typeof lon !== 'number'
    ) {
      throw new BadRequestException('Invalid fish data!');
    }

    fish.fishName = updateFish.fishName;
    fish.weight = updateFish.weight;
    fish.description = updateFish.description;
    fish.catchDateTime = updateFish.catchDateTime;
    fish.lat = updateFish.lat;
    fish.lon = updateFish.lon;

    await fish.save();
    return {
      success: true,
      fish,
    };
  }

  async getUserFish(userId: string): Promise<Fish[]> {
    const user: RegisterUserResponse =
      await this.userService.getOneUser(userId);
    return Fish.find({
      where: { user },
    });
  }
}
