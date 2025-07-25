import originsData from "../data/origins.json";
import perksData from "../data/perks.json";
import skillsData from "../data/skills.json";
import weaponsData from "../data/weapons.json";
import { Injectable } from "@angular/core";
import { Origin, OriginData } from "../models/origin";
import { Perk, PerkData } from "../models/perk";
import { Skill, SkillData } from "../models/skill";
import { Weapon, WeaponData } from "../models/weapon";

@Injectable({
  providedIn: "root"
})
export class DataService {
  origins: Origin[] = [];
  perks: Perk[] = [];
  skills: Skill[] = [];
  weapons: Weapon[] = [];

  constructor() {
    this.origins = (originsData as OriginData[]).map(OriginData.map);
    this.perks = (perksData as PerkData[]).map(PerkData.map);
    this.skills = (skillsData as SkillData[]).map(SkillData.map);
    this.weapons = (weaponsData as WeaponData[]).map(WeaponData.map);
  }
}
