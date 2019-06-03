// sets the screen width and height to vewport without scrollbars
var screen = document.getElementsByClassName('body-container').item(0);
console.log(screen);
screen.style.height = window.innerHeight;
screen.style.width = window.innerWidth;

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

//global vars

let stormTrooper = {
  "id" : 1,
  "name" : "Storm Trooper",
  "life" : 350,
  "power" : 160,
  "position":1
}
let yoda = {
  "id" : 2,
  "name" : "Yoda",
  "life" : 350,
  "power" : 270,
  "position":1
}

let bobaFet = {
  "id":3,
  "name" : "Boba Fet",
  "life" : 350,
  "power" : 190,
  "position":1
}
let jabba = {
  "id" : 4,
  "name" : "Jabba the Hutt",
  "life" : 350,
  "power" : 220,
  "position":1
}

let vader = {
  "id" : 5,
  "name" : "Darth Vader",
  "life" : 350,
  "power" : 250,
  "position":1
}

let playerOneChosen = false;
let opponentChosen = false;
let playerOneId;





//this is the html body element and also the entire viewport screen
let gameWindow = document.getElementsByClassName('body-container').item(0);
console.log("gamewindow: "+ gameWindow);

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
  // console.log(characterBox); logs all the divs created if needed
  characterContainer.appendChild(characterBox);
}

let stormTrooperPicture = document.getElementById("character1");
let yodaPicture = document.getElementById('character2');
let bobaFetPicture = document.getElementById('character3');
let jabbaPicture = document.getElementById('character4');
let vaderPicture = document.getElementById('character5');

//sets background images for characters / players and centers them to show character faces
stormTrooperPicture.style.backgroundImage = "url(https://images.unsplash.com/photo-1549651427-1118c06e1e27?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=60)";
stormTrooperPicture.style.backgroundPosition = "50% 40%";
yodaPicture.style.backgroundImage = "url(assets/images/yoda.jpg)";
yodaPicture.style.backgroundPosition = "50% 70%";
bobaFetPicture.style.backgroundImage = "url(assets/images/bobafet.jpg)";
bobaFetPicture.style.backgroundPosition = "50% 25%";
jabbaPicture.style.backgroundImage = "url(assets/images/jabba.jpg)";
jabbaPicture.style.backgroundPosition = "80% 38%";
vaderPicture.style.backgroundImage = "url(assets/images/vader.jpg)";
vaderPicture.style.backgroundPosition = "60% 38%";





//this creates the box outside the character picture that has the stats
function createCharacterStatsContainer(character, characterPic) {
  //centers the character in the stats box
  characterPic.classList.add('chosen-character');

  let characterStatsContainer = document.createElement('div');
  characterStatsContainer.classList.add('stats-container');
  //creates the life force text on top of the character picture
  let lifeForceStat = document.createElement('p');
  lifeForceStat.classList.add('life-force');
  lifeForceStat.innerHTML = `Life Force: <span id="force-stat${character.id}"></span>`;
  // lifeForceStat.style.alignSelf = "flex-start";

  let playerPowerStat = document.createElement('p');
  playerPowerStat.classList.add('player-power');
  playerPowerStat.innerHTML = `Power: <span id="power-stat${character.id}"></span>`;
  // playerPowerStat.style.alignSelf = "flex-end";

  //appends the stats & character image to the stats box
  characterStatsContainer.appendChild(lifeForceStat);
  characterStatsContainer.appendChild(characterPic);
  characterStatsContainer.appendChild(playerPowerStat);
  
  //puts the stats container on the screen
  gameWindow.appendChild(characterStatsContainer);
  return characterStatsContainer;
};

//creates the instruction box below the characters 
let instrunctionBox = document.createElement('div');
instrunctionBox.classList.add('instruction-box');
instrunctionBox.innerHTML =`<h1 id='instruction-message'>Choose A Character to Begin</h1>
<h1 id='instruction-message2'></h1>`;
gameWindow.appendChild(instrunctionBox);

