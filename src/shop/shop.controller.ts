import { Controller, Get, HostParam, Inject, Param, Redirect } from "@nestjs/common";
import {GetListOfProductsResponse} from "../interfaces/shop-item";
import { ShopService } from "./shop.service";
import {ShopItem} from "./shop-item.entity";

@Controller({
    path: 'shop',
    host: 'localhost',
})
export class ShopController {
    onApplicationBootstrap() {
        console.log('Załadowane');
    }

    onApplicationShutDown() {
        console.log('Apka zaraz zniknie!');
    }

    constructor(
      @Inject(ShopService) private shopService: ShopService
    ) {
    }

    @Get("/")
    getListOfProducts(): Promise<GetListOfProductsResponse> {
        return this.shopService.getProducts();
    }

    @Get("/:id")
    async getOneOfProducts(
        @Param('id') id: string
    ): Promise<ShopItem> {
        return await this.shopService.getProducts();
    }

}
