import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen: boolean = false;  // mặc định đóng menu
  constructor(private router: Router) {
  
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
