import originsData from "../data/origins.json";
import perksData from "../data/perks.json";
import skillsData from "../data/skills.json";
import weaponsData from "../data/weapons.json";
import ammoData from "../data/ammo.json";
import weaponModsData from "../data/weapon-mods.json";
import armorData from "../data/armor.json";
import armorModsData from "../data/armor-mod.json";
import consumablesData from "../data/consumables.json";
import { Injectable } from "@angular/core";
import { Origin, OriginData } from "../models/origin";
import { Perk, PerkData } from "../models/perk";
import { Skill, SkillData } from "../models/skill";
import { Weapon, WeaponData } from "../models/weapon";
import { Ammo, AmmoData } from "../models/ammo";
import { WeaponMod, WeaponModData } from "../models/weapon-mod";
import { Armor, ArmorData } from "../models/armor";
import { ArmorMod, ArmorModData } from "../models/armor-mod";
import { Consumable, ConsumableData } from "../models/consumable";

@Injectable({
  providedIn: "root"
})
export class DataService {
  origins: Origin[] = [];
  perks: Perk[] = [];
  skills: Skill[] = [];
  weapons: Weapon[] = [];
  ammo: Ammo[] = [];
  weaponMods: WeaponMod[] = [];
  armor: Armor[] = [];
  armorMods: ArmorMod[] = [];
  consumables: Consumable[] = [];

  constructor() {
    this.origins = (originsData as OriginData[]).map(OriginData.map);
    this.perks = (perksData as PerkData[]).map(PerkData.map);
    this.skills = (skillsData as SkillData[]).map(SkillData.map);
    this.weapons = (weaponsData as WeaponData[]).map(WeaponData.map);
    this.ammo = (ammoData as AmmoData[]).map(AmmoData.map);
    this.weaponMods = (weaponModsData as WeaponModData[]).map(WeaponModData.map);
    this.armor = (armorData as ArmorData[]).map(ArmorData.map);
    this.armorMods = (armorModsData as ArmorModData[]).map(ArmorModData.map);
    this.consumables = (consumablesData as ConsumableData[]).map(ConsumableData.map);
  }
}
