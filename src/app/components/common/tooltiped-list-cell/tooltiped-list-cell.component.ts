import { Component, Input } from '@angular/core';
import { TooltipTypeEnum } from '../../../models/database/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-tooltiped-list-cell',
  imports: [MatTooltipModule],
  templateUrl: './tooltiped-list-cell.component.html',
  styleUrl: './tooltiped-list-cell.component.scss'
})
export class TooltipedListCellComponent {
  @Input() items: string[] = [];
  @Input() type: TooltipTypeEnum = TooltipTypeEnum.Other;

  constructor(private dataService: DataService) { }

  getTooltip(effect: string): string {
    let tooltips = this.dataService.tooltips.filter(x => x.type == this.type);
    return tooltips.find(x => x.name == effect.replace(/\s\([0-9]+\)/gm, "").replace(/\s[0-9]+/gm, ""))?.description ?? "";
  }

}
