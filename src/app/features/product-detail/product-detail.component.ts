import { Component, Inject, Input, PLATFORM_ID, TemplateRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule, isPlatformBrowser, Location } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { CartservicesService } from '../services/cartservices.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NavbarComponent,
    CommonModule, 
    RouterModule, 
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    FooterComponent
    ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent {
  @ViewChild('modalContent') modalContent!: TemplateRef<any>;
  countdown!:number;
  isCountdownEnd = false;
  isShowBack: boolean = false;
  form!: FormGroup;
  cart: any[] = [];
  modalService: any;
  constructor (
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private cartService: CartservicesService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeForm();
  }
  initializeForm():void {
    this.form = new FormGroup({
      fullName: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      address: new FormControl(null, [Validators.required]),
    })
  }
  @Input() countdownDurationInMinutes = 5;

  get fullName() {
    return this.form.get('fullName');
  }
  get phoneNumber() {
    return this.form.get('phoneNumber');
  }
  get email() {
    return this.form.get('email');
  }
  get address() {
    return this.form.get('address');
  }

  ngOnInit() {
    const now = Date.now();
    this.countdown = now + this.countdownDurationInMinutes * 60 * 1000;
    this.cart = this.cartService.getCartItems();

  }
  onSubmit(){
    console.log('a');
    if (this.form.valid) {
      const body = {
        ...this.form.value,
        source: 'SITE'
      };
      console.log(body);
    }
  }
  goBack() {
    if(window.history.length > 1){
      this.location.back()
    }
    else {
      this.router.navigate(['/products'])
    }
  }
  openModalTimeOut() {
    this.modalService.create ({
      nzTitle: '',
      nzContent: this.modalContent,
    })
  }
  onCountdownFinished() {
    console.log('Countdown finished!');
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
    return this.cart.reduce((sum: number, item: any) => sum + item.price, 0);
  }
}
