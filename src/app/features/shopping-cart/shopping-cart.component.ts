import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule, Location } from '@angular/common';
import { CartservicesService } from '../services/cartservices.service';
import { Router } from '@angular/router';

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
    private cartService: CartservicesService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCartItems() || [];
    // ensure each item has qty (default 1)
    this.cart.forEach(item => {
      if (typeof item.qty !== 'number' || item.qty < 1) item.qty = 1;
    });
    console.log(this.cart);
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/products']);
    }
  }

  goBuy(){
    this.router.navigate(['/products-detail'])
  }

  /**
   * Removes an item at index i from cart.
   * Tries to use common cart service methods if available, otherwise just updates local array.
   */
  removeItem(index: number) {
    if (index < 0 || index >= this.cart.length) return;

    const removed = this.cart.splice(index, 1)[0];

    // If service exposes a remove method, try to call it
    const svc: any = this.cartService as any;
    if (typeof svc.removeCartItem === 'function') {
      try { svc.removeCartItem(removed); return; } catch { /* ignore */ }
    }
    if (typeof svc.removeItem === 'function') {
      try { svc.removeItem(removed); return; } catch { /* ignore */ }
    }

    // Otherwise try to persist whole cart with various common names
    this.persistCart();
  }

  /**
   * Change quantity for item at index by delta (+1 or -1).
   */
  changeQuantity(index: number, delta: number) {
    if (index < 0 || index >= this.cart.length) return;
    const item = this.cart[index];
    const newQty = (item.qty || 1) + delta;
    if (newQty < 1) return; // don't allow 0 or negative: remove if you want
    item.qty = newQty;
    this.persistCart();
  }

  /**
   * Compute total (considering qty)
   */
  getTotalPrice() {
    return this.cart.reduce((sum: number, item: any) => {
      const qty = item.qty && item.qty > 0 ? item.qty : 1;
      const price = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      return sum + price * qty;
    }, 0);
  }

  /**
   * Persist cart to service if the service provides a setter/save function.
   * This tries a list of commonly named functions and calls the first available.
   */
  private persistCart() {
    const svc: any = this.cartService as any;
    const candidateFns = ['setCartItems', 'saveCart', 'updateCart', 'setCart', 'persistCart', 'setItems'];
    for (const fn of candidateFns) {
      if (typeof svc[fn] === 'function') {
        try {
          svc[fn](this.cart);
          return;
        } catch (e) {
          // ignore and try next
        }
      }
    }

    // fallback: if the service stores cart in a property, try to set it
    try {
      if ('cart' in svc) {
        svc.cart = this.cart;
      }
    } catch {}
  }
}
