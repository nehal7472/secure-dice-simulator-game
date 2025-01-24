Non-Transitive Dice Game
This project implements a non-transitive dice game with provably fair random generation, ensuring neither the computer nor the user can cheat. The game allows multiple custom dice configurations, where each die can have arbitrary values and an equal number of faces.

How the Game Works
Dice Configuration

At least three dice configurations are passed as command-line arguments. Each die is represented as a comma-separated list of integers.
Example: 2,2,4,4,9,9, 6,8,1,1,8,6, 7,5,3,7,5,3.
Determining the First Move

The computer and the user perform a "fair random generation" using cryptographic HMAC to determine who chooses their dice first.
HMAC ensures the computer’s choice is secure and verifiable by the user.
Selecting Dice

The first player chooses their dice, and the second player selects a different one.
Dice Throws

Both players "roll" their dice using cryptographically secure random number generation.
The outcome of each throw is calculated based on modular arithmetic, incorporating both the user’s and the computer’s inputs.
Winning the Game

The dice values are compared after each throw. The player with the higher roll wins the round.
Help Menu

A help menu provides an ASCII table showing the probabilities of one die beating another, calculated based on all possible outcomes.
Key Features
Custom Dice Configurations: Supports dice with any number of faces or values.
Fair Random Generation: Uses HMAC and secure random number generation to ensure fairness and prevent cheating.
Detailed Error Handling: Provides clear feedback for invalid inputs or configurations.
Probability Table: Displays the likelihood of one die beating another.
This game combines mathematical strategy and cryptographic fairness, offering an engaging and verifiable experience.

How to Run the Non-Transitive Dice Game
Prerequisites
Node.js Installed:
Make sure you have Node.js installed on your system. You can download it from Node.js official website.

Clone the Repository:
Clone the repository to your local machine:

bash
Copy
Edit
git clone https://github.com/your-username/non-transitive-dice-game.git
cd non-transitive-dice-game
Install Dependencies:
Install any required dependencies using npm:

bash
Copy
Edit
npm install
Running the Game
Launch the Script:
Use the following command to run the game:

bash
Copy
Edit
node game.js <dice1> <dice2> <dice3> [...additional dice]
Replace <dice1>, <dice2>, and <dice3> with valid dice configurations. Each die should be represented as a comma-separated list of integers.

Example:

bash
Copy
Edit
node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
Follow the Instructions:
The game will guide you through:

Determining the first move.
Selecting your dice.
Rolling the dice and comparing results.
Help Option:
During the game, you can type ? to view the probability table, showing the likelihood of one die beating another.

Exit Option:
Type X at any time to exit the game.

Example Commands
Valid Configuration:

bash
Copy
Edit
node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
Invalid Configuration: Running the script with less than three dice or invalid formats will result in an error. Example:

bash
Copy
Edit
node game.js 2,2,4 6,8,1
Output:

javascript
Copy
Edit
Error: You must provide at least three dice with valid configurations (comma-separated integers).

Valid Inputs
Three Dice with Equal Faces

bash
Copy
Edit
node game.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3
Dice 1: [2, 2, 4, 4, 9, 9]
Dice 2: [6, 8, 1, 1, 8, 6]
Dice 3: [7, 5, 3, 7, 5, 3]
Four Identical Dice

bash
Copy
Edit
node game.js 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6
All dice have faces [1, 2, 3, 4, 5, 6].
Custom Values with Six Faces

bash
Copy
Edit
node game.js 10,20,30,40,50,60 1,1,1,1,1,1 6,6,6,6,6,6
Dice can have any integer values, as long as all dice have the same number of faces.
Larger Dice (More Than Six Faces)

bash
Copy
Edit
node game.js 1,2,3,4,5,6,7,8 10,20,30,40,50,60,70,80 2,4,6,8,10,12,14,16
Dice have 8 faces with valid integer values.



Invalid Inputs
Less Than Three Dice

bash
Copy
Edit
node game.js 2,2,4,4,9,9 6,8,1,1,8,6
Error: "You must provide at least three dice with valid configurations."
Mismatched Number of Faces

bash
Copy
Edit
node game.js 2,2,4,4,9,9 6,8,1,1 7,5,3,7,5,3
Error: "All dice must have the same number of faces."
Non-Integer Values

bash
Copy
Edit
node game.js 2,2,4,4,9,9 6,8,1.5,1,8,6 7,5,3,7,5,3
Error: "Dice configurations must contain only integers."
Empty or Missing Values

bash
Copy
Edit
node game.js 2,2,4,4,9,9 ,, 7,5,3,7,5,3
Error: "Dice configurations cannot be empty."
Special Characters or Invalid Formats

bash
Copy
Edit
node game.js 2,2,4,4,9,9 @,8,1,1,8,6 7,5,3,7,5,3
Error: "Invalid dice configuration. Use comma-separated integers only."
