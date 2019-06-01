// sets the screen width and height to vewport without scrollbars
var screen = document.getElementsByClassName('body-container').item(0);
console.log(screen);
screen.style.height = window.innerHeight;
screen.style.width = window.innerWidth;


//top of the page holds the character choices
var characterContainer = document.getElementById('character-container');

//append character (player) divs to character container
for(i=1; i<6; i++) {
  let characterBox = document.createElement("div");
  characterBox.style.width = "80px";
  characterBox.style.height = "80px";
  characterBox.style.background = "cyan";
  characterBox.style.display = "inline-block";
  characterBox.setAttribute("id",`character${i}`);
  console.log(characterBox);
  characterContainer.appendChild(characterBox);
}

//sets background images for characters / players and centers them to show character faces
document.getElementById("character1").style.backgroundImage = "url(https://images.unsplash.com/photo-1549651427-1118c06e1e27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=60)";
document.getElementById("character1").style.backgroundPosition = "50% 40%";
document.getElementById("character2").style.backgroundImage = "url(assets/images/yoda.jpg)";
document.getElementById("character2").style.backgroundPosition = "50% 70%";
document.getElementById("character3").style.backgroundImage = "url(assets/images/bobafet.jpg)";
document.getElementById("character3").style.backgroundPosition = "50% 25%";
document.getElementById("character4").style.backgroundImage = "url(assets/images/jabba.jpg)";
document.getElementById("character4").style.backgroundPosition = "80% 38%";
document.getElementById("character5").style.backgroundImage = "url(assets/images/vader.jpg)";
document.getElementById("character5").style.backgroundPosition = "60% 38%";


// ***GAME LOGIC*******
// first you choose a character to play with. after you choose your character they move to the "your character" section 

// then you choose an opponent from the remaining characters

// your character will make the first attack, the defender will respond in kind, you will trade attacks  with the defender until one of the opponent's "life force" goes to zero. if you win the loosing character is removed from the dom. 

// at this point you absorb 10 % of the opponents life force.

// you win the entire game by defeating each other character with the character you initially chose 

// ***Attacks******

// each character has a "player power" thats differs with yoda being the strongest and the storm trooper being the weakest 

// this player power will be used to calculate the attack power for each attack. 

// there will be a random component to each attack: 
// 25% your attack will be  - 25% as strong as your "player power"
// 25% your attack will be - 50% as strong as your "player power"
// 25% your attack will be - 75% as strong as your "player power"
// 25% you will have full  - 100% attack power

// your player power increases with each victory

// when you attack there will be a 50% probability of a hit 

// this is because both the attacker and defender have two positions they can occupy. 

// the attacker can attack down or attack up. the computer with randomly select the down or up position. if the computer selects up and the attacker attacks up you will hit and trigger the attack power calculation mentioned Above 

// if you attack up and the computer dodges the attack by selecting down you miss and inflict zero damage

// after each attack the defender gets a chance to respond. in defense mode you get to choose weather to occupy the up position or the down position. the same logic occurs for the probability of a hit. 

// player will discover better chances if they choose a stronger character and a weak oponent on the first few matches 






