import { Origin } from "./origin";
import { Special } from "./special";

export class Character {
  origin: Origin = new Origin();
  special: Special = new Special();
  perks: any[] = [];
  skills: any[] = [];
  stats: any;
}
