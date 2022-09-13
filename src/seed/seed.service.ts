import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import { ProductsService } from '../products/products.service';
import { initialData } from './data/seed-data';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private readonly productService: ProductsService,
    @InjectRepository(User) private readonly userRepostitory: Repository<User>,
  ) {}
  async execute() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();
    await this.insertNewProducts(adminUser);
    return 'seed executed';
  }
  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];

    seedUsers.forEach(({ password, ...rest }) => {
      users.push(
        this.userRepostitory.create({
          ...rest,
          password: bcrypt.hashSync(password, 10),
        }),
      );
    });
    const dbUsers = await this.userRepostitory.save(seedUsers);
    return dbUsers[0];
  }
  private async deleteTables() {
    await this.productService.deleteAllProducts();
    const queryBuilder = this.userRepostitory.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }
  private async insertNewProducts(user: User) {
    await this.productService.deleteAllProducts();

    const products = initialData.products;
    const insertPromise = [];
    products.forEach((product) => {
      insertPromise.push(this.productService.create(product, user));
    });
    await Promise.all(insertPromise);
    return true;
  }
}
