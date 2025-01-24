const crypto = require("crypto");
const prompt = require("prompt-sync")();

class Dice {
  constructor(values) {
    if (values.length < 1) {
      throw new Error("Dice must have at least one face.");
    }
    this.values = values;
  }

  roll() {
    const index = crypto.randomInt(0, this.values.length);
    return this.values[index];
  }
}

class DiceParser {
  static parseDice(args) {
    if (args.length < 3) {
      throw new Error("You must provide at least three dice.");
    }

    return args.map((arg) => {
      const values = arg.split(",").map(Number);
      if (values.some(isNaN)) {
        throw new Error(
          `Invalid dice values: ${arg}. Ensure all values are integers.`
        );
      }
      return new Dice(values);
    });
  }
}

class ProbabilityCalculator {
  static calculateProbabilities(dice) {
    const numDice = dice.length;
    const probabilities = Array.from({ length: numDice }, () =>
      Array(numDice).fill(0)
    );

    for (let i = 0; i < numDice; i++) {
      for (let j = i + 1; j < numDice; j++) {
        let winsI = 0,
          winsJ = 0;

        for (const valueI of dice[i].values) {
          for (const valueJ of dice[j].values) {
            if (valueI > valueJ) winsI++;
            else if (valueJ > valueI) winsJ++;
          }
        }

        const total = dice[i].values.length * dice[j].values.length;
        probabilities[i][j] = winsI / total;
        probabilities[j][i] = winsJ / total;
      }
    }

    return probabilities;
  }
}

class TableGenerator {
  static generateTable(probabilities, dice) {
    const header = `\t${dice.map((_, i) => `Dice ${i + 1}`).join("\t")}`;
    const rows = probabilities.map(
      (row, i) => `Dice ${i + 1}\t${row.map((p) => p.toFixed(2)).join("\t")}`
    );
    return [header, ...rows].join("\n");
  }
}

class FairRandomGenerator {
  static generateFairNumber(rangeEnd) {
    const key = crypto.randomBytes(32);
    const computerNumber = crypto.randomInt(0, rangeEnd);
    const hmac = crypto
      .createHmac("sha3-256", key)
      .update(String(computerNumber))
      .digest("hex");
    return { computerNumber, hmac, key };
  }

  static verifyFairness(userNumber, computerNumber, key, rangeEnd) {
    return (userNumber + computerNumber) % rangeEnd;
  }
}

class Game {
  constructor(dice) {
    this.dice = dice;
  }

  displayHelp() {
    const probabilities = ProbabilityCalculator.calculateProbabilities(
      this.dice
    );
    const table = TableGenerator.generateTable(probabilities, this.dice);
    console.log("\nWinning Probabilities Table:");
    console.log(table);
  }

  playTurn(player, diceIndex) {
    const chosenDice = this.dice[diceIndex];
    const roll = chosenDice.roll();
    console.log(`${player} rolled ${roll} using Dice ${diceIndex + 1}`);
    return roll;
  }

  fairRoll() {
    const rangeEnd = Math.max(...this.dice.map((d) => d.values.length));
    const { computerNumber, hmac, key } =
      FairRandomGenerator.generateFairNumber(rangeEnd);
    console.log(`Computer HMAC: ${hmac}`);

    const userNumber = parseInt(
      prompt(`Enter a number between 0 and ${rangeEnd - 1}: `),
      10
    );
    const result = FairRandomGenerator.verifyFairness(
      userNumber,
      computerNumber,
      key,
      rangeEnd
    );
    console.log(
      `Computer number: ${computerNumber}, Key: ${key.toString(
        "hex"
      )}, Result: ${result}`
    );
    return result;
  }

  start() {
    console.log("Welcome to the Non-Transitive Dice Game!");
    while (true) {
      console.log("\nMenu:");
      this.dice.forEach((dice, i) => {
        console.log(`${i + 1}. Use Dice ${i + 1}: [${dice.values.join(",")}]`);
      });
      console.log("H. Help");
      console.log("E. Exit");

      const choice = prompt("Choose an option: ").trim().toUpperCase();
      if (choice === "E") {
        console.log("Thanks for playing!");
        break;
      } else if (choice === "H") {
        this.displayHelp();
      } else if (!isNaN(choice) && choice >= 1 && choice <= this.dice.length) {
        const diceIndex = parseInt(choice, 10) - 1;
        const playerRoll = this.playTurn("Player", diceIndex);
        const computerRoll = this.playTurn(
          "Computer",
          crypto.randomInt(0, this.dice.length)
        );

        if (playerRoll > computerRoll) {
          console.log("Player wins this round!");
        } else if (computerRoll > playerRoll) {
          console.log("Computer wins this round!");
        } else {
          console.log("It's a tie!");
        }
      } else {
        console.log("Invalid choice. Try again.");
      }
    }
  }
}

if (require.main === module) {
  try {
    const args = process.argv.slice(2);
    const dice = DiceParser.parseDice(args);
    const game = new Game(dice);
    game.start();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log("Usage: node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
  }
}
