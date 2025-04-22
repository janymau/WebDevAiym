import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface GiftProduct {
  brand: string;
  name: string;
  type: string;
  isNew?: boolean;
  price: number;
  oldPrice?: number;
  image: string;
}

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gifts.component.html',
  styleUrls: ['./gifts.component.css']
})
export class GiftsComponent {
  gifts: GiftProduct[] = [
    {
      brand: 'PUPA',
      name: 'ПОДАРОЧНЫЙ НАБОР',
      type: 'HAPPY BOX KIT 2',
      isNew: true,
      oldPrice: 16700,
      price: 11690,
      image: 'assets/gift1.webp'

    },
    {
      brand: 'EVA MOSAIC',
      name: 'НАБОР ДЛЯ УХОДА ЗА РУКАМИ И НОГАМИ',
      type: 'SET XI',
      isNew: true,
      oldPrice: 5860,
      price: 4102,
      image: 'assets/gift2.webp'
    },
    {
      brand: 'DKNY',
      name: 'ПОДАРОЧНЫЙ НАБОР',
      type: 'BE DELICIOUS',
      isNew: true,
      oldPrice: 38600,
      price: 27020,
      image: 'assets/gift3.webp'
    },
    {
      brand: 'PRINCESSE MARINA DE BOURBON',
      name: 'ПОДАРОЧНЫЙ НАБОР',
      type: 'SYMBOL FOR A LADY GIFT SET',
      isNew: true,
      oldPrice: 58500,
      price: 35100,
      image: 'assets/gift4.webp'
    }
  ];
}
