import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {FishInterface} from "../types";
import {User} from "../user/user.entity";

@Entity()
export class Fish extends BaseEntity implements FishInterface {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 100,
    })
    fishName: string;

    @Column()
    weight: number;

    @Column({
        length: 1000,
    })
    description: string;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    catchDateTime: Date;

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