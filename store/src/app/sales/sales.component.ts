import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  selectedPromo: any = null;
  showModal = false;

  promotions = [
    {
      imageUrl: 'assets/sale1.jpg',
      title: 'День Влюбленных с BeautyStore!',
      details: {
        imageUrl: 'assets/sale1.jpg',
        description: `
          <h3>День Влюбленных с BeautyStore!</h3>
          <p>С 11 по 21 апреля скидки до -50% на весь ассортимент! Не упустите возможность выбрать идеальные подарки для себя и ваших близких.</p>
          
          <p>18-20 апреля в магазинах BeautyStore вас ждут:</p>
          <ul>
            <li>Бесплатный макияж за любую покупку — воплотите свой идеальный образ с помощью профессионалов!</li>
            <li>Фуршет и приятная музыка — прекрасное дополнение для праздничного настроения</li>
            <li>Погрузитесь в атмосферу праздника вместе с BeautyStore!</li>
          </ul>
          
          <p class="small-text">
            *Акция действует по всей сети<br>
            *Есть бренды-исключения<br>
            *Подробности уточняйте по номеру 77777<br>
            *Все детали о работе визажистов, времени фуршета и музыкальной программы узнавайте в магазинах BeautyStore вашего города.
          </p>
        `
      }
    },
    {
      imageUrl: 'assets/sale2.jpg',
      title: 'Дополнительная скидка -10%',
      details: {
        imageUrl: 'assets/sale2.jpg',
        description: `
          <h3>Промокод LOVE10!</h3>
          <p>Совершать покупки в BeautyStore еще приятней!</p>
          <p>С 16 по 21 апреля получайте дополнительную скидку -10% при оформлении заказа в интернет-магазине.</p>
          
          <h4>Как применить?</h4>
          <p>Введите промокод LOVE10 в корзине перед совершением оплаты</p>
          
          <p class="small-text">
            * Акция действует только в интернет-магазине<br>
            * Есть товары-исключения<br>
            * Подробности по номеру: 7405
          </p>
        `
      }
    },
    {
      imageUrl: 'assets/sale3.jpg',
      title: 'Super предложение для него и для нее!',
      details: {
        imageUrl: 'assets/sale3.jpg',
        description: `
          <h3>Специальное предложение на ароматы!</h3>
          <p>С 11 по 21 апреля Вы можете приобрести ароматы и подарочные наборы в магазинах BeautyStore со скидками от 40% до 70%!</p>
          
          <p>Акция действует:</p>
          <ul>
            <li>В интернет-магазине</li>
            <li>В сети магазинов</li>
          </ul>
          
          <p class="small-text">
            * Подробности уточняйте у консультантов<br>
            * Некоторые товары могут быть исключены из акции<br>
            * Количество товаров по акции ограничено
          </p>
        `
      }
    }
  ];

  openPromoDetails(promo: any) {
    this.selectedPromo = promo;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}