import originsData from "../data/origins.json";
import perksData from "../data/perks.json";
import skillsData from "../data/skills.json";
import weaponsData from "../data/weapons.json";
import ammoData from "../data/ammo.json";
import weaponModsData from "../data/weapon-mods.json";
import armorData from "../data/armor.json";
import armorModsData from "../data/armor-mod.json";
import consumablesData from "../data/consumables.json";
import chemsData from "../data/chems.json";
import magazinesData from "../data/magazines.json";
import miscellanyItemsData from "../data/miscellany-items.json";
import tooltipData from "../data/descriptions.json";
import { Injectable } from "@angular/core";
import { Origin, OriginData } from "../models/character/origin";
import { Perk, PerkData } from "../models/character/perk";
import { Skill, SkillData } from "../models/character/skill";
import { Weapon, WeaponData } from "../models/database/weapon";
import { Ammo, AmmoData } from "../models/database/ammo";
import { WeaponMod, WeaponModData } from "../models/database/weapon-mod";
import { Armor, ArmorData } from "../models/database/armor";
import { ArmorMod, ArmorModData } from "../models/database/armor-mod";
import { Consumable, ConsumableData } from "../models/database/consumable";
import { Chem, ChemData } from "../models/database/chem";
import { Magazine, MagazineData } from "../models/database/magazine";
import { MiscellanyItem, MiscellanyItemData } from "../models/database/miscellany-item";
import { Tooltip, TooltipData } from "../models/database/tooltip";

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
  chems: Chem[] = [];
  magazines: Magazine[] = [];
  miscellanyItems: MiscellanyItem[] = [];
  tooltips: Tooltip[] = [];

  weaponTypes: string[] = [];
  weaponEffects: string[] = [];
  weaponQualities: string[] = [];
  damageTypes: string[] = [];

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
    this.chems = (chemsData as ChemData[]).map(ChemData.map);
    this.magazines = (magazinesData as MagazineData[]).map(MagazineData.map);
    this.miscellanyItems = (miscellanyItemsData as MiscellanyItemData[]).map(MiscellanyItemData.map);
    this.tooltips = (tooltipData as Tooltip[]).map(TooltipData.map);

    this.weaponTypes = [...new Set([...this.weapons.map(x => x.type)])].sort();
    this.weaponEffects = [...new Set([...this.weapons.flatMap(x => x.effects)])].sort();
    this.weaponQualities = [...new Set([...this.weapons.flatMap(x => x.qualities)])].sort();
    this.damageTypes = [...new Set([...this.weapons.map(x => x.damageType)])].sort();
  }
}
