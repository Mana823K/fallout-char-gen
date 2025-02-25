export class Perk {
  name: string = "";
  maxRanks: number = 1;
  requiredLevel: number = 0;
  requiredSpecial: PerkRequirement[] = [];
  description: string = "";

  ranks: number = 0;
  isSelected: boolean = false;
}

export class PerkRequirement {
  specialName: string = "";
  points: number = 0;
}
