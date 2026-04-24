export class CombatState {
  head: BodyPart = new BodyPart();
  leftArm: BodyPart = new BodyPart();
  rightArm: BodyPart = new BodyPart();
  torso: BodyPart = new BodyPart();
  leftLeg: BodyPart = new BodyPart();
  rightLeg: BodyPart = new BodyPart();

  constructor(saveData?: CombatStateSaveData) {
    if (saveData) {
      this.head.hp = saveData.head;
      this.leftArm.hp = saveData.leftArm;
      this.rightArm.hp = saveData.rightArm;
      this.torso.hp = saveData.torso;
      this.leftLeg.hp = saveData.leftLeg;
      this.rightLeg.hp = saveData.rightLeg;
    }
  }
}

export class BodyPart {
  hp: number = 0;
  
  physicalRes: number = 0;
  energyRes: number = 0;
  radRes: number = 0;

  clothing: string[] = [];
  armor: string[] = [];
}

export class CombatStateSaveData {
  head: number;
  leftArm: number;
  rightArm: number;
  torso: number;
  leftLeg: number;
  rightLeg: number;

  constructor(original: CombatState) {
    this.head = original.head.hp;
    this.leftArm = original.leftArm.hp;
    this.rightArm = original.rightArm.hp;
    this.torso = original.torso.hp;
    this.leftLeg = original.leftLeg.hp;
    this.rightLeg = original.rightLeg.hp;
  }
}
