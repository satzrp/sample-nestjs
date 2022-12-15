import { Currency, CurrencyMismatchError } from './Currency';
import { Price, PriceNotValidError } from './Price';

describe('Price', () => {
  it('price value cannot be undefined', () => {
    expect(() => Price.of(undefined, Currency.INR)).toThrow('Invalid Price');
    expect(() => Price.of(undefined, Currency.INR)).toThrowError(
      PriceNotValidError,
    );
  });

  it('currency value cannot be undefined', () => {
    expect(() => Price.of(10.0, undefined)).toThrow('Invalid Price');
    expect(() => Price.of(20.0, undefined)).toThrowError(PriceNotValidError);
  });

  it('of should return Price object', () => {
    const amount = Price.of(10, Currency.INR);
    expect(amount.value).toBe(10);
    expect(amount.currency).toBe(Currency.INR);
  });

  it('valueWithCurrency method should return Price in readable format', () => {
    const amount = Price.of(10, Currency.INR);
    const expected = '₹ 10';
    expect(amount.valueWithCurrency()).toBe(expected);
  });

  it('time method should return new Price multipled by factor', () => {
    const amount = Price.of(10, Currency.INR);
    const expected = Price.of(40, Currency.INR);
    const newAmount = amount.times(4);
    expect(newAmount).toStrictEqual(expected);
    expect(newAmount.currency).toBe(amount.currency);
  });

  it('add method should throw an error if currencies do not match', () => {
    const amountOne = Price.of(10, Currency.INR);
    const amountTwo = Price.of(10, Currency.USD);
    expect(() => amountOne.add(amountTwo)).toThrowError(CurrencyMismatchError);
    expect(() => amountOne.add(amountTwo)).toThrow('Currencies do not match');
  });

  it('add method should return new Price', () => {
    const amountOne = Price.of(10, Currency.INR);
    const amountTwo = Price.of(20, Currency.INR);
    const expected = Price.of(30, Currency.INR);
    const newAmount = amountOne.add(amountTwo);
    expect(newAmount).toStrictEqual(expected);
    expect(newAmount.currency).toBe(amountOne.currency);
  });
});
