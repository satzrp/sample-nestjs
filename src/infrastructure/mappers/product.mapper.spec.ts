import { Currency } from './../../domain/Currency';
import { Price } from './../../domain/Price';
import { Product } from './../../domain/Product';
import { Quantity } from './../../domain/Quantity';
import { ProductView } from '../api/product/product.dto';
import { productsToProductViews, productToProductView } from './product.mapper';

describe('ProductMapper', () => {
  const products: Product[] = [];
  products.push(
    new Product(
      '1',
      'Product One',
      'Product One Description',
      Price.of(10, Currency.INR),
      Quantity.of(10),
      new Date('12/12/2022'),
    ),
  );
  products.push(
    new Product(
      '2',
      'Product Two',
      'Product Two Description',
      Price.of(20, Currency.INR),
      Quantity.of(20),
      new Date('12/12/2022'),
    ),
  );
  it('productToProductView should return undefined if the input product is undefined', () => {
    expect(productToProductView(undefined)).toBeUndefined();
  });

  it('productToProductView should return product view for the given product', () => {
    const actual = productToProductView(products[0]);
    const expected = new ProductView();
    expected.name = 'Product One';
    expected.description = 'Product One Description';
    expected.price = '₹ 10';
    expected.quantity = '10 units';
    expected.expiryDate = 'Mon Dec 12 2022';
    expect(actual).toBeDefined();
    expect(actual).toBeInstanceOf(ProductView);
    expect(actual).toStrictEqual(expected);
  });

  it('productsToProductViews should return undefined if the input products is undefined', () => {
    expect(productsToProductViews(undefined)).toBeUndefined();
  });

  it('productsToProductViews should return product views for the given products', () => {
    const actual = productsToProductViews(products);
    expect(actual).toBeDefined();
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).toHaveLength(2);
  });
});
