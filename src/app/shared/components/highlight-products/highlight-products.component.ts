import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../../features/services/product.service';

@Component({
  selector: 'app-highlight-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './highlight-products.component.html',
  styleUrl: './highlight-products.component.scss'
})
export class HighlightProductsComponent {
  product: any[] = [];

  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    });
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
