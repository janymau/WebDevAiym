import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faShoppingBag, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';


@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, FontAwesomeModule, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  isDropdownOpen = false;
  faSearch = faSearch;
  faShoppingBag = faShoppingBag;
  faUser = farUser; // Regular user icon

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.loginStatus$.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  login(): void {
    this.router.navigate(['/login']);
    this.isDropdownOpen = false;
  }

  register(): void {
    this.router.navigate(['/register']);
    this.isDropdownOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.isDropdownOpen = false;
  }

  goToProfile(): void {
    this.router.navigate(['/profile']);
    this.isDropdownOpen = false;
  }
}
