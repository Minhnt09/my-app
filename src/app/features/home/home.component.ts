import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent
  ],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private router: Router) {
    
  }

  goCertificate() {
    this.router.navigate(['/certificate']);
    
  }
  goProject() {
    this.router.navigate(['/project']);
  }

}
