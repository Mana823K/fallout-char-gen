import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss',
  imports: [CommonModule, RouterModule]
})
export class ToolsComponent {
  get selectedTable(): string { return this.router.url.split("/").pop() ?? ""; }

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigateTo(path: string) {
    this.router.navigate([path], {relativeTo: this.route});
  }

}
