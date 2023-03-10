export class QuantityValueError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class Quantity {
  private readonly _value: number;
  private constructor(value: number) {
    if (value === undefined || value < 0) {
      throw new QuantityValueError('Invalid Quantity');
    }
    this._value = value;
  }

  static of(value: number): Quantity {
    return new Quantity(value);
  }

  public get value(): number {
    return this._value;
  }

  public valueWithUnits(): string {
    return this._value + ' units';
  }
}
