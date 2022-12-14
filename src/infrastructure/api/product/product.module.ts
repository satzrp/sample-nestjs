import { Module } from '@nestjs/common';
import { IProductService } from './../../../domain/api/IProductService';
import { ProductService } from './../../../domain/api/ProductService';
import { IProductStore } from './../../../domain/spi/IProductStore';
import { ProductStore } from './../../../infrastructure/store/product.store';
import { ProductController } from './product.controller';
// import { ProductService } from './product.service';

// we are missing the benefits of dependency injection provided by NestJs
// but, we prefer not to pollute the domain code with framework decorators.

const productStore = new ProductStore();
const productService = new ProductService(productStore);

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [
    {
      provide: IProductService,
      useValue: productService,
    },
    {
      provide: IProductStore,
      useClass: ProductStore,
    },
  ],
})
// @Module({
//   imports: [],
//   controllers: [ProductController],
//   providers: [
//     ProductService,
//     {
//       provide: IProductStore,
//       useClass: ProductStore,
//     },
//   ],
// })
export class ProductModule {}
