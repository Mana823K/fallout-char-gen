import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Origin } from "../models/origin";
import { Special, SpecialData } from "../models/special";
import { Perk } from "../models/perk";
import { Skill } from "../models/skill";
import { Stats } from "../models/stats";

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
    var originName = localStorage.getItem(this.ORIGIN_NAME);
    this.origin = this.dataService.origins.find(x => x.name == originName) ?? new Origin();

    var specialData = localStorage.getItem(this.SPECIAL_NAME);
    this.special = specialData ? Special.map(JSON.parse(specialData)) : new Special();

    this.perks = this.dataService.perks;
    var perksData = localStorage.getItem(this.PERK_NAME);
    var perkNames: string[] = perksData ? JSON.parse(perksData).split(";") : [];
    console.log(this.perks)
    this.perks.forEach(x => {
      x.isSelected = perkNames.includes(x.name);
      x.updateAvailability(this.special);
    });

    this.skills = this.dataService.skills;
  }

  onOriginChanged() {
    localStorage.setItem(this.ORIGIN_NAME, this.origin.name);
  }

  onSpecialChanged() {
    this.stats.updateStats(this.special);
    this.perks.forEach(x => x.updateAvailability(this.special));
    localStorage.setItem(this.SPECIAL_NAME, JSON.stringify(new SpecialData(this.special)));
  }

  onPerskChanged() {
    localStorage.setItem(this.PERK_NAME, this.perks.flatMap(x => x.isSelected ? x.name : []).join(";"));
  }
}
