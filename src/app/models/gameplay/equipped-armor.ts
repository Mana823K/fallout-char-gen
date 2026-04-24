import { Armor } from "../database/armor";

export class EquippedArmor {
  constructor(public armor: Armor, public side?: "Left" | "Right") { }
}

export class EquippedArmorSaveData {
  constructor(public armor: string, public side?: "Left" | "Right") { }
}
