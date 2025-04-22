import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  originalPrice: number;
  discountedPrice?: number;
  isNew: boolean;
  imageUrl: string;
  category?: string;
}

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Тушитель для свечей',
      brand: 'DOLCE&GABBANA',
      description: 'Самый защите',
      originalPrice: 34200,
      discountedPrice: 30780,
      isNew: true,
      imageUrl: 'assets/new11.jpeg'
    },
    {
      id: 2,
      name: 'Холодильный для косметики',
      brand: 'KITPORT',
      description: 'Собителей FRIDDE KIT 318-3',
      originalPrice: 28790,
      isNew: true,
      imageUrl: 'assets/new22.jpeg'
    },
    {
      id: 3,
      name: 'Концентрированный форм для ухода',
      brand: 'SHISEIDO',
      description: 'Вечерная сокета',
      originalPrice: 59200,
      discountedPrice: 38480,
      isNew: true,
      imageUrl: 'assets/new33.jpeg'
    },
    {
      id: 4,
      name: 'Joen для тела',
      brand: 'LOGIN FOREST',
      description: 'Citruile liberty cream ball flop the jill boot soother',
      originalPrice: 15500,
      discountedPrice: 11475,
      isNew: true,
      imageUrl: 'assets/new44.jpeg'
    }
  ];

  sortOptions: string[] = [
    'По популярности',
    'По возрастанию цены',
    'По убыванию цены',
    'По новизне'
  ];
  selectedSort: string = this.sortOptions[0];

  // Метод сортировки
  sortProducts() {
    if (this.selectedSort === 'По возрастанию цены') {
      this.products.sort((a, b) => {
        return (a.discountedPrice || a.originalPrice) - (b.discountedPrice || b.originalPrice);
      });
    } else if (this.selectedSort === 'По убыванию цены') {
      this.products.sort((a, b) => {
        return (b.discountedPrice || b.originalPrice) - (a.discountedPrice || a.originalPrice);
      });
    } else if (this.selectedSort === 'По новизне') {
      // Сортировка по новизне: обратный порядок
      this.products.reverse();
    }
  }
  
  ngOnChanges() {
    this.sortProducts();
  }
}
