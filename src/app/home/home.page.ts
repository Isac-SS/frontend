import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateTo(page: string) {
    if (page === 'atletas') {
      this.router.navigate(['/atletas']);
    } else if (page === 'eventos') {
      this.router.navigate(['/eventos']);
    } else if (page === 'embarcacoes') {
      this.router.navigate(['/embarcacoes']);
    }
  }
}
