import { Component, Inject, Input, PLATFORM_ID, TemplateRef, ViewChild, } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CartservicesService } from '../services/cartservices.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CheckoutService } from '../services/checkout.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    FooterComponent,
    NzModalModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  @Input() countdownDurationInMinutes = 5;

  countdown!: number;
  isCountdownEnd = false;
  isShowBack = false;
  
  form!: FormGroup;
  cart: any[] = [];

  private readonly ORDER_API = 'https://my-app-uc3a.onrender.com/orders';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private cartService: CartservicesService,
    private checkoutService: CheckoutService,
    private modalService: NzModalService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.initializeForm();

    const checkoutProducts = this.checkoutService.getProducts();

    if (checkoutProducts.length > 0) {
      // 👉 ĐI TỪ MUA NGAY
      this.cart = checkoutProducts;
    } else {
      // 👉 ĐI TỪ GIỎ HÀNG
      this.cart = this.cartService.getCartItems();
    }
    this.checkoutService.clear();

    const now = Date.now();
    this.countdown =
      now + this.countdownDurationInMinutes * 60 * 1000;
  }
  initializeForm(): void {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]*$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      email: ['', Validators.email],
      province: ['', Validators.required],
      district: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  get fullName() { return this.form.get('fullName'); }
  get phoneNumber() { return this.form.get('phoneNumber'); }
  get email() { return this.form.get('email'); }
  get province() { return this.form.get('province'); }
  get district() { return this.form.get('district'); }
  get address() { return this.form.get('address'); }

  private buildOrderPayload() {
    const v = this.form.value;

    return {
      customer: {
        name: v.fullName,
        phone: v.phoneNumber,
        email: v.email,
        address: `${v.address}, ${v.district}, ${v.province}`,
      },
      items: this.cart.map((item: any) => ({
        productId: item.id,
        qty: item.qty ?? 1,
      })),
    };
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.buildOrderPayload();


    this.http.post(this.ORDER_API, payload).subscribe({
      next: (res: any) => {
        console.log('POST /orders response', res);
        
        const orderCode = res?.data?.orderCode || res?.data?.orderCode || res?.orderCode;

        this.cartService.clearCart();

        this.router.navigate(['/payment-success'], {
          queryParams: { orderCode },
        });
      },
      error: (err) => {
        console.error('Lỗi khi tạo đơn hàng:', err);
        // Hiển thị thông báo lỗi cho người dùng nếu cần
      }
    });
  }

  goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/products']);
    }
  }

  openModalTimeOut() {
    this.modalService.create({
      nzTitle: '',
      nzContent: this.modalContent,
    });
  }

  onCountdownFinished() {
    this.isCountdownEnd = true;
    this.openModalTimeOut();
  }

  openBackModal() {
    this.isShowBack = true;
  }

  handleOk() {
    this.router.navigate(['/home']);
    this.isShowBack = false;
  }

  handleCancel() {
    this.isShowBack = false;
  }

  getTotalPrice() {
    return this.cart.reduce(
      (sum: number, item: any) => sum + item.price * (item.qty ?? 1),
      0
    );
  }
}
    // if (result.status === 'success') {
    //   const orderData = {
    //     orderId: result.orderId,
    //     cart: this.cart,
    //     info: this.form.value,
    //     total: this.getTotalPrice() + 20000,
    //     createdAt: new Date(),
    //   };

    //   localStorage.setItem('lastOrder', JSON.stringify(orderData));

    //   this.cartService.clearCart();

    //   this.router.navigate(['/payment-success'], {
    //     queryParams: { orderId: result.orderId },
    //   });
    // }