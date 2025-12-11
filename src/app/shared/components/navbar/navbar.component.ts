import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { SearchPopupComponent } from '../search-popup/search-popup.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoginPopupComponent,
    SearchPopupComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen: boolean = false;  // mặc định đóng menu
  showLogin = false;
  isSearchOpen = false;
  constructor(private router: Router) {
  }
  openSearch() {
    this.isSearchOpen = true;
  }
  closeSearch() {
    this.isSearchOpen = false;
  }
  openLogin(){
    this.showLogin = true;
  }
  closeLogin(){
    this.showLogin = false;
  }
  goHome(){
    this.router.navigate(['/home']);
  }
  goSale() {
    this.router.navigate(['/sale']);
  }
  goDress() {
    this.router.navigate(['/dress']);
  }
  goTrousers() {
    this.router.navigate(['/trousers']);
    console.log("Quan");
  }
  goShirt() {
    this.router.navigate(['/shirt']);
    console.log("Ao");
  }
  goSkirt() {
    this.router.navigate(['/skirt']);
  }
  goStore() {
    this.router.navigate(['/store']);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  goFavorite() {
    this.router.navigate(['/favorite']);
  }
  goCart() {
    this.router.navigate(['/cart']);
  }
}
