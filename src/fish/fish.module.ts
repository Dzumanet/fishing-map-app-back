import { Module } from '@nestjs/common';
import { FishController } from './fish.controller';
import { FishService } from './fish.service';
import {UserModule} from "../user/user.module";

@Module({
  imports: [UserModule],
  controllers: [FishController],
  providers: [FishService]
})
export class FishModule {}
