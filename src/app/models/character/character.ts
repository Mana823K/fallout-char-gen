import { BehaviorSubject } from "rxjs";
import { Origin } from "./origin";
import { Perk, PerkSaveData } from "./perk";
import { Skill, SkillSaveData } from "./skill";
import { Special, SpecialSaveData } from "./special";
import { Stats } from "./stats";
import { EventEmitter } from "@angular/core";
import { SpecialEnum } from "./special-enum";

export class Character {
  static readonly STORAGE_NAME = "CharacterData"
  originSub = new BehaviorSubject<Origin | undefined>(undefined);
  get origin(): Origin | undefined { return this.originSub.value; }
  set origin(value: Origin | undefined) {
    this.originSub.next(value);
    this.onChange.emit();
  }

  levelSub = new BehaviorSubject<number>(0);
  get level(): number { return this.levelSub.value; }
  set level(value: number) {
    this.levelSub.next(value);
    this.onChange.emit();
  }

  specialSub = new BehaviorSubject<Special>(new Special());
  get special(): Special { return this.specialSub.value; }
  set special(value: Special) {
    this.specialSub.next(value);
    this.onChange.emit();
  }

  perksSub = new BehaviorSubject<Perk[]>([]);
  get perks(): Perk[] { return this.perksSub.value; }
  set perks(value: Perk[]) {
    this.perksSub.next(value);
    this.onChange.emit();
  }

  skillsSub = new BehaviorSubject<Skill[]>([]);
  get skills(): Skill[] { return this.skillsSub.value; }
  set skills(value: Skill[]) {
    this.skillsSub.next(value);
    this.onChange.emit();
  }

  statsSub = new BehaviorSubject<Stats>(new Stats());
  get stats(): Stats { return this.statsSub.value; }
  set stats(value: Stats) { this.statsSub.next(value); }

  onChange = new EventEmitter<void>();

  getSpecialPoints(attribute: SpecialEnum) {
    return this.special.getValue(attribute);
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
