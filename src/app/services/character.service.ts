import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Origin } from "../models/origin";
import { Special } from "../models/special";
import { Perk } from "../models/perk";
import { Skill } from "../models/skill";
import { Stats } from "../models/stats";
import { Defs } from "../models/defaults";

@Injectable({
  providedIn: "root"
})
export class CharacterService {
  origin: Origin = new Origin();
  special: Special = new Special();
  perks: Perk[] = [];
  skills: Skill[] = [];
  stats: Stats = new Stats();

  constructor(private dataService: DataService) {
    this.initCharacter();

    this.special.subject.subscribe(() => this.onSpecialChanged())
  }

  initCharacter() {
    this.skills = this.dataService.skills;
  }

  onSpecialChanged() {
    this.updateStats();
  }

  updateStats() {
    this.stats.carryWeight = Defs.CARRY_WEIGHT + this.special.strength * 10;
    this.stats.initiative = this.special.perception + this.special.agility;
    this.stats.defense = this.special.agility > 0 ? this.special.agility > 8 ? 2 : 1 : 0;
    this.stats.maxHp = this.special.endurance + this.special.luck;
    this.stats.meleeBonus = this.special.strength > 6 ? this.special.strength > 8 ? this.special.strength > 11 ? 3 : 2 : 1 : 0;
  }
}
