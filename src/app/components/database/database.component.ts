import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrl: './database.component.scss',
  imports: [RouterModule, CommonModule]
})
export class DatabaseComponent {
  get selectedTable(): string { return this.router.url.split("/").pop() ?? ""; }

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigateTo(path: string) {
    this.router.navigate([path], {relativeTo: this.route});
  }
}
