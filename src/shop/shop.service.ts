import { forwardRef, Inject, Injectable } from "@nestjs/common";
import {CreateProductResponse, GetListOfProductsResponse, GetOneProductResponse} from "../interfaces/shop-item";
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


    async getOneProduct(id: string): Promise<ShopItem> {
        return await this.shopItemRespository.findOneOrFail({where: {id: id}});
    }

    async deleteOneProducts(id: string) {
        return await this.shopItemRespository.delete(id);
    }


    async crateProduct(): Promise<CreateProductResponse> {
        const product = new ShopItem()
        product.name = 'Czekolada';
        product.priceNet = 12.99
        product.description = 'Orzechowa'

        return await this.shopItemRespository.save(product);
    }

    async addBoughtCounter(id: string) {
        const item = await this.shopItemRespository.findOneOrFail({where: {id: id}});

        item.boughtCounter++;
        return await this.shopItemRespository.save(item);
    }
}
