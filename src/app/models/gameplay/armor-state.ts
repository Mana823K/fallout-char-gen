export type InjuryStatus = "healthy" | "injured" | "treated";

export class CombatState {
  head: BodyPart = new BodyPart();
  leftArm: BodyPart = new BodyPart();
  rightArm: BodyPart = new BodyPart();
  torso: BodyPart = new BodyPart();
  leftLeg: BodyPart = new BodyPart();
  rightLeg: BodyPart = new BodyPart();

  constructor(saveData?: CombatStateSaveData) {
    if (saveData) {
      this.loadPart(this.head, saveData.head);
      this.loadPart(this.leftArm, saveData.leftArm);
      this.loadPart(this.rightArm, saveData.rightArm);
      this.loadPart(this.torso, saveData.torso);
      this.loadPart(this.leftLeg, saveData.leftLeg);
      this.loadPart(this.rightLeg, saveData.rightLeg);
    }
  }

  private loadPart(part: BodyPart, data: BodyPartSaveData | number) {
    if (typeof data === "number") {
      part.hp = data;
    } else {
      part.hp = data.hp;
      part.injuryStatus = data.injuryStatus ?? "healthy";
    }
  }
}

export class BodyPart {
  physicalRes: number = 0;
  energyRes: number = 0;
  radRes: number = 0;
  hp: number = 0;
  injuryStatus: InjuryStatus = "healthy";
}

export class BodyPartSaveData {
  hp: number;
  injuryStatus: InjuryStatus;

  constructor(original: BodyPart) {
    this.hp = original.hp;
    this.injuryStatus = original.injuryStatus;
  }
}

export class CombatStateSaveData {
  head: BodyPartSaveData;
  leftArm: BodyPartSaveData;
  rightArm: BodyPartSaveData;
  torso: BodyPartSaveData;
  leftLeg: BodyPartSaveData;
  rightLeg: BodyPartSaveData;

  constructor(original: CombatState) {
    this.head = new BodyPartSaveData(original.head);
    this.leftArm = new BodyPartSaveData(original.leftArm);
    this.rightArm = new BodyPartSaveData(original.rightArm);
    this.torso = new BodyPartSaveData(original.torso);
    this.leftLeg = new BodyPartSaveData(original.leftLeg);
    this.rightLeg = new BodyPartSaveData(original.rightLeg);
  }
}
