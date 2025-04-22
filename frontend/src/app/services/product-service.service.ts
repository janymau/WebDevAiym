import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  is_active : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getProducts(brandName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}products/`, {
      params: { brand: brandName }
    });
  }
}