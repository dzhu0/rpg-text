// Importing modules for the game (player, weapons, monsters, locations)
import player from "./player.js"
import weapons from "./weapons.js"
import monsters from "./monsters.js"
import locations from "./locations.js"

// Retrieving HTML elements for player stats, buttons, and monster information
const playerXpEl = document.getElementById("player-xp")
const playerHealthEl = document.getElementById("player-health")
const playerGoldEl = document.getElementById("player-gold")
const btn1 = document.getElementById("btn-1")
const btn2 = document.getElementById("btn-2")
const btn3 = document.getElementById("btn-3")
const monsterStatsEl = document.getElementById("stats-monster")
const monsterNameEl = document.getElementById("monster-name")
const monsterHealthEl = document.getElementById("monster-health")
const textEl = document.getElementById("text")

// Creating a copy of the player object
const Player = { ...player }
// Initializing the Monster variable to null
let Monster = null

// Initializing player stats and starting location
updatePlayerStats()
updateLocation(0)

// Function to handle different game commands
function handleCommand(command) {
	switch (command.action) {
		// Handling location change
		case "GO_TO":
			updateLocation(command.location)
			break
		// Handling monster encounter
		case "FIGHT":
			updateLocation(command.location)
			fightMonster(command.monster)
			break
		// Handling health purchase
		case "BUY_HEALTH":
			buyHealth()
			break
		// Handling weapon purchase
		case "BUY_WEAPON":
			buyWeapon()
			break
		// Handling weapon selling
		case "SELL_WEAPON":
			sellWeapon()
			break
		// Handling player attack
		case "ATTACK":
			attack()
			break
		// Handling player dodge
		case "DODGE":
			dodge()
			break
		// Handling game restart
		case "RESTART":
			restartGame()
			break
	}
}

// Function to update location and associated UI elements
function updateLocation(id) {
	const { commands, text } = getLocation(id)

	// Assigning event handlers to buttons and updating button text
	btn1.onclick = () => handleCommand(commands[0])
	btn2.onclick = () => handleCommand(commands[1])
	btn3.onclick = () => handleCommand(commands[2])

	btn1.innerText = commands[0].text
	btn2.innerText = commands[1].text
	btn3.innerText = commands[2].text

	// Updating game text
	textEl.innerText = text

	// Hiding monster stats by default
	monsterStatsEl.style.display = "none"
	Monster = null
}

// Function to initiate a fight with a monster
function fightMonster(id) {
	Monster = { ...getMonster(id) }

	// Updating monster stats UI
	updateMonsterStats()

	// Displaying monster stats
	monsterStatsEl.style.display = "flex"
}

// Function to handle health purchase
function buyHealth() {
	if (Player.gold >= 10) {
		Player.gold -= 10
		Player.health += 10
		updatePlayerStats()
	} else {
		textEl.innerText = "You do not have enough gold to buy health."
	}
}

// Function to handle weapon purchase
function buyWeapon() {
	if (Player.inventory.length < weapons.length) {
		if (Player.gold >= 30) {
			Player.gold -= 30
			updatePlayerStats()
			Player.inventory.unshift({ ...weapons[Player.inventory.length] })
			textEl.innerText = `You now have a ${Player.inventory[0].name}. In your inventory you have: ${Player.inventory.map(({ name }) => name).join(", ")}.`
		} else {
			textEl.innerText = "You do not have enough gold to buy a weapon."
		}
	} else {
		textEl.innerText = "You already have the most powerful weapon!"

		// Updating button functionality to sell weapon
		btn2.onclick = () => handleCommand({ action: "SELL_WEAPON" })
		btn2.innerText = "Sell weapon (15 gold)"
	}
}

// Function to handle weapon selling
function sellWeapon() {
	if (Player.inventory.length > 1) {
		const oldestWeapon = Player.inventory.pop()
		Player.gold += 15
		updatePlayerStats()
		textEl.innerText = `You sold a ${oldestWeapon.name}. In your inventory you have: ${Player.inventory.map(({ name }) => name).join(", ")}.`
	} else {
		textEl.innerText = "Don't sell your only weapon!"
	}
}

// Function to handle player attack
function attack() {
	// Displaying attack information
	textEl.innerText = `The ${Monster.name} attacks. You attack with your ${Player.inventory[0].name}.`

	// Checking if the monster is hit
	if (isMonsterHit()) {
		Monster.health -= getPlayerAttackValue()
	} else {
		textEl.innerText += " You miss."
	}

	// Deducting player health based on monster attack
	Player.health -= getMonsterAttackValue()

	// Updating player and monster stats UI
	updatePlayerStats()
	updateMonsterStats()

	// Checking for game outcomes (player or monster defeat)
	if (Player.health <= 0) {
		updateLocation(Monster.win)
	} else if (Monster.health <= 0) {
		defeatMonster()
		updateLocation(Monster.lose)
	}

	// Random chance for a weapon to break
	if (Math.random() < 0.1 && Player.inventory.length > 1) {
		textEl.innerText += ` Your ${Player.inventory.shift().name} breaks.`
	}
}

// Function to calculate monster attack value
function getMonsterAttackValue() {
	const attackValue = Monster.level * 2 - Math.floor(Math.random() * Player.xp)
	return Math.max(attackValue, 0)
}

// Function to calculate player attack value
function getPlayerAttackValue() {
	return Player.inventory[0].power + Math.floor(Math.random() * Player.xp)
}

// Function to determine if the monster is hit by the player
function isMonsterHit() {
	return Math.random() > 0.2 || Player.health < 20
}

// Function to handle defeating a monster
function defeatMonster() {
	Player.gold += Math.floor(Monster.level * 6.9)
	Player.xp += Monster.level
	updatePlayerStats()
}

// Function to handle player dodge
function dodge() {
	textEl.innerText = `You dodge the attack from the ${Monster.name}.`
}

// Function to restart the game
function restartGame() {
	window.location.reload()
}

// Function to retrieve location information
function getLocation(id) {
	return locations.find(location => location.id === id)
}

// Function to retrieve monster information
function getMonster(id) {
	return monsters.find(monster => monster.id === id)
}

// Function to update monster stats UI
function updateMonsterStats() {
	monsterNameEl.innerText = Monster.name
	monsterHealthEl.innerText = Monster.health
}

// Function to update player stats UI
function updatePlayerStats() {
	// Ensuring player health doesn't go below zero
	if (Player.health < 0) {
		Player.health = 0
	}

	// Updating player stats displayed on the UI
	playerXpEl.innerText = Player.xp
	playerGoldEl.innerText = Player.gold
	playerHealthEl.innerText = Player.health
}
