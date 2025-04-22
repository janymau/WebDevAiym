import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../services/product-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rad-page',
  imports: [CommonModule, FormsModule],
  templateUrl: './rad-page.component.html',
  styleUrl: './rad-page.component.css'
})
export class RadPageComponent implements OnInit {
  products: any[] = [];
  isLoading = true;
  error: string | null = null
  constructor(private service : ProductServiceService){}
  ngOnInit(): void {
    this.loadRadProducts();
  }

  loadRadProducts(): void {
    this.isLoading = true;
    this.error = null;
    
    this.service.getProducts('Rad').subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }
  



}
