import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}
  async execute() {
    await this.insertNewProducts();
    return 'seed executed';
  }
  private async insertNewProducts() {
    await this.productService.deleteAllProducts();

    const products = initialData.products;
    const insertPromise = [];
    products.forEach((product) => {
      insertPromise.push(this.productService.create(product));
    });
    await Promise.all(insertPromise);
    return true;
  }
}
