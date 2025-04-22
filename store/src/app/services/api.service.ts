import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  count: number;
  is_active: boolean;
  likes: number;
  category: number;
}

export interface Category {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.BASE_URL}/categories/`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/products/`);
  }

  getProductsByCategory(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.BASE_URL}/categories/${id}/products/`);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/products/${id}/`);
  }

  likeProduct(product: Product): Observable<Product> {
    const updated = { ...product, likes: product.likes + 1 };
    return this.http.put<Product>(`${this.BASE_URL}/products/${product.id}/`, updated);
  }
}
