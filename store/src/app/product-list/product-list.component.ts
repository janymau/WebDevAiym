import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

interface Product {
  name: string;
  likes: number;
  image: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [CommonModule]
})
export class ProductListComponent implements OnInit {
  category: string = '';
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params['id'];
      this.products = this.appComponent.getProductsForCategory(this.category);
    });
  }

  onRemove(productName: string) {
    this.appComponent.removeProduct(productName);
    this.products = this.appComponent.getProductsForCategory(this.category);
  }

  onLike(productName: string) {
    this.appComponent.likeProduct(productName);
    this.products = this.appComponent.getProductsForCategory(this.category);
  }

  shareOnWhatsApp(link: string) {
    this.appComponent.shareOnWhatsApp(link);
  }
}