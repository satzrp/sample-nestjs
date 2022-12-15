import { Currency } from './Currency';
import { Price } from './Price';
import { InvalidProductError, Product } from './Product';
import { Quantity } from './Quantity';

describe('Product', () => {
  it('Product id cannot be undefined or empty', () => {
    expect(() => {
      new Product(
        '',
        'Product One',
        'Product One Description',
        Price.of(10, Currency.INR),
        Quantity.of(10),
        new Date(),
      );
    }).toThrowError(InvalidProductError);
  });

  it('Product name cannot be undefined or empty', () => {
    expect(() => {
      new Product(
        '1',
        '',
        'Product One Description',
        Price.of(10, Currency.INR),
        Quantity.of(10),
        new Date(),
      );
    }).toThrowError(InvalidProductError);
  });

  it('Product description cannot be undefined or empty', () => {
    expect(() => {
      new Product(
        '1',
        'Product One',
        '',
        Price.of(10, Currency.INR),
        Quantity.of(10),
        new Date(),
      );
    }).toThrowError(InvalidProductError);
  });

  it('Product price cannot be undefined', () => {
    expect(() => {
      new Product(
        '1',
        'Product One',
        'Product One Description',
        undefined,
        Quantity.of(10),
        new Date(),
      );
    }).toThrowError(InvalidProductError);
  });

  it('Product quantity cannot be undefined', () => {
    expect(() => {
      new Product(
        '1',
        'Product One',
        'Product One Description',
        Price.of(10, Currency.INR),
        undefined,
        new Date(),
      );
    }).toThrowError(InvalidProductError);
  });

  it('Product expiry date cannot be undefined', () => {
    expect(() => {
      new Product(
        '1',
        'Product One',
        'Product One Description',
        Price.of(10, Currency.INR),
        Quantity.of(10),
        undefined,
      );
    }).toThrowError(InvalidProductError);
  });

  it('isAvailable should return true if value is greater than 0', () => {
    const productOne = new Product(
      '1',
      'Product One',
      'Product One Description',
      Price.of(10, Currency.INR),
      Quantity.of(10),
      new Date(),
    );
    expect(productOne.isAvailable()).toBe(true);
  });

  it('isAvailable should return false if value is 0', () => {
    const productOne = new Product(
      '1',
      'Product One',
      'Product One Description',
      Price.of(10, Currency.INR),
      Quantity.of(0),
      new Date(),
    );
    expect(productOne.isAvailable()).toBe(false);
  });

  it('isExpired should return true if expiry date is less than current date', () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const productOne = new Product(
      '1',
      'Product One',
      'Product One Description',
      Price.of(10, Currency.INR),
      Quantity.of(0),
      new Date(year, month, date - 1),
    );
    expect(productOne.isExpired()).toBe(true);
  });

  it('isExpired should return true if expiry date is greater than current date', () => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const productOne = new Product(
      '1',
      'Product One',
      'Product One Description',
      Price.of(10, Currency.INR),
      Quantity.of(0),
      new Date(year, month, date + 1),
    );
    expect(productOne.isExpired()).toBe(false);
  });
});
