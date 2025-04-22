import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Добавляем импорт
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true, // Если используете standalone компоненты
  imports: [CommonModule,RouterModule] // Добавляем CommonModule в imports
})
export class HomeComponent implements OnInit {
  showCookies = true;

  ngOnInit() {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      this.showCookies = false;
    }
  }

  acceptCookies() {
    this.showCookies = false;
    localStorage.setItem('cookiesAccepted', 'true');
  }
}