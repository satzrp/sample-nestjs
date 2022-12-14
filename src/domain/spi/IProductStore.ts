import { Product } from '../Product';

export interface IProductStore {
  fetchAvailableProducts(): Product[];
}

export const IProductStore = Symbol('IProductStore');
