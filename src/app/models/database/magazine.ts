export class Magazine {
  name: string = "";
  roll: number = 0;
  rare: boolean = false;
  issue: string = "";
  issueRoll: number[] = [];
  effect: string = "";
}

export class MagazineData {
  name: string = "";
  roll: number = 0;
  rare: boolean = false;
  perk: string = "";
  issues: MagazineIssueData[] = [];

  static map(original: MagazineData): Magazine[] {
    let result = [];

    if (original.issues.length > 0) {
      for (let issue of original.issues) {
        let newIssue = new Magazine();
        newIssue.name = original.name;
        newIssue.roll = original.roll;
        newIssue.rare = original.rare;
        newIssue.effect = issue.effect;
        newIssue.issue = issue.name;
        newIssue.issueRoll = issue.roll;
        result.push(newIssue);
      }
    }
    else {
      let main = new Magazine();
      main.name = original.name;
      main.roll = original.roll;
      main.rare = original.rare;
      main.effect = original.perk;
      result.push(main);
    }

    return result;
  }
}

export class MagazineIssueData {
  name: string = "";
  roll: number[] = [];
  effect: string = "";
}
