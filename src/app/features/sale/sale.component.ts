import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink, RouterModule } from "@angular/router";
import { HighlightProductsComponent } from '../../shared/components/highlight-products/highlight-products.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-sale',
  imports: [NavbarComponent, 
            CommonModule, 
            FooterComponent, 
            RouterModule, 
            HighlightProductsComponent,
          ],
  standalone: true,
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  // Biến toggle cho filter panel
  showColor = false;
  showSize = false;
  showForm = false;

  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => {
        console.error('Lỗi khi lấy sản phẩm:', error);
      }
    });
  }
  
  // Toggle các panel
  togglePanel(panel: 'color' | 'size' | 'form') {
    if (panel === 'color') this.showColor = !this.showColor;
    if (panel === 'size') this.showSize = !this.showSize;
    if (panel === 'form') this.showForm = !this.showForm;
  }
}
