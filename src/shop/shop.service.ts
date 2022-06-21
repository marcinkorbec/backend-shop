import { forwardRef, Inject, Injectable } from "@nestjs/common";
import {GetListOfProductsResponse} from "../interfaces/shop-item";
import { BasketService } from "../basket/basket.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ShopItem} from "./shop-item.entity";

@Injectable()
export class ShopService {

    constructor(
      @Inject(forwardRef(()=> BasketService)) private basketService: BasketService,
      @InjectRepository(ShopItem) private shopItemRespository: Repository<ShopItem>
    ) {
    }

    async getProducts(): Promise<GetListOfProductsResponse> {
        return await this.shopItemRespository.find();
    }

    async hasProduct(name: string): Promise<boolean> {
        return (await this.getProducts()).some(item => item.name === name);
    }

    async getPriceOfProduct(name: string): Promise<number> {
        return (await this.getProducts()).find(item=> item.name === name).priceNet;
    }

    async getOne(): Promise<ShopItem>

}
