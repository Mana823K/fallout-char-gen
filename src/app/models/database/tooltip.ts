export class Tooltip {
  name: string = "";
  type: TooltipTypeEnum = TooltipTypeEnum.Other
  description: string = "";
}

export class TooltipData {
  name: string = "";
  type: TooltipTypeEnum = TooltipTypeEnum.Other
  description: string = "";

  static map(original: TooltipData): Tooltip {
    let result = new Tooltip();

    result.name = original.name;
    result.type = original.type;
    result.description = original.description;

    return result;
  }
}

export enum TooltipTypeEnum {
  WeaponEffect = "Weapon Effect",
  WeaponQuality = "Weapon Quality",
  ArmorEffect = "Armor Effect",
  BeverageEffect = "Beverage Effect",
  Other = "Other"
}