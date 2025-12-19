import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../modules/product';
import {ApiService} from '../../services/api.service';
import {CommonModule, Location} from '@angular/common';
import {CartItem} from '../../modules/cart-item';
import {CartService} from '../../services/cart.service';
import { environment } from '../../services/environment';

@Component({
  selector: 'app-product-detail',
  standalone:true,
  imports: [
    CommonModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: Product | undefined;
  productId: number | undefined;
  cart: Product[] = [];
  imageBaseUrl = environment.imageBaseUrl;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location,
    private cartService: CartService, private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id')!);

    if (this.productId) {
      this.apiService.getProductById(this.productId).subscribe((product: Product) => {
        this.product = product;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  addToCart(product: Product) {
    if (this.product) {
      const cartItem: CartItem = {
        id: this.product.id,
        productName: this.product.productName,
        productPrice: this.product.productPrice,
        quantity: 1,
        productImg1: this.product.productImg1,
        productBrand:this.product.productBrand
      };

      this.cartService.addToCart(cartItem);
      this.router.navigate(['/cart']);
    }
  }
}
