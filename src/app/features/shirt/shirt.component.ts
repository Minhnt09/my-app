import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductFilterComponent } from '../../shared/components/product-filter/product-filter.component';
import { HighlightProductsComponent } from '../../shared/components/highlight-products/highlight-products.component';
import { listProduct } from '../../shared/constants/list-product.constants';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';


@Component({
  selector: 'app-shirt',
  imports: [NavbarComponent, 
            CommonModule, 
            FooterComponent, 
            ProductFilterComponent, 
            HighlightProductsComponent,
            ProductCardComponent
          ],
  standalone: true,
  templateUrl: './shirt.component.html',
  styleUrl: './shirt.component.scss'
})
export class ShirtComponent {
  products = listProduct.data.items;
}
