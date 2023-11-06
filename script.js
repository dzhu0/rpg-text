import weapons from "./weapons.js"
import monsters from "./monsters.js"
import locations from "./locations.js"

const playerExEl = document.getElementById("player-xp")
const playerHealthEl = document.getElementById("player-health")
const playerGoldEl = document.getElementById("player-gold")
const btn1 = document.getElementById("btn-1")
const btn2 = document.getElementById("btn-2")
const btn3 = document.getElementById("btn-3")
const monsterStatsEl = document.getElementById("stats-monster")
const monsterNameEl = document.getElementById("monster-name")
const monsterHealthEl = document.getElementById("monster-health")
const textEl = document.getElementById("text")

const inventory = ["stick"]

// const player = {
// 	xp: 0,
// 	health: 100,
// 	gold: 50,
// 	weapon: 0,
// 	inventory: ["stick"]
// }

// let monster = {}

let xp = 0
let health = 100
let gold = 50
let currentWeapon = 0
let currentMonster
let monsterHealth

// initialize buttons
btn1.onclick = goStore
btn2.onclick = goCave
btn3.onclick = fightDragon

function update(location) {
	btn1.onclick = location["button functions"][0]
	btn2.onclick = location["button functions"][1]
	btn3.onclick = location["button functions"][2]

	btn1.innerText = location["button text"][0]
	btn2.innerText = location["button text"][1]
	btn3.innerText = location["button text"][2]

	monsterStatsEl.style.display = "none"

	textEl.innerText = location.text
}

export function goTown() {
	update(locations["town square"])
}

export function goStore() {
	update(locations["store"])
}

export function goCave() {
	update(locations["cave"])
}

export function buyHealth() {
	if (gold >= 10) {
		gold -= 10
		health += 10
		playerGoldEl.innerText = gold
		playerHealthEl.innerText = health
	} else {
		textEl.innerText = "You do not have enough gold to buy health."
	}
}

export function buyWeapon() {
	if (currentWeapon < weapons.length - 1) {
		if (gold >= 30) {
			gold -= 30
			currentWeapon++
			playerGoldEl.innerText = gold
			let newWeapon = weapons[currentWeapon].name
			textEl.innerText = "You now have a " + newWeapon + "."
			inventory.push(newWeapon)
			textEl.innerText += " In your inventory you have: " + inventory
		} else {
			textEl.innerText = "You do not have enought gold to buy a weapon."
		}
	} else {
		textEl.innerText = "You already have the most powerful weapon!"
		btn2.innerText = "Sell weapon for 15 gold"
		btn2.onclick = sellWeapon
	}
}

export function sellWeapon() {
	if (inventory.length > 1) {
		gold += 15
		playerGoldEl.innerText = gold
		let currentWeapon = inventory.shift()
		textEl.innerText = "You sold a " + currentWeapon + "."
		textEl.innerText += " In your inventory you have: " + inventory
	} else {
		textEl.innerText = "Don't sell your only weapon!"
	}
}

export function fightSlime() {
	currentMonster = monsters["slime"]
	goFight(monsters["slime"])
}

export function fightBeast() {
	currentMonster = monsters["fanged beast"]
	goFight(monsters["fanged beast"])
}

export function fightDragon() {
	currentMonster = monsters["dragon"]
	goFight(monsters["dragon"])
}

function goFight(monster) {
	update(locations["fight"])
	monsterHealth = monster.health
	monsterStatsEl.style.display = "flex"
	monsterNameEl.innerText = monster.name
	monsterHealthEl.innerText = monsterHealth
}

export function attack() {
	textEl.innerText = "The " + currentMonster.name + " attacks."
	textEl.innerText += " You attack in with your " + weapons[currentWeapon].name + "."

	if (isMonsterHit()) {
		health -= getMonsterAttackValue(currentMonster.level)
	} else {
		textEl.innerText += " You miss."
	}

	monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1
	playerHealthEl.innerText = health
	monsterHealthEl.innerText = monsterHealth
	if (health <= 0) {
		lose()
	} else if (monsterHealth <= 0) {
		currentMonster.name === "dragon" ? winGame() : defeatMonster()
	}

	if (Math.random() <= .1 && inventory.length !== 1) {
		textEl.innerText += " Your " + inventory.pop() + " breaks."
		currentWeapon--
	}
}

function getMonsterAttackValue(level) {
	let hit = (level * 5) - (Math.floor(Math.random() * xp))
	return hit
}

function isMonsterHit() {
	return Math.random() > .2 || health < 20
}

export function dodge() {
	textEl.innerText = "You dodge the attack from the " + currentMonster.name + "."
}

function defeatMonster() {
	gold += Math.floor(currentMonster.level * 6.7)
	xp += currentMonster.level
	playerGoldEl.innerText = gold
	playerExEl.innerText = xp
	update(locations["kill monster"])
}

function lose() {
	update(locations["lose"])
}

function winGame() {
	update(locations["win"])
}

export function restart() {
	window.location.reload()
}

export function easterEgg() {
	update(locations["easter gg"])
}

export function pickTwo() {
	pick(2)
}

export function pickEight() {
	pick(8)
}

function pick(guess) {
	let numbers = []
	while (numbers.length < 10) {
		numbers.push(Math.floor(Math.random() * 11))
	}

	textEl.innerText = "You picked " + guess + ". Here are the random numbers:\n"

	for (let i = 0; i < 10; i++) {
		textEl.innerText += numbers[i] + "\n"
	}

	if (numbers.indexOf(guess) !== -1) {
		textEl.innerText += "Right! You win 20 gold!"
		gold += 20
		playerGoldEl.innerText = gold
	} else {
		textEl.innerText += "Wrong! You lose 10 health!"
		health -= 10
		playerHealthEl.innerText = health
		if (health <= 0) {
			lose()
		}
	}
}