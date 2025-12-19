import { Category } from './category';

export interface Product {
  id: bigint;
  productName: string;
  productBrand: string;
  productPrice: number;
  productImg1: string;
  color: string;
  productDetails: string;
  isFeatured:boolean;
  category: Category;
}
