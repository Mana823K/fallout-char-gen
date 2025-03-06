export class Skill {
  name: string = "";
  attribute: string = "";
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
    result.attribute = original.attribute;
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
