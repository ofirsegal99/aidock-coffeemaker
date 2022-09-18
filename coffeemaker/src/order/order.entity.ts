import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  position: string;

  @Column()
  drink: string;

  @Column({ type: 'timestamp' })
  time: string;

  @Column({ type: 'boolean' })
  isSupplied: boolean;
}
