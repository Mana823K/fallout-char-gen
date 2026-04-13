import { BehaviorSubject } from "rxjs";
import { Origin } from "./origin";
import { Perk, PerkSaveData } from "./perk";
import { Skill, SkillSaveData } from "./skill";
import { Special, SpecialSaveData } from "./special";
import { Stats } from "./stats";

export class Character {
  static readonly STORAGE_NAME = "CharacterData"
  originSub = new BehaviorSubject<Origin | undefined>(undefined);
  get origin(): Origin | undefined { return this.originSub.value; }
  set origin(value: Origin | undefined) {
    this.originSub.next(value);
    this.onChange();
  }
  
  levelSub = new BehaviorSubject<number>(0);
  get level(): number { return this.levelSub.value; }
  set level(value: number) {
    this.levelSub.next(value);
    this.onChange();
  }

  specialSub = new BehaviorSubject<Special>(new Special());
  get special(): Special { return this.specialSub.value; }
  set special(value: Special) {
    this.specialSub.next(value);
    this.onChange();
  }

  perksSub = new BehaviorSubject<Perk[]>([]);
  get perks(): Perk[] { return this.perksSub.value; }
  set perks(value: Perk[]) {
    this.perksSub.next(value);
    this.onChange();
  }

  skillsSub = new BehaviorSubject<Skill[]>([]);
  get skills(): Skill[] { return this.skillsSub.value; }
  set skills(value: Skill[]) {
    this.skillsSub.next(value);
    this.onChange();
  }

  statsSub = new BehaviorSubject<Stats>(new Stats());
  get stats(): Stats { return this.statsSub.value; }
  set stats(value: Stats) { this.statsSub.next(value); }

  extraSpecialPoints: number = 0;
  extraSkillTags: number = 0;
  extraSkillRanks: number = 0;
  hpModifier: number = 1;
  carryWeightModifier: number = 0;

  initialized: boolean = false;

  init(origins: Origin[], perks: Perk[], skills: Skill[]) {
    this.skills = skills;
    this.perks = perks;
    const storedData = localStorage.getItem(Character.STORAGE_NAME)
    if (storedData) {
      let characterData: CharacterSaveData = JSON.parse(storedData);
      this.origin = origins.find(x => x.name == characterData.origin);
      this.level = characterData.level ?? this.level;
      this.special = characterData.special ? SpecialSaveData.map(characterData.special) : this.special;


      for (let savedPerk of characterData.perks ?? []) {
        let perk = this.perks.find(x => x.name == savedPerk.name);
        if (perk) {
          perk.ranks = savedPerk.ranks;
        }
      }

      for (let savedSkill of characterData.skills ?? []) {
        let skill = this.skills.find(x => x.name == savedSkill.name);
        if (skill) {
          skill.isTagged = savedSkill.isTagged;
          skill.ranks = savedSkill.ranks;
        }
      }
    }

    this.initialized = true;
    this.onChange();
  }

  onChange() {
    if (!this.initialized)
      return;

    this.stats.updateStats(this.special, this.level, this.hpModifier, this.carryWeightModifier);
    
    this.updatePerks();

    let saveData = new CharacterSaveData(this);
    localStorage.setItem(Character.STORAGE_NAME, JSON.stringify(saveData));
  }
  
  updatePerks() {
    this.perks.forEach(x => {
      x.updateAvailability(this.special, this.level);
      if (!x.isAvailable) {
        x.ranks = 0;
      }
    });
    this.perksSub.next(this.perks);

    let specialPerk = this.perks.find(x => x.name == "INTENSE TRAINING");
    if (specialPerk) {
      this.extraSpecialPoints = specialPerk.ranks;
    }

    let hpPerk = this.perks.find(x => x.name == "LIFE GIVER");
    if (hpPerk) {
      this.hpModifier = hpPerk.ranks + 1;
    }

    let skillPerk = this.perks.find(x => x.name == "SKILLED");
    if (skillPerk) {
      this.extraSkillRanks = skillPerk.ranks * 2;
    }

    let carryWeightPerk = this.perks.find(x => x.name == "STRONG BACK");
    if (carryWeightPerk) {
      this.carryWeightModifier = carryWeightPerk.ranks * 25;
    }

    let tagPerk = this.perks.find(x => x.name == "TAG!");
    if (tagPerk) {
      this.extraSkillTags = tagPerk.ranks;
    }
  }
}

export class CharacterSaveData {
  origin?: string;
  level?: number;
  special?: SpecialSaveData;
  perks?: PerkSaveData[];
  skills?: SkillSaveData[];

  constructor(original: Character) {
    return {
      origin: original.origin?.name,
      level: original.level,
      special: new SpecialSaveData(original.special),
      perks: original.perks.filter(x => x.ranks > 0).map<PerkSaveData>(x => new PerkSaveData(x)),
      skills: original.skills.map<SkillSaveData>(x => new SkillSaveData(x))
    }
  }
}