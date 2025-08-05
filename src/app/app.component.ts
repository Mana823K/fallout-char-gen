import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  get selectedTable(): string { return this.router.url.split("/")[1] ?? ""; }

  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
