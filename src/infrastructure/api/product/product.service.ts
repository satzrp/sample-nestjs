import { Inject, Injectable } from '@nestjs/common';
// import { IProductService } from 'src/domain/api/IProductService';
import { Product } from './../../../domain/Product';
import { IProductStore } from './../../../domain/spi/IProductStore';

@Injectable()
export class ProductService {
  constructor(
    @Inject(IProductStore) private readonly productStore: IProductStore,
  ) {}

  findExpiredProducts(): Product[] {
    return this.productStore.fetchAvailableProducts().filter((product) => {
      return product.isExpired();
    });
  }

  findProductById(productId: string): Product {
    return this.productStore
      .fetchAvailableProducts()
      .find((product) => product.id === productId);
  }

  findAvailableProducts(): Product[] {
    return this.productStore.fetchAvailableProducts();
  }
}
