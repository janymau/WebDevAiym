import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  showCookies = true;
  constructor(private router: Router) {}
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
  goToRadPage() {
    this.router.navigate(['/rad']);
  }
}
