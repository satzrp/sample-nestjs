import { Test, TestingModule } from '@nestjs/testing';
import { IProductStore } from './../../domain/spi/IProductStore';
import { ProductStore } from './product.store';

describe('ProductStore', () => {
  let productStore: IProductStore;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: IProductStore,
          useClass: ProductStore,
        },
      ],
    }).compile();
    productStore = app.get<IProductStore>(IProductStore);
  });

  describe('root', () => {
    it('product store should be defined', () => {
      expect(productStore).toBeDefined();
    });
    it('fetchAvailableProducts method should return all the available products', () => {
      const allProducts = productStore.fetchAvailableProducts();
      expect(allProducts).toBeDefined();
      expect(Array.isArray(allProducts)).toBe(true);
      expect(allProducts).toHaveLength(5);
    });
  });
});
