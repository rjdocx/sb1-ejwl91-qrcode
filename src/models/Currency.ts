import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Tenant } from './Tenant';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  symbol: string;

  @ManyToMany(() => Tenant, tenant => tenant.currencies)
  tenants: Tenant[];
}