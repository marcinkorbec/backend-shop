import { AddProductDto } from "../basket/dto/add-product.dto";

export type AddProductToBasketResponse = {
    isSucces: true;
    index: number;
} | {
    isSucces: false;
}

export interface RemoveProductFromBasketResponse {
    isSucces: boolean;
}

export type ListProductsInBasketResponse = AddProductDto[];

export type GetTotalPriceResponse = number | {
    isSuccess: false;
    alternativeBasket: AddProductDto[];
};
