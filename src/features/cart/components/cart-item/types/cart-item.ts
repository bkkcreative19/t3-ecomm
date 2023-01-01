import { ProductTypes } from "../../../../product/types/product";

export type CartItemTypes = ProductTypes & {
  qty: number;
};
