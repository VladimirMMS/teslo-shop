import { Product } from '../../products/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  email: string;
  @Column('text', {
    select: false,
  })
  password: string;
  @Column('text')
  fullName: string;
  @Column('boolean', {
    default: true,
  })
  isActive: string;
  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];
  @OneToMany(() => Product, (product) => product.user)
  product: Product;
  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
  }
  @BeforeUpdate()
  checkFieldUpdate() {
    this.email = this.email.toLocaleLowerCase().trim();
  }
}
