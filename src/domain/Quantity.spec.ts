import { Quantity, QuantityValueError } from './Quantity';

describe('Quantity', () => {
  it('quantity value cannot be undefined', () => {
    expect(() => Quantity.of(undefined)).toThrow('Invalid Quantity');
    expect(() => Quantity.of(undefined)).toThrowError(QuantityValueError);
  });

  it('quantity value cannot be negative', () => {
    expect(() => Quantity.of(-10)).toThrow('Invalid Quantity');
    expect(() => Quantity.of(-10)).toThrowError(QuantityValueError);
  });

  it('of should return Quantity object', () => {
    const quantity = Quantity.of(10);
    expect(quantity.value).toBe(10);
  });
});
