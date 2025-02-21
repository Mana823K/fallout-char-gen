export class Origin {
  name: string = "";
  trait: Trait = new Trait();
}

export class Trait {
  name: string = "";
  description: string = "";
  effect: any;
}
