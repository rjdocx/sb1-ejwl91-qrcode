import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Currency } from './Currency';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  selectedCurrencyId: number;

  @ManyToMany(() => Currency, currency => currency.tenants)
  @JoinTable()
  currencies: Currency[];
}