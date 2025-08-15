import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tools',
  standalone: false,
  templateUrl: './tools.component.html',
  styleUrl: './tools.component.scss'
})
export class ToolsComponent {
  get selectedTable(): string { return this.router.url.split("/").pop() ?? ""; }

  constructor(private router: Router, private route: ActivatedRoute) { }

  navigateTo(path: string) {
    this.router.navigate([path], {relativeTo: this.route});
  }

}
