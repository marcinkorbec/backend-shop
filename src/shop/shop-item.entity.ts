import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class ShopItem extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 60,
    })
    name: string;

    @Column({
        type: "text",
        default: '',
    })
    description: string | null;

    @Column({
        type: "float",
        precision: 6,
        scale: 2,
    })
    priceNet: number;

    @Column({
        default: ()=> 'CURRENT_TIME'
    })
    createdAt: Date;

    @Column({
        type: "int",
        default: 0,
    })
    boughtCounter: number;

    @Column({
        default: false,
    })
    wasEverBought: boolean
}