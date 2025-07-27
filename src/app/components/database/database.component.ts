import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-database',
  standalone: false,
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss'
})
export class DatabaseComponent {
  get selectedTable(): string { return this.router.url.split("/").pop() ?? ""; }

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigateTo(path: string) {
    this.router.navigate([path], {relativeTo: this.route});
  }
}
