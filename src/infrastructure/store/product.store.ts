import { Injectable } from '@nestjs/common';
import { Currency } from './../../domain/Currency';
import { Price } from './../../domain/Price';
import { Product } from './../../domain/Product';
import { Quantity } from './../../domain/Quantity';
import { IProductStore } from './../../domain/spi/IProductStore';
import { products } from './products';

@Injectable()
export class ProductStore implements IProductStore {
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
