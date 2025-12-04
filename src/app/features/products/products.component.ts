import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartservicesService } from '../services/cartservices.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  product: any;
  showScrollTop = false;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartservicesService
  ) { }
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.product = this.productService.getProductById(productId!);
    console.log(this.product);
  }
  addToCart() {
    this.cartService.addToCart(this.product);
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
    console.log("'Sản phẩm đã được thêm vào giỏ hàng!");
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
