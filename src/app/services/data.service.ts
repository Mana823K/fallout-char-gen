import originsData from "../assets/origins.json";
import perksData from "../assets/perks.json";
import skillsData from "../assets/skills.json";
import { Injectable } from "@angular/core";
import { Origin } from "../models/origin";
import { Perk, PerkData } from "../models/perk";
import { Skill, SkillData } from "../models/skill";

@Injectable({
  providedIn: "root"
})
export class DataService {
  origins: Origin[] = originsData as Origin[];

  perks: Perk[] = (perksData as PerkData[]).map(PerkData.map);

  skills: Skill[] = (skillsData as SkillData[]).map(SkillData.map);
}
