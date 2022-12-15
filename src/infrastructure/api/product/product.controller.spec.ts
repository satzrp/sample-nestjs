import { Test, TestingModule } from '@nestjs/testing';
import { IProductService } from './../../../domain/api/IProductService';
import { IProductStore } from './../../../domain/spi/IProductStore';
import { ProductStore } from './../../../infrastructure/store/product.store';
import { ProductController } from './product.controller';
import { ProductView } from './product.dto';
import { ProductService } from './product.service';

const productStore = new ProductStore();
const productService = new ProductService(productStore);

describe('ProductController', () => {
  let productController: ProductController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        {
          provide: IProductService,
          useValue: productService,
        },
        {
          provide: IProductStore,
          useClass: ProductStore,
        },
      ],
    }).compile();

    productController = app.get<ProductController>(ProductController);
  });

  describe('root', () => {
    it('productController should be defined', () => {
      expect(productController).toBeDefined();
    });

    it('findProductById should return product view for the given id', () => {
      const actual = productController.findProductById('1');
      const expected = new ProductView();
      expected.name = 'Product One';
      expected.description = 'Product One Description';
      expected.price = '₹ 10';
      expected.quantity = '10 units';
      expected.expiryDate = 'Mon Dec 12 2022';
      expect(actual).toBeDefined();
      expect(actual).toStrictEqual(expected);
    });

    it('findProductById should return undefined if product id does not exist', () => {
      const actual = productController.findProductById('10');
      expect(actual).toBeUndefined();
    });

    it('findAvailableProducts should return all the expired products if the expired flag is true', () => {
      const actual = productController.findAvailableProducts('true');
      expect(actual).toBeDefined();
      expect(actual).toHaveLength(2);
    });

    it('findAvailableProducts should return all the products if the expired flag is false', () => {
      const actual = productController.findAvailableProducts('false');
      expect(actual).toBeDefined();
      expect(actual).toHaveLength(5);
    });

    it('findAvailableProducts should return all the products if no flag is passed', () => {
      const actual = productController.findAvailableProducts(undefined);
      expect(actual).toBeDefined();
      expect(actual).toHaveLength(5);
    });
  });
});
