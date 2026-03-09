import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductFilterComponent } from '../../shared/components/product-filter/product-filter.component';
import { HighlightProductsComponent } from '../../shared/components/highlight-products/highlight-products.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-dress',
  imports: [NavbarComponent, 
            CommonModule, 
            FooterComponent, 
            ProductFilterComponent, 
            HighlightProductsComponent,
            ProductCardComponent
          ],
  standalone: true,
  templateUrl: './dress.component.html',
  styleUrl: './dress.component.scss'
})
export class DressComponent {
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
}
