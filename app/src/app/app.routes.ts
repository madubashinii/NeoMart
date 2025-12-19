import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PageNotFoundComponent} from './components/fixed/page-not-found/page-not-found.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {CartComponent} from './components/cart/cart.component';
import {LoginComponent} from './admin/login/login.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {CategoryPageComponent} from './components/category-page/category-page.component';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {ProductComponent} from './components/product/product.component';
import {RegisterComponent} from './admin/register/register.component';
import {AuthGuard} from './admin/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart', component: CartComponent , canActivate: [AuthGuard] },
  {path: 'checkout', component: CheckoutComponent , canActivate: [AuthGuard] },
  {path: 'dashboard', component: DashboardComponent},
  {path: 'category/:categoryId', component: CategoryPageComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'product', component: ProductComponent},
  {path: '**', component: PageNotFoundComponent},
];
