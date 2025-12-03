import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HighlightProductsComponent } from '../../shared/components/highlight-products/highlight-products.component';

@Component({
  selector: 'app-store',
  imports: [
    NavbarComponent,
    FooterComponent,
    HighlightProductsComponent
  ],
  standalone: true, 
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {

}
