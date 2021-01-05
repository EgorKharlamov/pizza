import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export default class UserOrm extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 30 })
  email: string;
  @Column({ type: 'varchar', length: 80 })
  password: string;
  @Column({ type: 'int', default: 0 })
  balance: number;
  @Column({ type: 'varchar', length: 20, default: '' })
  name?: string;
  @Column({ type: 'simple-json', default: null })
  address?: string;
  @Column({ type: 'datetime' })
  date_register: Date;
  @Column({ type: 'datetime', nullable: true, default: null })
  date_modify: Date;
}
