import { Controller, Get, HostParam, Inject, Param, Redirect } from "@nestjs/common";
import { GetListOfProductsResponse } from "../interfaces/shop-item";
import { ShopService } from "./shop.service";

@Controller({
    path: 'shop',
    host: ':name.lvh.me',
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
    getListOfProducts(): GetListOfProductsResponse {
        return this.shopService.getProducts();
    }

    @Get("/welcome")
    welcome(
      @HostParam("name") siteName: string
    ):string {
        return `Witaj na sklepie ${siteName}!`
    };
}
