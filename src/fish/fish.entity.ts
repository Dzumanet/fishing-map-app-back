import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FishInterface } from '../types';
import { User } from '../user/user.entity';

@Entity()
export class Fish extends BaseEntity implements FishInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  fishName: string;

  @Column({
    type: 'smallint',
  })
  weight: number;

  @Column({
    type: 'smallint',
  })
  length: number;

  @Column({
    length: 1000,
    nullable: true,
  })
  description: string | null;

  @Column({
    nullable: true,
  })
  catchDateTime: Date | null;

  @Column({
    type: 'float',
    precision: 17,
    scale: 15,
  })
  lat: number;

  @Column({
    type: 'float',
    precision: 17,
    scale: 15,
  })
  lon: number;

  @ManyToOne(type => User, user => user.fish)
  user: User;
}
