import { Product } from './../../domain/Product';
import { ProductView } from '../api/product/product.dto';

export const productToProductView = (product: Product): ProductView => {
  if (!product) return undefined;
  const productView = new ProductView();
  productView.name = product.name;
  productView.description = product.description;
  productView.price = product.price.valueWithCurrency();
  productView.quantity = product.quantity.valueWithUnits();
  productView.expiryDate = product.expiryDate.toDateString();
  return productView;
};

export const productsToProductViews = (products: Product[]): ProductView[] => {
  if (!products) return undefined;
  return products.map((product) => productToProductView(product));
};
