import { Origin } from "./origin";
import { Perk } from "./perk";
import { Skill } from "./skill";
import { Special } from "./special";
import { Stats } from "./stats";

export class Character {
  origin: Origin = new Origin();
  special: Special = new Special();
  perks: Perk[] = [];
  skills: Skill[] = [];
  stats: Stats = new Stats();
}
