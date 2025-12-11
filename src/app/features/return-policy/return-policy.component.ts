import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-return-policy',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './return-policy.component.html',
  styleUrl: './return-policy.component.scss'
})
export class ReturnPolicyComponent {

}
