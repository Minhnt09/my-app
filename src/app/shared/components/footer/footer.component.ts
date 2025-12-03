import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router} from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private router: Router) {
  }
  goAbout() {
    this.router.navigate(['/about']);
  }
  goNews() {
    this.router.navigate(['/news']);
  }
}
