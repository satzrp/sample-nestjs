import { Product } from '../Product';
import { IProductStore } from '../spi/IProductStore';
import { IProductService } from './IProductService';

export class ProductService implements IProductService {
  constructor(private readonly productStore: IProductStore) {}

  findExpiredProducts(): Product[] {
    return this.productStore
      .fetchAvailableProducts()
      .filter((product) => product.isExpired());
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
