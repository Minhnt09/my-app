import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterLink, RouterModule } from "@angular/router";
import { HighlightProductsComponent } from '../../shared/components/highlight-products/highlight-products.component';
import { listProduct } from '../../shared/constants/list-product.constants';

@Component({
  selector: 'app-sale',
  imports: [NavbarComponent, CommonModule, FooterComponent, RouterLink, RouterModule, HighlightProductsComponent],
  standalone: true,
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.scss'
})
export class SaleComponent {
  listProduct = listProduct.data.items;
  // Biến toggle cho filter panel
  showColor = false;
  showSize = false;
  showForm = false;
  
  // Toggle các panel
  togglePanel(panel: 'color' | 'size' | 'form') {
    if (panel === 'color') this.showColor = !this.showColor;
    if (panel === 'size') this.showSize = !this.showSize;
    if (panel === 'form') this.showForm = !this.showForm;
  }
}
