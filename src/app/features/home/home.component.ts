import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HighlightProductsComponent } from '../../shared/components/highlight-products/highlight-products.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    FooterComponent,
    CommonModule,
    HighlightProductsComponent

  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('carousel') carousel: any;

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }
  showScrollTop = false;
  goAbout() {
    this.router.navigate(['/about-us']);
  }
  goNews() {
    this.router.navigate(['/news']);
  }
  constructor(private router: Router) {
  }
}
