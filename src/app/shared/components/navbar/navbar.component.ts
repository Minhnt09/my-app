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
  goCertificate() {
    this.router.navigate(['/certificate']);
    
  }
  goExperience() {
    this.router.navigate(['/experience']);
  }
  goProject() {
    this.router.navigate(['/project']);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
