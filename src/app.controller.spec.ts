import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Application Health Status!"', () => {
      expect(appController.health()).toStrictEqual({
        status: 'OK',
        message: 'App is Up and Running',
      });
    });
    it('should return "Application Welcome Message"', () => {
      expect(appController.welcome()).toBe(
        'Sample Nest API using Hexagonal Architecture!',
      );
    });
  });
});
