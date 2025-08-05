export class Magazine {
  name: string = "";
  roll: number = 0;
  rare: boolean = false;
  perk: string = "";
  issues: MagazineIssue[] = [];
}

export class MagazineData {
  name: string = "";
  roll: number = 0;
  rare: boolean = false;
  perk: string = "";
  issues: MagazineIssueData[] = [];

  static map(original: MagazineData): Magazine {
    let result = new Magazine();

    result.name = original.name;
    result.roll = original.roll;
    result.rare = original.rare;
    result.perk = original.perk;
    result.issues = original.issues.map(MagazineIssueData.map);

    return result;
  }
}

export class MagazineIssue {
  name: string = "";
  roll: number[] = [];
  effect: string = "";
}

export class MagazineIssueData {
  name: string = "";
  roll: number[] = [];
  effect: string = "";

  static map(original: MagazineIssueData): MagazineIssue {
    let result = new MagazineIssue();

    result.name = original.name;
    result.roll = original.roll;
    result.effect = original.effect;

    return result;
  }
}
