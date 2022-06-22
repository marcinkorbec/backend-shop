export interface ShopItem {
    name: string;
    description: string;
    priceNet: number;
}

export type GetListOfProductsResponse = ShopItem[];
export type GetOneProductResponse = ShopItem;