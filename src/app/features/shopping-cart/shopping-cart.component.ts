import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartservicesService } from '../services/cartservices.service';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent {
  cart: any[] = [];
  product: any;
  constructor(
    private cartService: CartservicesService
  ) { }
  ngOnInit() {
    this.cart = this.cartService.getCartItems();
    console.log(this.cart);
  }

}
