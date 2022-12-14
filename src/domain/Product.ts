import { Price } from './Price';
import { Quantity } from './Quantity';

export class InvalidProductError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class Product {
  private _id: string;
  private _name: string;
  private _description: string;
  private _price: Price;
  private _quantity: Quantity;
  private _expiryDate: Date;
  constructor(
    id: string,
    name: string,
    description: string,
    price: Price,
    quantity: Quantity,
    expiryDate: Date,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._price = price;
    this._quantity = quantity;
    this._expiryDate = expiryDate;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get description(): string {
    return this._description;
  }

  public get price(): Price {
    return this._price;
  }

  public get quantity(): Quantity {
    return this._quantity;
  }

  public get expiryDate(): Date {
    return this._expiryDate;
  }

  public isAvailable(): boolean {
    return this._quantity.value > 0;
  }

  public isExpired(): boolean {
    return this._expiryDate < new Date();
  }
}
