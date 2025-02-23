import { Injectable } from "@angular/core";
import { Origin } from "../models/origin";
import { Perk } from "../models/perk";
import { Skill } from "../models/skill";

@Injectable({
  providedIn: "root"
})
export class DataService {
  origins: Origin[] = [
    {
      name: "Brotherhood Initiate",
      trait: {
        name: "The Chain that Binds",
        description: "You gain one additional Tag skill, which must be one of Energy Weapons, Science, or Repair",
        effect: null
      }
    },
    {
      name: "Ghoul",
      trait: {
        name: "Necrotic Post-Human",
        description: "You are immune to radiation damage. In fact, you’re healed by it—you regain 1 HP for every 3 points of radiation damage inflicted upon you, and if you rest in an irradiated location, you may re-roll your dice pool when checking if your injuries heal. In addition, Survival becomes a Tag skill, increasing it by 2 ranks.",
        effect: null
      }
    },
    {
      name: "Super Mutant",
      trait: {
        name: "Forced Evolution",
        description: "Your initial Strength and Endurance attributes are increased by +2 each, and your maximum Strength and Endurance are increased to 12, but your maximum Intelligence and Charisma are both reduced to 6. You may not have more than 4 ranks in any skill. You are completely immune to radiation and poison damage.",
        effect: null
      }
    },
    {
      name: "Mister Handy",
      trait: {
        name: "Mister Handy Robot",
        description: "You have 360° vision and improved sensory systems that can detect smells, chemicals, and radiation, reducing the difficulty of Perception tests that rely on sight and smell by 1. You are also immune to radiation and poison damage, but you cannot use chems, nor can you benefit from food, drink, or rest. You move by jet propulsion, hovering above the ground, unaffected by difficult terrain or obstacles. Your carry weight is 150 lbs., and it cannot be increased by your Strength or perks, but it can be increased by modified armor. You cannot recover from your own injuries or heal health points without receiving repairs. You cannot manipulate the physical world like humans do, instead you have three of the arm attachments in the Arm Attachments table, determined by your choice of equipment pack. If you select an arm that features a weapon, you also gain 20 shots of ammo for that weapon.",
        effect: null
      }
    },
    {
      name: "Survivor",
      trait: {
        name: "*Selectable*", // todo
        description: "*Selectable*", // todo
        effect: null
      }
    },
    {
      name: "Vault Dweller",
      trait: {
        name: "Vault Kid",
        description: "Your healthier start to life at the hands of trained doctors and sophisticated auto-docs means you reduce the difficulty of all END tests to resist the effects of disease. In addition, your carefully-planned upbringing means you have one additional tag skill of your choice",
        effect: null
      }
    },
  ];

  perks: Perk[] = [
    {
      name: "Action Boy / Girl",
      maxRanks: 1,
      requirements: "None",
      description: "When you spend AP to take an additional major action, you do not suffer the increased skill test difficulty during your second action.",
      ranks: 0,
      isSelected: false
    },
    {
      name: "Adamantium Skeleton",
      maxRanks: 3,
      requirements: "END 7, Level 1+",
      description: "When you suffer damage, the amount of damage needed to inflict a critical hit on you increases by your rank in this perk. For example, if you have one rank in this perk, you suffer a critical hit from 6 or more damage, rather than 5 or more. Each time you take this perk, the level requirement increases by 3",
      ranks: 0,
      isSelected: false
    },
    {
      name: "Adrenalin Rush",
      maxRanks: 1,
      requirements: "STR 7",
      description: "When your health is below its maximum value, you count your STR score as 10 for all purposes when attempting a STR-based skill test or melee attack.",
      ranks: 0,
      isSelected: false
    },
    {
      name: "Animal Friend",
      maxRanks: 2,
      requirements: "CHA 6, Level 1+",
      description: "At rank 1, whenever a creature NPC with the Mammal, Lizard, or Insect keyword would attack you, roll 1DCD  : on any result other than an Effect, the creature chooses not to attack you, although it may still attack another character it can target",
      ranks: 0,
      isSelected: false
    },
    {
      name: "Aquaboy / Aquabirl",
      maxRanks: 2,
      requirements: "END 5, Level 1+",
      description: "Water is your ally. At rank 1, you no longer take radiation damage from swimming in irradiated water, and you can hold your breath for twice as long as normal. At rank 2, enemies add +2 to the difficulty to tests to detect you while you are submerged underwater. Each time you take this perk, the level requirement increases by 3.",
      ranks: 0,
      isSelected: false
    },
    {
      name: "Armorer",
      maxRanks: 4,
      requirements: "STR 5, INT 6",
      description: "You can modify armor with armor mods. Each rank in this perk unlocks an additional rank of mods: rank 1 unlocks rank 1 mods, rank 2 unlocks rank 2 mods, etc",
      ranks: 0,
      isSelected: false
    },
    {
      name: "Awareness",
      maxRanks: 1,
      requirements: "PER 7",
      description: "When you take the Aim minor action at a target within Close range, you spot their weaknesses and can attack more efficiently. The next attack you make against that target gains the Piercing 1 damage effect, or improves the rating of any existing Piercing X damage effect by 1",
      ranks: 0,
      isSelected: false
    },
  ];

  skills: Skill[] = [
    {
      name: "Athletics",
      attribute: "STR",
      detail: "Lifting, pushing, pulling, jumping, running, and swimming",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Barter",
      attribute: "CHA",
      detail: "Buying and selling",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Big Guns",
      attribute: "END",
      detail: "Using heavy weapons such as miniguns, Fat Mans, gatling lasers, and gauss weapons",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Energy Weapons",
      attribute: "PER",
      detail: "Using energy weapons such as laser guns, plasma guns, and gauss weapons",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Explosives",
      attribute: "PER",
      detail: "Blowing things up, or stopping them from doing that",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Lockpick",
      attribute: "PER",
      detail: "Opening locks without the key",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Medicine",
      attribute: "INT",
      detail: "Healing people and stabilizing the dying",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Melee Weapons",
      attribute: "STR",
      detail: "Fighting people with bats, clubs, knives, boards, wrenches, and sledges",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Pilot",
      attribute: "PER",
      detail: "Flying and driving",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Repair",
      attribute: "INT",
      detail: "Fixing stuff, crafting things, and building machines",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Science",
      attribute: "INT",
      detail: "Hacking, programming, and brewing chems",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Small Guns",
      attribute: "AGI",
      detail: "Shooting people with pistols, rifles, and shotguns",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Sneak",
      attribute: "AGI",
      detail: "Moving quietly and staying hidden",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Speach",
      attribute: "CHA",
      detail: "Making friends, influencing people, and lying to them if you have to",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Survival",
      attribute: "END",
      detail: "Foraging, hunting, cooking, and enduring the wastes",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Throwing",
      attribute: "AGI",
      detail: "Launching weapons from your hands, like spears or knives",
      isTagged: false,
      ranks: 0
    },
    {
      name: "Unarmed",
      attribute: "STR",
      detail: "Fighting without a weapon by making unarmed attacks",
      isTagged: false,
      ranks: 0
    },
  ];
}
