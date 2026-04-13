export class Origin {
  name: string = "";
  trait: Trait = new Trait();
}

export class OriginData {
  name: string = "";
  trait: TraitData = new TraitData();

  static map(original: OriginData): Origin {
    let result = new Origin();

    result.name = original.name;
    result.trait = TraitData.map(original.trait);

    return result;
  }
}

export class Trait {
  name: string = "";
  description: string = "";
  effect: any;
}

export class TraitData {
  name: string = "";
  description: string = "";
  effectName: string = "";

  static map(original: TraitData): Trait {
    let result = new Trait();

    result.name = original.name;
    result.description = original.description;
    result.effect = original.effectName; // todo

    return result;
  }
}