//messages display
function messageHandler(message, character) {
  if(message == 'initial') {
    document.getElementById('instruction-message').textContent = `you chose ${character.name}`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Choose Your Opponent`}, 1000);
  } else if (message == 'second') {
    document.getElementById('instruction-message2').textContent = '';
    document.getElementById('instruction-message').textContent = `your opponent is ${character.name}`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Click Below to Attack!!!`}, 1200);
  }
  
}

//*************EVENT LISTENR**************************************/
document.getElementById('character-container').addEventListener('click', function(event) {
  console.log("clicked");


//user needs to pick a character first
  if(playerOneChosen == false && opponentChosen == false) {
      playerOneId = event.target.id;
    if(playerOneId == 'character1') {
      userCharacter = stormTrooper;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);
      
      let player = createCharacterStatsContainer(userCharacter, stormTrooperPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    } else if(playerOneId == 'character2') {
      userCharacter = yoda;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);

      let player = createCharacterStatsContainer(userCharacter,yodaPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    }else if(playerOneId == 'character3') {
      userCharacter = bobaFet;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);

      let player = createCharacterStatsContainer(userCharacter, bobaFetPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    }else if(playerOneId == 'character4') {
      userCharacter = jabba;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);

      let player = createCharacterStatsContainer(userCharacter, jabbaPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    }
    else if(playerOneId == 'character5') {
      userCharacter = vader;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);

      let player = createCharacterStatsContainer(userCharacter, vaderPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    };
  }
 
  //if the user has chosen he needs to then pick his opponent
  if (playerOneChosen == true && opponentChosen == false && event.target.id != playerOneId) {
    computerId = event.target.id;

    if(computerId == 'character1') {
      computerCharacter = stormTrooper;
      opponentChosen = true;
      messageHandler('second', computerCharacter);
      let computer = createCharacterStatsContainer(computerCharacter, stormTrooperPicture);
      computer.classList.add('position-three');
      statsHandler(computerCharacter);
    }else if (computerId == 'character2') {
      opponentChosen = true;
      computerCharacter = yoda;
      messageHandler('second', computerCharacter);
      let computer = createCharacterStatsContainer(computerCharacter, yodaPicture);
      computer.classList.add('position-three');
      statsHandler(computerCharacter);
    }else if (computerId == 'character3') {
      opponentChosen = true;
      computerCharacter = bobaFet;
      messageHandler('second', computerCharacter);
      let computer = createCharacterStatsContainer(computerCharacter, bobaFetPicture);
      computer.classList.add('position-three');
      statsHandler(computerCharacter);
    }else if (computerId == 'character4') {
      opponentChosen = true;
      computerCharacter = jabba;
      messageHandler('second', computerCharacter);
      let computer = createCharacterStatsContainer(computerCharacter, jabbaPicture);
      computer.classList.add('position-three');
      statsHandler(computerCharacter);
    }else if (computerId == 'character5') {
      opponentChosen = true;
      computerCharacter = vader;
      messageHandler('second', computerCharacter);
      let computer = createCharacterStatsContainer(computerCharacter, vaderPicture);
      computer.classList.add('position-three');
      statsHandler(computerCharacter);
    }
  }

  if (playerOneChosen == true && opponentChosen == true) {
    document.createElement('div');
  }

  function statsHandler(character) {
    let forceArg = `force-stat${character.id}`;
    let powerArg = `power-stat${character.id}`;
    console.log("forcearg:"+forceArg);

    document.getElementById(forceArg).textContent = character.life;
    document.getElementById(powerArg).textContent = character.power;
  }
 
    // document.getElementById("force-stat1").textContent = stormTrooper.life;
    // document.getElementById("power-stat1").textContent = stormTrooper.power;
    // document.getElementById("force-stat2").textContent = yoda.life;
    // document.getElementById("power-stat2").textContent = yoda.power;
  
  


  
});

//