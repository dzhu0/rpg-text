import player from "./player.js"
import weapons from "./weapons.js"
import monsters from "./monsters.js"
import locations from "./locations.js"

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

const Player = { ...player }
let Monster = null

updatePlayerStats()
updateLocation(0)

function handleCommand(command) {
	switch (command.action) {
		case "GO_TO":
			updateLocation(command.location)
			break
		case "FIGHT":
			updateLocation(command.location)
			fightMonster(command.monster)
			break
		case "BUY_HEALTH":
			buyHealth()
			break
		case "BUY_WEAPON":
			buyWeapon()
			break
		case "SELL_WEAPON":
			sellWeapon()
			break
		case "ATTACK":
			attack()
			break
		case "DODGE":
			dodge()
			break
		case "RESTART":
			restartGame()
			break
	}
}

function updateLocation(id) {
	const { commands, text } = getLocation(id)

	btn1.onclick = () => handleCommand(commands[0])
	btn2.onclick = () => handleCommand(commands[1])
	btn3.onclick = () => handleCommand(commands[2])

	btn1.innerText = commands[0].text
	btn2.innerText = commands[1].text
	btn3.innerText = commands[2].text

	textEl.innerText = text

	monsterStatsEl.style.display = "none"
	Monster = null
}

function fightMonster(id) {
	Monster = { ...getMonster(id) }

	updateMonsterStats()

	monsterStatsEl.style.display = "flex"
}

function buyHealth() {
	if (Player.gold >= 10) {
		Player.gold -= 10
		Player.health += 10
		updatePlayerStats()
	} else {
		textEl.innerText = "You do not have enough gold to buy health."
	}
}

function buyWeapon() {
	if (Player.inventory.length < weapons.length) {
		if (Player.gold >= 30) {
			Player.gold -= 30
			updatePlayerStats()
			Player.inventory.unshift({ ...weapons[Player.inventory.length] })
			textEl.innerText = `You now have a ${Player.inventory[0].name}. In your inventory you have: ${Player.inventory.map(({ name }) => name).join(", ")}.`
		} else {
			textEl.innerText = "You do not have enought gold to buy a weapon."
		}
	} else {
		textEl.innerText = "You already have the most powerful weapon!"

		btn2.onclick = () => handleCommand({ action: "SELL_WEAPON" })
		btn2.innerText = "Sell weapon (15 gold)"
	}
}

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

function attack() {
	textEl.innerText = `The ${Monster.name} attacks. You attack with your ${Player.inventory[0].name}.`

	if (isMonsterHit()) {
		Monster.health -= getPlayerAttackValue()
	} else {
		textEl.innerText += " You miss."
	}

	Player.health -= getMonsterAttackValue()

	updatePlayerStats()
	updateMonsterStats()

	if (Player.health <= 0) {
		updateLocation(Monster.win)
	} else if (Monster.health <= 0) {
		defeatMonster()
		updateLocation(Monster.lose)
	}

	if (Math.random() < .1 && Player.inventory.length > 1) {
		textEl.innerText += ` Your ${Player.inventory.shift().name} breaks.`
	}
}

function getMonsterAttackValue() {
	const attackValue = Monster.level * 2 - Math.floor(Math.random() * Player.xp)
    return Math.max(attackValue, 0)
}

function getPlayerAttackValue() {
	return Player.inventory[0].power + Math.floor(Math.random() * Player.xp)
}

function isMonsterHit() {
	return Math.random() > 0.2 || Player.health < 20
}

function defeatMonster() {
	Player.gold += Math.floor(Monster.level * 6.9)
	Player.xp += Monster.level
	updatePlayerStats()
}

function dodge() {
	textEl.innerText = `You dodge the attack from the ${Monster.name}.`
}

function restartGame() {
	window.location.reload()
}

function getLocation(id) {
	return locations.find(location => location.id === id)
}

function getMonster(id) {
	return monsters.find(monster => monster.id === id)
}

function updateMonsterStats() {
	monsterNameEl.innerText = Monster.name
	monsterHealthEl.innerText = Monster.health
}

function updatePlayerStats() {
	if (Player.health < 0) {
		Player.health = 0
	}

	playerXpEl.innerText = Player.xp
	playerGoldEl.innerText = Player.gold
	playerHealthEl.innerText = Player.health
}
