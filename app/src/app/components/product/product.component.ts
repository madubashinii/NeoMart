import { Component } from '@angular/core';
import {Product} from '../../modules/product';
import {RouterLink} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {CommonModule} from '@angular/common';
import { Category } from '../../modules/category';
import { environment } from '../../services/environment';

@Component({
  selector: 'app-product',
  standalone:true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategory: number | null = null;
  imageBaseUrl = environment.imageBaseUrl;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe(products => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  filterByCategory(categoryId: number | null) {
    this.selectedCategory = categoryId;

    if (!categoryId) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        p => p.category.categoryId === categoryId
      );
    }
  }

}
