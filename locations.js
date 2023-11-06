import * as f from "./script.js"

export default {
    "town square": {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [f.goStore, f.goCave, f.fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    "store": {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [f.buyHealth, f.buyWeapon, f.goTown],
        text: "You enter the store."
    },
    "cave": {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [f.fightSlime, f.fightBeast, f.goTown],
        text: "You enter the cave. You see some monsters."
    },
    "fight": {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [f.attack, f.dodge, f.goTown],
        text: "You are fighting a monster."
    },
    "kill monster": {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [f.goTown, f.goTown, f.easterEgg],
        text: "The monster screams \"Arg!\" as it dies. You gain experience points and find gold."
    },
    "lose": {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [f.restart, f.restart, f.restart],
        text: "You die."
    },
    "win": {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [f.restart, f.restart, f.restart],
        text: "You defeat the dragon! YOU WIN THE GAME!"
    },
    "easter egg": {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square?"],
        "button functions": [f.pickTwo, f.pickEight, f.goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
}
