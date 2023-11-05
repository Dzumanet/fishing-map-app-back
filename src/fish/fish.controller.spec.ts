import { Test, TestingModule } from '@nestjs/testing';
import { FishController } from './fish.controller';

describe('FishController', () => {
  let controller: FishController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FishController],
    }).compile();

    controller = module.get<FishController>(FishController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
