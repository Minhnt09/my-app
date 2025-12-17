import { Component, ViewChild } from '@angular/core';
import { listProduct } from '../../constants/list-product.constants';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-highlight-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './highlight-products.component.html',
  styleUrl: './highlight-products.component.scss'
})
export class HighlightProductsComponent {
  products = listProduct.data.items;
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
}
