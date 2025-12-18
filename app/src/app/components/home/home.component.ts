import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ApiService} from '../../services/api.service';
import { environment } from '../../services/environment';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredProducts: any[] = [];
  imageBaseUrl = environment.imageBaseUrl;
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getFeaturedProducts().subscribe(
      (data) => {
        this.featuredProducts = data;
      },
      (error) => {
        this.errorMessage = 'Failed to load featured products.';
      }
    );
  }
}
