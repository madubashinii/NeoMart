import { Component } from '@angular/core';
import {Product} from '../../modules/product';
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {CommonModule} from '@angular/common';
import {environment} from '../../services/environment';

@Component({
  selector: 'app-category-page',
  standalone:true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent {
  categoryId: number = 0;
  products: Product[] = [];
  imageBaseUrl = environment.imageBaseUrl;
  
  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.categoryId = Number(this.route.snapshot.paramMap.get('categoryId'));
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.apiService.getProductByCategory(this.categoryId).subscribe((data) => {
      this.products = data;
    });
  }
}
