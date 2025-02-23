import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Origin } from "../models/origin";
import { Special, SpecialData } from "../models/special";
import { Perk } from "../models/perk";
import { Skill } from "../models/skill";
import { Stats } from "../models/stats";
import { Defs } from "../models/defaults";

@Injectable({
  providedIn: "root"
})
export class CharacterService {
  readonly ORIGIN_NAME = "Origin";
  private _origin: Origin = new Origin();
  public get origin(): Origin {
    return this._origin;
  }
  public set origin(value: Origin) {
    this._origin = value;
    this.onOriginChanged();
  }

  readonly SPECIAL_NAME = "Special";
  special: Special = new Special();
  readonly PERK_NAME = "Perks";
  perks: Perk[] = [];
  readonly SKILL_NAME = "Skills";
  skills: Skill[] = [];
  stats: Stats = new Stats();

  constructor(private dataService: DataService) {
    this.initCharacter();

    this.special.subject.subscribe(() => this.onSpecialChanged())
  }

  initCharacter() {
    var originData = localStorage.getItem(this.ORIGIN_NAME);
    this.origin = originData ? JSON.parse(originData) : new Origin();

    var specialData = localStorage.getItem(this.SPECIAL_NAME);
    this.special = specialData ? Special.map(JSON.parse(specialData)) : new Special();

    this.skills = this.dataService.skills;
  }

  onOriginChanged() {
    localStorage.setItem(this.ORIGIN_NAME, JSON.stringify(this.origin));
  }

  onSpecialChanged() {
    this.updateStats();
    localStorage.setItem(this.SPECIAL_NAME, JSON.stringify(new SpecialData(this.special)));
  }

  updateStats() {
    this.stats.carryWeight = Defs.CARRY_WEIGHT + this.special.strength * 10;
    this.stats.initiative = this.special.perception + this.special.agility;
    this.stats.defense = this.special.agility > 0 ? this.special.agility > 8 ? 2 : 1 : 0;
    this.stats.maxHp = this.special.endurance + this.special.luck;
    this.stats.meleeBonus = this.special.strength > 6 ? this.special.strength > 8 ? this.special.strength > 11 ? 3 : 2 : 1 : 0;
  }
}
