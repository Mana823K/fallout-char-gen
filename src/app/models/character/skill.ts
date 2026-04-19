import { SpecialEnum } from "./special-enum";

export class Skill {
  static readonly TAG_COUNT = 3;
  static readonly MAX_RANK = 6;
  static readonly STARTER_MAX_RANK = 3;
  static readonly TAG_MIN_RANK = 2;
  static readonly RANK_POINTS = 9;

  name: string = "";
  attribute: SpecialEnum = SpecialEnum.STR;
  detail: string = "";

  isTagged: boolean = false;
  ranks: number = 0;

  get minRank(): number { return this.isTagged ? 2 : 0; }
}

export class SkillData {
  name: string = "";
  attribute: string = "";
  detail: string = "";

  static map(original: SkillData): Skill {
    let result = new Skill();

    result.name = original.name;
    result.attribute = SpecialEnum[original.attribute as keyof typeof SpecialEnum] ?? SpecialEnum.STR;
    result.detail = original.detail;

    return result;
  }
}

export class SkillSaveData {
  name: string = "";
  isTagged: boolean = false;
  ranks: number = 0;

  constructor(skill: Skill) {
    this.name = skill.name;
    this.isTagged = skill.isTagged;
    this.ranks = skill.ranks;
  }
}
