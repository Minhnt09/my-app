import {
  Component,
  Inject,
  Input,
  PLATFORM_ID,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CartservicesService } from '../services/cartservices.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';


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

  countdown!: number;
  isCountdownEnd = false;
  isShowBack = false;

  form!: FormGroup;
  cart: any[] = [];

  @Input() countdownDurationInMinutes = 5;

  constructor(
    private router: Router,
    private fb: FormBuilder,          // ✅ ĐÚNG
    private location: Location,
    private cartService: CartservicesService,
    private modalService: NzModalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.initializeForm();

    this.cart = this.cartService.getCartItems();

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

  fakePayment() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'success',
          orderId: Date.now(),
        });
      }, 1500);
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const result: any = await this.fakePayment();

    if (result.status === 'success') {
      const orderData = {
        orderId: result.orderId,
        cart: this.cart,
        info: this.form.value,
        total: this.getTotalPrice() + 20000,
        createdAt: new Date(),
      };

      localStorage.setItem('lastOrder', JSON.stringify(orderData));

      this.cartService.clearCart();

      this.router.navigate(['/payment-success'], {
        queryParams: { orderId: result.orderId },
      });
    }
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
      (sum: number, item: any) => sum + item.price,
      0
    );
  }
}
