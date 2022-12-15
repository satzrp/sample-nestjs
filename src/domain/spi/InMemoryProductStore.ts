import { Currency } from '../Currency';
import { Price } from '../Price';
import { Product } from '../Product';
import { Quantity } from '../Quantity';
import { IProductStore } from './IProductStore';
import { products } from './products';

export class InMemoryProductStore implements IProductStore {
  private readonly _allProducts: Product[] = [];

  constructor() {
    products.forEach((product) => {
      this._allProducts.push(
        new Product(
          product.id,
          product.name,
          product.description,
          Price.of(product.price, Currency.INR),
          Quantity.of(product.quantity),
          new Date(product.expiryDate),
        ),
      );
    });
  }

  fetchAvailableProducts(): Product[] {
    return this._allProducts;
  }
}
