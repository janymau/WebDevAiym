import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component'; // Импорт компонента для продуктов
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';
import { SalesComponent } from './sales/sales.component';
import { GiftsComponent } from './gifts/gifts.component';
import { RadPageComponent } from './rad-page/rad-page.component';

// Настройка маршрутов
export const appRoutes: Routes = [
{ path: '', component: HomeComponent }, 
{ path: 'rad', component: RadPageComponent },
  { path: '', redirectTo: '/category/home', pathMatch: 'full' },  // Перенаправление на категорию "Shoes" по умолчанию
  { path: 'category/:id', component: ProductListComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: '', component: HomeComponent },
  { path: 'brands', component: BrandsComponent },
  { path: 'new-arrivals', component: NewArrivalsComponent },
  { path: 'sales', component: SalesComponent },
  { path: 'gifts', component: GiftsComponent },
  { path: '**', redirectTo: '' },
 // Страница с продуктами для выбранной категории
];
