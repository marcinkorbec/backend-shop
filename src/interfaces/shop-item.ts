export interface ShopItem {
    id: string;
    name: string;
    description: string;
    priceNet: number;
}

export type GetListOfProductsResponse = ShopItem[];
export type GetOneProductResponse = ShopItem;
export type CreateProductResponse = ShopItem;