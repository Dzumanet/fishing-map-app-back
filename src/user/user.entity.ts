import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInterface } from '../types';
import {Fish} from "../fish/fish.entity";

@Entity()
export class User extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 60,
  })
  userName: string;

  @Column()
  pwdHash: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentTokenId: string | null;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'float',
    precision: 8,
    scale: 6,
  })
  mainFishingSpotLat: number;

  @Column({
    type: 'float',
    precision: 8,
    scale: 6,
  })
  mainFishingSpotLon: number;

  @OneToMany(type => Fish, fish => fish.user)
  fish: Fish[];
}
