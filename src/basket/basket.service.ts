import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AddProductDto } from "./dto/add-product.dto";
import {
    AddProductToBasketResponse, GetTotalPriceResponse,
    ListProductsInBasketResponse,
    RemoveProductFromBasketResponse
} from "../interfaces/basket";
import { ShopService } from "../shop/shop.service";

@Injectable()
export class BasketService {
    private items: AddProductDto[] = [];

    constructor(
      @Inject(forwardRef(() => ShopService)) private shopService: ShopService,
    ) {
    }

    getProductsFromBasket(): ListProductsInBasketResponse {
        return this.items;
    }

    addProductToBasket(item: AddProductDto): AddProductToBasketResponse {
        const { items } = this;
        const { name, quantity } = item;

        if (
          typeof name !== "string" ||
          typeof quantity !== "number" ||
          name === "" ||
          quantity < 1 ||
          !this.shopService.hasProduct(name)
        ) {
            return {
                isSucces: false
            };
        }

        this.items.push(item);

        return {
            isSucces: true,
            index: items.length - 1
        };
    }

    removeProductFromBasket(index: number): RemoveProductFromBasketResponse {
        const { items } = this;

        if (
          index < 0 ||
          index >= items.length
        ) {
            return {
                isSucces: false
            };
        }
        ;

        items.splice(index, 1);

        return {
            isSucces: true
        };
    }

    getTotalPriceOfBasket(): GetTotalPriceResponse {
        if(!this.items.every(item => this.shopService.hasProduct(item.name))) {

            const alternativeBasket = this.items.filter(item => this.shopService.hasProduct(item.name));

            return {
                isSuccess: false,
                alternativeBasket,
            };
        }

        return this.items
          .map(item=> this.shopService.getPriceOfProduct(item.name) * item.quantity * 1.23)
          .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }

    countPromo(): number {
        return this.getTotalPriceOfBasket() > 10 ? 1 : 0;
    }
}
