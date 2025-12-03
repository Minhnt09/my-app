import { Component, HostListener } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { ProductFilterComponent } from '../../shared/components/product-filter/product-filter.component';
import { HighlightProductsComponent } from '../../shared/components/highlight-products/highlight-products.component';

@Component({
  selector: 'app-skirt',
  imports: [NavbarComponent, CommonModule, FooterComponent, ProductFilterComponent, HighlightProductsComponent],
  standalone: true,
  templateUrl: './skirt.component.html',
  styleUrl: './skirt.component.scss'
})
export class SkirtComponent {
  // showScrollTop = false;

  // // Khi người dùng cuộn trang
  // @HostListener('window:scroll')
  // onScroll() {
  //   this.showScrollTop = window.pageYOffset > 300;
  // }

  // // Cuộn lên đầu trang
  // scrollToTop() {
  //   const scrollDuration = 800;
  //   const scrollStep = -window.scrollY / (scrollDuration / 16);

  //   const scrollInterval = setInterval(() => {
  //     if (window.scrollY !== 0) {
  //       window.scrollBy(0, scrollStep);
  //     } else {
  //       clearInterval(scrollInterval);
  //     }
  //   }, 16);
  // }
}
