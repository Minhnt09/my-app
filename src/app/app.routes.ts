import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { StoreComponent } from './features/store/store.component';
import { ShirtComponent } from './features/shirt/shirt.component';
import { TrousersComponent } from './features/trousers/trousers.component';
import { SkirtComponent } from './features/skirt/skirt.component';
import { DressComponent } from './features/dress/dress.component';
import { SaleComponent } from './features/sale/sale.component';
import { AboutUsComponent } from './features/about-us/about-us.component';
import { NewsComponent } from './features/news/news.component';
import { FavoriteComponent } from './features/favorite/favorite.component';
import { ProductsComponent } from './features/products/products.component';
import { HighlightProductsComponent } from './shared/components/highlight-products/highlight-products.component';
import { ShoppingCartComponent } from './features/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'sale',
    component: SaleComponent
  },
  {
    path: 'dress',
    component: DressComponent
  },
  {
    path: 'shirt',
    component: ShirtComponent
  },
  {
    path: 'trousers',
    component: TrousersComponent
  },
  {
    path: 'skirt',
    component: SkirtComponent
  },
  {
    path: 'store',
    component: StoreComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'news',
    component: NewsComponent
  },
  {
    path: 'favorite',
    component: FavoriteComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path:'products',
    component: ProductsComponent
  },
  {
    path: 'san-pham-noi-bat',
    component: HighlightProductsComponent
  }
];
