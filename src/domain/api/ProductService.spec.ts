import { Currency } from '../Currency';
import { Price } from '../Price';
import { Product } from '../Product';
import { InMemoryProductStore } from '../spi/InMemoryProductStore';
import { ProductService } from './ProductService';

describe('ProductService', () => {
  const productStore = new InMemoryProductStore();
  const productService = new ProductService(productStore);

  it('findProductById should return undefined if product does not exist', () => {
    expect(productService.findProductById('10')).toBeUndefined();
  });

  it('findProductById should return the product if product does exist', () => {
    const actual = productService.findProductById('1');
    expect(actual).toBeDefined();
    expect(actual).toBeInstanceOf(Product);
    expect(actual.id).toBe('1');
    expect(actual.name).toBe('Product One');
    expect(actual.description).toStrictEqual('Product One Description');
    expect(actual.price).toStrictEqual(Price.of(10.0, Currency.INR));
  });

  it('findAvailableProducts should return the all the products', () => {
    const actual = productService.findAvailableProducts();
    expect(actual).toBeDefined();
    expect(actual).toHaveLength(5);
  });

  it('findExpiredProducts should return the all the expired products', () => {
    const actual = productService.findExpiredProducts();
    expect(actual).toBeDefined();
    expect(actual).toHaveLength(2);
  });
});
