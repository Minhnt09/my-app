import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartservicesService {
  private cart: any[] = [];
  private favorites: any[] = [];

  constructor() {
    // chỉ dùng localStorage khi chạy trên client (window có sẵn)
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const cartJson = localStorage.getItem('cart');
        const favJson = localStorage.getItem('favorites');
        this.cart = cartJson ? JSON.parse(cartJson) : [];
        this.favorites = favJson ? JSON.parse(favJson) : [];
      } catch (e) {
        console.warn('Không thể đọc localStorage:', e);
        this.cart = [];
        this.favorites = [];
      }
    }
  }

  // CART
  addToCart(product: any) {
    if (!product) return;
    this.cart.push(product);
    this.saveCartToStorage();
  }

  getCartItems(): any[] {
    return this.cart;
  }

  private saveCartToStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('cart', JSON.stringify(this.cart));
      } catch (e) {
        console.warn('Không thể lưu cart lên localStorage:', e);
      }
    }
  }

  // FAVORITES
  addToFavorite(product: any) {
    if (!product) return;
    const exists = this.favorites.find((item: any) => item.id === product.id);
    if (!exists) {
      this.favorites.push(product);
      this.saveFavoritesToStorage();
      console.log('Đã thêm vào danh sách yêu thích:', product);
    } else {
      console.log('Sản phẩm đã có trong danh sách yêu thích');
    }
  }

  getFavorites(): any[] {
    return this.favorites;
  }

  removeFromFavorite(productId: any) {
    const idx = this.favorites.findIndex((i: any) => i.id === productId);
    if (idx !== -1) {
      this.favorites.splice(idx, 1);
      this.saveFavoritesToStorage();
    }
  }

  private saveFavoritesToStorage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      } catch (e) {
        console.warn('Không thể lưu favorites lên localStorage:', e);
      }
    }
  }
}
