import { Test, TestingModule } from '@nestjs/testing';
import { FindByNameController } from './findByName.controller';

describe('FindByNameController', () => {
  let controller: FindByNameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FindByNameController],
    }).compile();

    controller = module.get<FindByNameController>(FindByNameController);
  });

  it('should be defined', async () => {
    const req: any = {};
    req.body = { name: 'charmander' };
    await controller.findByName(req);
  });
});
