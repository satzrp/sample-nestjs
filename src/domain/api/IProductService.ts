import { Product } from '../Product';

export interface IProductService {
  findAvailableProducts(): Product[];
  findProductById(productId: string): Product | undefined;
  findExpiredProducts(): Product[];
}

export const IProductService = Symbol('IProductService');
