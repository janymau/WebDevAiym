import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component'; 

interface Product {
  name: string;
  likes: number;
  image: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, FormsModule,RouterModule,HeaderComponent]
})
export class AppComponent {
  categories: string[] = ['Каталог'];
  selectedCategory: string | null = null;
  title = 'beautystore';
  

  constructor(public router: Router) {} 
  navigateToNewArrivals() {
    this.router.navigate(['/new-arrivals']);
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  private productData: Record<string, Product[]> = {
    'Каталог': [
      {
        name: 'Mizuno Wave Rider',
        likes: 0,
        image: 'https://resources.cdn-kaspi.kz/img/m/p/pbe/p61/6114184.jpeg?format=gallery-medium',
        description: 'Premium Japanese sneakers blending tradition and innovation for optimal performance.',
        link: 'https://kaspi.kz/shop/p/krossovki-mizuno-wave-rider-wave-rider-belyi-temno-sinii-43-129350048/?c=750000000'
      },
     
    ],
    
  };

  get products(): Product[] {
    return this.selectedCategory ? this.productData[this.selectedCategory] || [] : [];
  }


  removeProduct(productName: string) {
    if (!this.selectedCategory) return;
    this.productData[this.selectedCategory] = this.products.filter(p => p.name !== productName);
  }

  likeProduct(productName: string) {
    if (!this.selectedCategory) return;
    this.productData[this.selectedCategory] = this.products.map(p =>
      p.name === productName ? { ...p, likes: p.likes + 1 } : p
    );
  }

  shareOnWhatsApp(link: string) {
    window.open(`https://wa.me/?text=${encodeURIComponent(link)}`, '_blank');
  }
  selectCategory(category: string) {
    this.router.navigate(['/category', category]); // Переход на страницу с продуктами выбранной категории
  }

  getProductsForCategory(category: string): Product[] {
    return this.productData[category] || [];
  }

  navigateToBrands() {
    this.router.navigate(['/brands']);
  }
}









