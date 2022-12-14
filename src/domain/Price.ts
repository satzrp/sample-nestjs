import { Currency } from './Currency';
import { CurrencyMismatchError } from './Currency';

export class PriceNotValidError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class Price {
  private readonly _value: number;
  private readonly _currency: Currency;

  constructor(value: number, currency: Currency) {
    if (value === undefined || currency === undefined) {
      throw new PriceNotValidError('Invalid Price');
    }
    this._value = value;
    this._currency = currency;
  }

  static of(value: number, currency: Currency): Price {
    return new Price(value, currency);
  }

  public get value(): number {
    return this._value;
  }

  public get currency(): Currency {
    return this._currency;
  }

  public valueWithCurrency(): string {
    return this._currency + ' ' + this._value;
  }

  public add(other: Price): Price {
    if (this._currency !== other._currency) {
      throw new CurrencyMismatchError('Currencies do not match');
    }
    return new Price(this._value + other._value, this._currency);
  }

  public times(factor: number): Price {
    return new Price(this._value * factor, this._currency);
  }
}
