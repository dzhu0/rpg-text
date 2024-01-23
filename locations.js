export default [
    {
        id: 0,
        name: "Start",
        commands: [
            {
                text: "Go to Store",
                action: "GO_TO",
                location: 2
            },
            {
                text: "Go to Cave",
                action: "GO_TO",
                location: 3
            },
            {
                text: "Fight Dragon",
                action: "FIGHT",
                location: 4,
                monster: 3
            }
        ],
        text: "Welcome to Dragon Repeller. You must defeat the Dragon that is preventing people from leaving the town. You are in the Town Square. Where do you want to go? Use the buttons above."
    },
    {
        id: 1,
        name: "Town Square",
        commands: [
            {
                text: "Go to Store",
                action: "GO_TO",
                location: 2
            },
            {
                text: "Go to Cave",
                action: "GO_TO",
                location: 3
            },
            {
                text: "Fight Dragon",
                action: "FIGHT",
                location: 4,
                monster: 3
            }
        ],
        text: "You are in the Town Square. You see a sign that says \"Store\"."
    },
    {
        id: 2,
        name: "Store",
        commands: [
            {
                text: "Buy 10 health (10 gold)",
                action: "BUY_HEALTH"
            },
            {
                text: "Buy weapon (30 gold)",
                action: "BUY_WEAPON"
            },
            {
                text: "Go to Town Square",
                action: "GO_TO",
                location: 1
            }
        ],
        text: "You enter the Store."
    },
    {
        id: 3,
        name: "Cave",
        commands: [
            {
                text: "Fight Slime",
                action: "FIGHT",
                location: 4,
                monster: 1
            },
            {
                text: "Fight Fanged Beast",
                action: "FIGHT",
                location: 4,
                monster: 2
            },
            {
                text: "Go to Town Square",
                action: "GO_TO",
                location: 1
            }
        ],
        text: "You enter the Cave. You see some monsters."
    },
    {
        id: 4,
        name: "Fight",
        commands: [
            {
                text: "Attack",
                action: "ATTACK"
            },
            {
                text: "Dodge",
                action: "DODGE"
            },
            {
                text: "Run",
                action: "GO_TO",
                location: 1
            }
        ],
        text: "You are fighting a monster."
    },
    {
        id: 5,
        name: "Kill Monster",
        commands: [
            {
                text: "Go to Town Square",
                action: "GO_TO",
                location: 1
            },
            {
                text: "Go to Town Square",
                action: "GO_TO",
                location: 1
            },
            {
                text: "Go to Town Square",
                action: "GO_TO",
                location: 1
            }
        ],
        text: "The monster screams \"ARG!\" as it dies. You gain experience points and find gold."
    },
    {
        id: 6,
        name: "Lose",
        commands: [
            {
                text: "REPLAY?",
                action: "RESTART"
            },
            {
                text: "REPLAY?",
                action: "RESTART"
            },
            {
                text: "REPLAY?",
                action: "RESTART"
            }
        ],
        text: "You die."
    },
    {
        id: 7,
        name: "Win",
        commands: [
            {
                text: "REPLAY?",
                action: "RESTART"
            },
            {
                text: "REPLAY?",
                action: "RESTART"
            },
            {
                text: "REPLAY?",
                action: "RESTART"
            }
        ],
        text: "You defeat the Dragon! YOU WIN THE GAME!"
    }
]
