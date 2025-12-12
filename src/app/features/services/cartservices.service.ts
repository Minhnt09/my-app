import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string | number;
  name?: string;
  price?: number;
  qty?: number;
  // thêm trường khác theo app của bạn
}

@Injectable({ providedIn: 'root' })
export class CartservicesService {
  private storageKey = 'cart';
  private cart: CartItem[] = [];

  // BehaviorSubject để đồng bộ toàn app
  private _cart$ = new BehaviorSubject<CartItem[]>([]);
  cart$ = this._cart$.asObservable();

  // Favorites (giữ nguyên logic cũ)
  private favorites: any[] = [];
  private favKey = 'favorites';

  constructor() {
    this.loadFromStorage();
  }

  // ---------- Persistence ----------
  private loadFromStorage() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      const cartJson = localStorage.getItem(this.storageKey);
      const favJson = localStorage.getItem(this.favKey);
      this.cart = cartJson ? JSON.parse(cartJson) : [];
      this.favorites = favJson ? JSON.parse(favJson) : [];
    } catch (e) {
      console.warn('Không thể đọc localStorage:', e);
      this.cart = [];
      this.favorites = [];
    }
    this._cart$.next([...this.cart]);
  }

  private saveCartToStorage() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    } catch (e) {
      console.warn('Không thể lưu cart lên localStorage:', e);
    }
    this._cart$.next([...this.cart]); // emit copy to avoid external mutation
  }

  private saveFavoritesToStorage() {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.setItem(this.favKey, JSON.stringify(this.favorites));
    } catch (e) {
      console.warn('Không thể lưu favorites lên localStorage:', e);
    }
  }

  // ---------- CART API ----------
  getCartItems(): CartItem[] {
    // trả về copy để tránh thay đổi trực tiếp từ component
    return [...this.cart];
  }

  addToCart(product: CartItem, qty = 1) {
    if (!product || product.id == null) return;
    const idx = this.cart.findIndex(i => i.id === product.id);
    if (idx === -1) {
      const item: CartItem = { ...product, qty: qty };
      this.cart.push(item);
    } else {
      this.cart[idx].qty = (this.cart[idx].qty || 0) + qty;
    }
    this.saveCartToStorage();
  }

  // XÓA theo id (vĩnh viễn + persist)
  removeItemById(id: string | number) {
    const idx = this.cart.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.cart.splice(idx, 1);
    this.saveCartToStorage();
    return true;
  }

  // XÓA theo index (nếu bạn vẫn muốn)
  removeItemByIndex(index: number) {
    if (index < 0 || index >= this.cart.length) return false;
    this.cart.splice(index, 1);
    this.saveCartToStorage();
    return true;
  }

  updateItemQuantity(id: string | number, qty: number) {
    const idx = this.cart.findIndex(i => i.id === id);
    if (idx === -1) return false;
    if (qty <= 0) {
      this.cart.splice(idx, 1);
    } else {
      this.cart[idx].qty = qty;
    }
    this.saveCartToStorage();
    return true;
  }

  clearCart() {
    this.cart = [];
    this.saveCartToStorage();
  }

  // ---------- FAVORITES (giữ lại, minor fixes) ----------
  addToFavorite(product: any) {
    if (!product || product.id == null) return;
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
    return [...this.favorites];
  }

  removeFromFavorite(productId: any) {
    const idx = this.favorites.findIndex((i: any) => i.id === productId);
    if (idx !== -1) {
      this.favorites.splice(idx, 1);
      this.saveFavoritesToStorage();
    }
  }
}
