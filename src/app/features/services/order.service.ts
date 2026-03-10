import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type CreateOrderPayload = {
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  items: { productId: number; qty: number }[];
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'https://my-app-uc3a.onrender.com';

  constructor(private http: HttpClient) { }

  createOrder(payload: CreateOrderPayload): Observable<any>{
    return this.http.post(`${this.baseUrl}/orders`, payload);
  }

  getOrderByCode(orderCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/orders/${orderCode}`);
  }
}
