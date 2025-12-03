import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-highlight-products',
  standalone: true,
  imports: [],
  templateUrl: './highlight-products.component.html',
  styleUrl: './highlight-products.component.scss'
})
export class HighlightProductsComponent {
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

}
