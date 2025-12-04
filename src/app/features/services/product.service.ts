import { Injectable } from '@angular/core';
import { listProduct } from '../../shared/constants/list-product.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getAllProducts() {
    return listProduct.data.items;
  }
  getProductById(id: string) {
    return listProduct.data.items.find(product => product.id === id);
  }
  constructor() { }
}
