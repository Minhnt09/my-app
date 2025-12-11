import { Component, ViewChild } from '@angular/core';
import { listProduct } from '../../constants/list-product.constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-highlight-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlight-products.component.html',
  styleUrl: './highlight-products.component.scss'
})
export class HighlightProductsComponent {
  constructor() {    
  }
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
  products = listProduct.data.items;
}
