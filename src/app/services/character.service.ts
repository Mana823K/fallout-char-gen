import { Injectable } from "@angular/core";
import { Character } from "../models/character";

@Injectable({
  providedIn: "root"
})
export class CharacterService {
  character: Character = new Character();
}
