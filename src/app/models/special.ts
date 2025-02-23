import { BehaviorSubject } from "rxjs";

export class Special {
  private _strength: number = 4;
  get strength(): number { return this._strength; }
  public set strength(value: number) {
    this._strength = value;
    this.subject.next(this);
  }

  private _perception: number = 4;
  get perception(): number { return this._perception; }
  public set perception(value: number) {
    this._perception = value;
    this.subject.next(this);
  }

  private _endurance: number = 4;
  get endurance(): number { return this._endurance; }
  public set endurance(value: number) {
    this._endurance = value;
    this.subject.next(this);
  }

  private _charisma: number = 4;
  get charisma(): number { return this._charisma; }
  public set charisma(value: number) {
    this._charisma = value;
    this.subject.next(this);
  }

  private _intelligence: number = 4;
  get intelligence(): number { return this._intelligence; }
  public set intelligence(value: number) {
    this._intelligence = value;
    this.subject.next(this);
  }

  private _agility: number = 4;
  get agility(): number { return this._agility; }
  public set agility(value: number) {
    this._agility = value;
    this.subject.next(this);
  }

  private _luck: number = 4;
  get luck(): number { return this._luck; }
  public set luck(value: number) {
    this._luck = value;
    this.subject.next(this);
  }

  subject = new BehaviorSubject<Special>(this);

  static map(data: SpecialData): Special {
    let result = new Special();

    result.strength = data.strength;
    result.perception = data.perception;
    result.endurance = data.endurance;
    result.charisma = data.charisma;
    result.intelligence = data.intelligence;
    result.agility = data.agility;
    result.luck = data.luck;

    return result;
  }
}

export class SpecialData {
  strength: number = 4;
  perception: number = 4;
  endurance: number = 4;
  charisma: number = 4;
  intelligence: number = 4;
  agility: number = 4;
  luck: number = 4;

  constructor(original: Special) {
    return {
      strength: original.strength,
      perception: original.perception,
      endurance: original.endurance,
      charisma: original.charisma,
      intelligence: original.intelligence,
      agility: original.agility,
      luck: original.luck
    }
  }
}
