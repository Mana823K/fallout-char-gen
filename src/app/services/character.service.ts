import { Injectable } from "@angular/core";
import { Character, CharacterSaveData } from "../models/character/character";
import { DataService } from "./data.service";
import { SpecialSaveData } from "../models/character/special";

@Injectable({
  providedIn: "root"
})
export class CharacterService {
  character = new Character();

  extraSpecialPoints: number = 0;
  extraSkillTags: number = 0;
  extraSkillRanks: number = 0;
  hpModifier: number = 1;
  carryWeightModifier: number = 0;

  constructor(private dataService: DataService) { }

  init() {
    this.character.skills = this.dataService.skills;
    this.character.perks = this.dataService.perks;
    const storedData = localStorage.getItem(Character.STORAGE_NAME)
    if (storedData) {
      let characterData: CharacterSaveData = JSON.parse(storedData);
      this.character.origin = this.dataService.origins.find(x => x.name == characterData.origin);
      this.character.level = characterData.level ?? this.character.level;
      this.character.special = characterData.special ? SpecialSaveData.map(characterData.special) : this.character.special;


      for (let savedPerk of characterData.perks ?? []) {
        let perk = this.character.perks.find(x => x.name == savedPerk.name);
        if (perk) {
          perk.ranks = savedPerk.ranks;
        }
      }

      for (let savedSkill of characterData.skills ?? []) {
        let skill = this.character.skills.find(x => x.name == savedSkill.name);
        if (skill) {
          skill.isTagged = savedSkill.isTagged;
          skill.ranks = savedSkill.ranks;
        }
      }
    }

    this.onChange();

    this.character.onChange.subscribe(this.onChange)
  }

  onChange() {
    this.character.stats.updateStats(this.character.special, this.character.level, this.hpModifier, this.carryWeightModifier);
    
    this.updatePerks();

    let saveData = new CharacterSaveData(this.character);
    localStorage.setItem(Character.STORAGE_NAME, JSON.stringify(saveData));
  }

  updatePerks() {
    this.character.perks.forEach(x => {
      x.updateAvailability(this.character.special, this.character.level);
      if (!x.isAvailable) {
        x.ranks = 0;
      }
    });
    this.character.perksSub.next(this.character.perks);

    let specialPerk = this.character.perks.find(x => x.name == "INTENSE TRAINING");
    if (specialPerk) {
      this.extraSpecialPoints = specialPerk.ranks;
    }

    let hpPerk = this.character.perks.find(x => x.name == "LIFE GIVER");
    if (hpPerk) {
      this.hpModifier = hpPerk.ranks + 1;
    }

    let skillPerk = this.character.perks.find(x => x.name == "SKILLED");
    if (skillPerk) {
      this.extraSkillRanks = skillPerk.ranks * 2;
    }

    let carryWeightPerk = this.character.perks.find(x => x.name == "STRONG BACK");
    if (carryWeightPerk) {
      this.carryWeightModifier = carryWeightPerk.ranks * 25;
    }

    let tagPerk = this.character.perks.find(x => x.name == "TAG!");
    if (tagPerk) {
      this.extraSkillTags = tagPerk.ranks;
    }
  }
}
