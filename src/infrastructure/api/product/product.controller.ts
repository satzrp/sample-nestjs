import {
  Controller,
  Get,
  Inject,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { IProductService } from './../../../domain/api/IProductService';
import {
  productsToProductViews,
  productToProductView,
} from './../../mappers/product.mapper';
import { NotFoundInterceptor } from '../interceptors/not.found.interceptor';
import { ProductView } from './product.dto';
// import { ProductService } from './product.service';

@Controller('products')
@UseInterceptors(NotFoundInterceptor)
export class ProductController {
  constructor(
    @Inject(IProductService) private readonly productService: IProductService,
  ) {}

  @Get()
  findAvailableProducts(@Query('expired') expired: string): ProductView[] {
    const flag = expired ? JSON.parse(expired) : false;
    const products = flag
      ? this.productService.findExpiredProducts()
      : this.productService.findAvailableProducts();
    return productsToProductViews(products);
  }

  @Get(':productId')
  findProductById(@Param('productId') productId: string): ProductView {
    const product = this.productService.findProductById(productId);
    return productToProductView(product);
  }
}
