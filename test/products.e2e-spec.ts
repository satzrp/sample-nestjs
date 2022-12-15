import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ProductModule } from './../src/infrastructure/api/product/product.module';
import {
  AVAILABLE_PRODUCTS,
  EXPIRED_PRODUCTS,
  PRODUCT_NOT_FOUND,
  PRODUCT_ONE,
} from './products.data';

describe('ProductController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/products (GET)', () => {
    return request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect(AVAILABLE_PRODUCTS);
  });

  it('/products?expired=false (GET)', () => {
    return request(app.getHttpServer())
      .get('/products?expired=false')
      .expect(200)
      .expect(AVAILABLE_PRODUCTS);
  });

  it('/products?expired=true (GET)', () => {
    return request(app.getHttpServer())
      .get('/products?expired=true')
      .expect(200)
      .expect(EXPIRED_PRODUCTS);
  });

  it('/products/1 (GET)', () => {
    return request(app.getHttpServer())
      .get('/products/1')
      .expect(200)
      .expect(PRODUCT_ONE);
  });

  it('/products/10 (GET) - Not Found', () => {
    return request(app.getHttpServer())
      .get('/products/10')
      .expect(404)
      .expect(PRODUCT_NOT_FOUND);
  });
});
