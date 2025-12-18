import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartservicesService } from '../services/cartservices.service';
import { HighlightProductsComponent } from "../../shared/components/highlight-products/highlight-products.component";
import { CheckoutService } from '../services/checkout.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, HighlightProductsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  product: any;
  showScrollTop = false;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartservicesService,
    private router: Router,
    private checkoutService: CheckoutService,
  ) { }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    this.product = this.productService.getProductById(id!);
    console.log(this.product);
    });
  }
  addToCart() {
    this.cartService.addToCart(this.product);
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
    console.log("'Sản phẩm đã được thêm vào giỏ hàng!");
  }
  addToFavorite() {
    if (!this.product) return;
    this.cartService.addToFavorite(this.product);
    // tuỳ bạn muốn hiện thông báo:
    alert('Đã thêm vào yêu thích');
  }
  buyNow() {
    if (!this.product) return;

    const checkoutItem = {
      ...this.product,
      qty: 1
    };

    this.checkoutService.setProducts([checkoutItem]);
    this.router.navigate(['/products-detail']);
  }
  @ViewChild('carousel') carousel: any;

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  }
}
