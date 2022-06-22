import {Controller, Delete, Get, HostParam, Inject, Param, Post, Redirect} from "@nestjs/common";
import {CreateProductResponse, GetListOfProductsResponse} from "../interfaces/shop-item";
import {ShopService} from "./shop.service";
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
    async getListOfProducts(): Promise<GetListOfProductsResponse> {
        return await this.shopService.getProducts();
    }

    @Get("/:id")
    async getOneOfProducts(
        @Param('id') id: string
    ): Promise<ShopItem> {
        return await this.shopService.getOneProduct(id);
    }

    @Delete("/:id")
    async deleteOneOfProducts(
        @Param('id') id: string
    ) {
        return await this.shopService.deleteOneProducts(id);
    }

    @Post('/')
    async createNewProduct(
    ):Promise<CreateProductResponse> {
        return await this.shopService.crateProduct();
    }

    @Post('/')
    async addBoughtCounter(
    ):Promise<CreateProductResponse> {
        return await this.shopService.crateProduct();
    }
}
