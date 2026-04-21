export class CombatState {
  head: BodyPart = new BodyPart();
  leftArm: BodyPart = new BodyPart();
  rightArm: BodyPart = new BodyPart();
  torso: BodyPart = new BodyPart();
  leftLeg: BodyPart = new BodyPart();
  rightLeg: BodyPart = new BodyPart();
}

export class BodyPart {
  physicalRes: number = 0;
  energyRes: number = 0;
  radRes: number = 0;
  hp: number = 0;
}
