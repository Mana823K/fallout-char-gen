import { Component } from '@angular/core';
import { MatCheckbox } from "@angular/material/checkbox";
import { SelectComponent } from "../form/select/select.component";
import { TextAreaComponent } from "../form/text-area/text-area.component";
import { FormsModule } from '@angular/forms';
import { Character } from '../../models/character/character';
import { Inventory } from '../../models/inventory/inventory';
import { CharacterService } from '../../services/character.service';
import { InventoryService } from '../../services/inventory.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-import-export',
  imports: [MatCheckbox, SelectComponent, TextAreaComponent, FormsModule],
  templateUrl: './import-export.component.html',
  styleUrl: './import-export.component.scss'
})
export class ImportExportComponent {
  readonly CHAR_OPTION_NAME = "Character";
  readonly INV_OPTION_NAME = "Inventory";
  isCharacterChecked: boolean = true;
  isInventoryChecked: boolean = true;

  characterData: string = "";
  inventoryData: string = "";

  importOptions = [this.CHAR_OPTION_NAME, this.INV_OPTION_NAME];
  selectedImportOption: string = "";

  importDataInput: string = "";

  isFail: boolean = false;
  isSuccess: boolean = false;

  constructor(private dataService: DataService,
              private characterService: CharacterService,
              private inventoryService: InventoryService) { }

  exportData() {
    if (this.isCharacterChecked)
      this.characterData = localStorage.getItem(Character.STORAGE_NAME) ?? "";
    else
      this.characterData = "";

    if (this.isInventoryChecked)
      this.inventoryData = localStorage.getItem(Inventory.STORAGE_NAME) ?? "";
    else
      this.inventoryData = "";
  }

  importData() {
    this.isSuccess = false;
    this.isFail = false;
    try {
      JSON.parse(this.importDataInput);
    }
    catch (e) {
      this.isFail = true;
      console.log(e);
      return;
    }

    let isCharacter = this.selectedImportOption == this.CHAR_OPTION_NAME;
    let isInventory = this.selectedImportOption == this.INV_OPTION_NAME;
    if (!isCharacter && !isInventory)
      return;

    let service = isCharacter ? new CharacterService(this.dataService) : new InventoryService(this.dataService);
    try {
      service.init(this.importDataInput);
    }
    catch (e) {
      this.isFail = true;
      console.log(e);
      return;
    }

    if (isCharacter) {
      localStorage.setItem(Character.STORAGE_NAME, this.importDataInput);
      this.characterService.init();
    }
    else if (isInventory) {
      localStorage.setItem(Inventory.STORAGE_NAME, this.importDataInput);
      this.inventoryService.init();
    }

    this.isSuccess = true;
  }
}
