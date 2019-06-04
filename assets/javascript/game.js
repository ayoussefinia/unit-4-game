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
// 33% your attack will be  - 50% as strong as your "player power"
// 33% your attack will be - 75% as strong as your "player power"
// 33% your attack will be - 100% as strong as your "player power"


// your player power increases with each victory by absorbing 10 percent of your defeated victims player powder

// when you attack there will be a 50% probability of a hit
//ergo 50% chance miss


// the attacker can attack down or attack up. the computer with randomly select the down or up position. if the computer selects up and the attacker attacks up you will hit and trigger the attack power calculation mentioned Above 

// if you attack up and the computer dodges the attack by selecting down you miss and inflict zero damage

// after each attack the computer gets a chance to respond. in defense mode you get to choose weather to occupy the up position or the down position. the same logic occurs for the probability of a hit. 

// player will discover better chances if they choose a stronger character and a weak oponent on the first few matches 

//global vars

let stormTrooper = {
  "id" : 1,
  "name" : "Storm Trooper",
  "life" : 350,
  "power" : 160,
  "position":1,
  "initialPower" : 160,
  "absorbed" : 32,
  "initialLife" : 350
}
let yoda = {
  "id" : 2,
  "name" : "Yoda",
  "life" : 350,
  "power" : 270,
  "position":1,
  "initialPower" : 270,
  "absorbed" : 54,
  "initialLife" : 350
}

let bobaFet = {
  "id":3,
  "name" : "Boba Fet",
  "life" : 350,
  "power" : 190,
  "position":1,
  "initialPower" : 190,
  "absorbed" : 38,
  "initialLife" : 350
}
let jabba = {
  "id" : 4,
  "name" : "Jabba the Hutt",
  "life" : 350,
  "power" : 220,
  "position":1,
  "initialPower" : 220,
  "absorbed" : 44,
  "initialLife" : 350
}

let vader = {
  "id" : 5,
  "name" : "Darth Vader",
  "life" : 350,
  "power" : 250,
  "position":1,
  "initialPower" : 250,
  "absorbed" : 50,
  "initialLife" : 350
}

let playerOneChosen = false;
let opponentChosen = false;
let attackMode = true;
let numberOfOpponents = 4;
let playerOneId;
let player;
let computer;





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

function removeStatsContainer(character) {
  character.classList.remove('chosen-character');
  let characterPic = character.children[1];
  gameWindow.removeChild(character);
  console.log(characterPic);
 
  // gameWindow.removeChild(character);
  characterContainer.appendChild(characterPic);

 

  // gameWindow.removeChild(character);
  // characterContainer.appendChild(character)
};



//creates the instruction box below the characters 
let instrunctionBox = document.createElement('div');
instrunctionBox.classList.add('instruction-box');
instrunctionBox.innerHTML =`<h1 id='instruction-message'>Choose A Character to Begin</h1>
<h1 id='instruction-message2'></h1>`;
gameWindow.appendChild(instrunctionBox);

function attackHandler(user) {
  let randomAttack = Math.random();
  let attackPower;
  if(randomAttack <= .333) {
    attackPower = (user.power)*.5;
  } else if( .333 > randomAttack <= .666) {
    attackPower = (user.power)*.75;
  } else if(randomAttack > .666) {
    attackPower = (user.power)
  }
  return Math.floor(attackPower);
}

//messages display
function messageHandler(message, character, damage) {
  if(message == 'initial') {
    document.getElementById('instruction-message').textContent = `you chose ${character.name}`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Choose Your Opponent`}, 1000);
  } else if (message == 'second') {
    document.getElementById('instruction-message2').textContent = '';
    document.getElementById('instruction-message').textContent = `your opponent is ${character.name}`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Click Below to Attack!!!`}, 1200);
  } else if (message == 'hit'){
    document.getElementById('instruction-message').textContent =`You hit ${character.name} and inflicted ${damage} damage`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Select a defense position`}, 1200);
  } else if (message == 'miss') {
    document.getElementById('instruction-message').textContent =`You missed ${character.name}`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Select a defense position`}, 1200);
  } else if (message == 'dodge') {
    document.getElementById('instruction-message').textContent =`You dodged ${character.name}'s attack`;
    document.getElementById('instruction-message2').textContent = '';
  } else if (message == 'hurt') {
    document.getElementById('instruction-message').textContent =`${character.name} attacked you and inflicted ${damage} damage`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Select a defense position`}, 1200);
  } else if (message == 'loose') {
    document.getElementById('instruction-message').textContent =`GAME OVER`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Select A Character to Play Again`}, 1200);
  } else if (message == 'win') {
    document.getElementById('instruction-message').textContent =`You Beat ${character.name} and absorbed ${character.absorbed} Life Force`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `Select Your Nex Opponent`}, 1200);
  } else if (message = 'game over win') {
    document.getElementById('instruction-message').textContent =`Congrats!!! You Beat the Game`;
    setTimeout(function(){document.getElementById('instruction-message2').textContent = `refresh page or wait ten seconds to play again`}, 1200);
  }


 }

 // creates both the attack & defense buttons outside the event listener and sets display to none

 var buttonsBox = document.createElement('div');
  buttonsBox.classList.add('buttons-box');
  gameWindow.appendChild(buttonsBox);
  //creates parent div for defense buttons
  var defenseButtons = document.createElement('div');
  defenseButtons.classList.add('defense-buttons');
  buttonsBox.appendChild(defenseButtons);

  //defense buttons
  var defendUp = document.createElement('div');
  defendUp.setAttribute('id', 'defend-up');
  defenseButtons.appendChild(defendUp);
  
  var defendUpButton = document.createElement('button');
  defendUpButton.setAttribute('id', 'defend-up-button');
  defendUpButton.textContent = "Defend Up";
  defendUp.appendChild(defendUpButton);

  var defendDown = document.createElement('div');
  defendDown.setAttribute('id', 'defend-down');
  defenseButtons.appendChild(defendDown);

  var defendDownButton = document.createElement('button');
  defendDownButton.setAttribute('id', 'defend-down-button');
  defendDownButton.textContent = "Defend Down";
  defendDown.appendChild(defendDownButton);
  
  //player attacks first
  

  
  var attackButtons = document.createElement('div');
  attackButtons.classList.add('attack-buttons');
  buttonsBox.appendChild(attackButtons);

  var attackUp = document.createElement('div');
  attackUp.setAttribute('id', 'attack-up');
  attackButtons.appendChild(attackUp);
 

  var attackUpButton = document.createElement('button');
  attackUpButton.setAttribute('id', 'attack-up-button');
  attackUpButton.textContent = "Attack Up";
  attackUp.appendChild(attackUpButton);

  var attackDown = document.createElement('div');
  attackDown.setAttribute('id', 'attack-down');
  attackButtons.appendChild(attackDown);
  
  var attackDownButton = document.createElement('button');
  attackDownButton.setAttribute('id', 'attack-down-button');
  attackDownButton.textContent = "Attack Down";
  attackDown.appendChild(attackDownButton);

  defenseButtons.style.display = 'none';
  attackButtons.style.display = 'none';

//*************EVENT LISTENR**************************************/
document.getElementsByClassName('body-container')[0].addEventListener('click', function(event) {
  console.log("clicked");
  console.log("number of opponents: " +numberOfOpponents);
if (numberOfOpponents > 0 ) {

//user needs to pick a character first that will appear on the left side of the screen
  if(playerOneChosen == false && opponentChosen == false) {
      playerOneId = event.target.id;
    if(playerOneId == 'character1') {
      userCharacter = stormTrooper;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);
      
      player = createCharacterStatsContainer(userCharacter, stormTrooperPicture);
      player.classList.add('position-one');
     
      statsHandler(userCharacter);
    } else if(playerOneId == 'character2') {
      userCharacter = yoda;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);

      player = createCharacterStatsContainer(userCharacter,yodaPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    }else if(playerOneId == 'character3') {
      userCharacter = bobaFet;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);

      player = createCharacterStatsContainer(userCharacter, bobaFetPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    }else if(playerOneId == 'character4') {
      userCharacter = jabba;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);

      player = createCharacterStatsContainer(userCharacter, jabbaPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    }
    else if(playerOneId == 'character5') {
      userCharacter = vader;
      playerOneChosen = true;
      messageHandler('initial', userCharacter);

      player = createCharacterStatsContainer(userCharacter, vaderPicture);
      player.classList.add('position-one');
      statsHandler(userCharacter);
    };
  }
 
  //if the user has chosen he needs to then pick his opponent who will appar on the right side of the screen;
  if (playerOneChosen == true && opponentChosen == false && event.target.id != playerOneId) {
    computerId = event.target.id;

    if(computerId == 'character1') {
      computerCharacter = stormTrooper;
      opponentChosen = true;
      messageHandler('second', computerCharacter);
      computer = createCharacterStatsContainer(computerCharacter, stormTrooperPicture);
      computer.classList.add('position-three');
      computerCharacter.position  = 3;
      statsHandler(computerCharacter);
    }else if (computerId == 'character2') {
      opponentChosen = true;
      computerCharacter = yoda;
      messageHandler('second', computerCharacter);
      computer = createCharacterStatsContainer(computerCharacter, yodaPicture);
      computer.classList.add('position-three');
      computerCharacter.position  = 3;
      statsHandler(computerCharacter);
    }else if (computerId == 'character3') {
      opponentChosen = true;
      computerCharacter = bobaFet;
      messageHandler('second', computerCharacter);
      computer = createCharacterStatsContainer(computerCharacter, bobaFetPicture);
      computer.classList.add('position-three');
      computerCharacter.position  = 3;
      statsHandler(computerCharacter);
    }else if (computerId == 'character4') {
      opponentChosen = true;
      computerCharacter = jabba;
      messageHandler('second', computerCharacter);
      computer = createCharacterStatsContainer(computerCharacter, jabbaPicture);
      computer.classList.add('position-three');
      computerCharacter.position  = 3;
      statsHandler(computerCharacter);
    }else if (computerId == 'character5') {
      opponentChosen = true;
      computerCharacter = vader;
      messageHandler('second', computerCharacter);
      computer = createCharacterStatsContainer(computerCharacter, vaderPicture);
      computer.classList.add('position-three');
      computerCharacter.position  = 3;
      statsHandler(computerCharacter);
    }
  }

  //if its the users turn to attack
  if (playerOneChosen == true && opponentChosen == true && attackMode== true) {
    
    
    attackButtons.style.display = 'flex';
    defenseButtons.style.display = 'none';
    
///control z unil here

  
    if(event.target.id == 'attack-up-button' && userCharacter.life > 0 && computerCharacter.life > 0){
      attackMode =false;
      attackButtons.style.display ="none";
      defenseButtons.style.display = "flex";
      //random swich decides if the computer wants to defend up or dow
      randomSwitch = Math.random();
      if(randomSwitch < .5) {
        computerCharacter.position = 4;
        computer.classList.remove('position-three');
        computer.classList.add('position-four');
        messageHandler('miss', computerCharacter);

       

       
      } else if (randomSwitch >= .5) {
        attackStrength = attackHandler(userCharacter);
        messageHandler('hit', computerCharacter, attackStrength)
        computerCharacter.life = computerCharacter.life - attackStrength;
        if (userCharacter.life <= 0 ) {
          console.log('inside the loose handler');
           messageHandler('loose');
           player.classList.remove('position-one');
           player.classList.remove('position-two');
           computer.classList.remove('position-three');
           computer.classList.remove('position-four');
           attackButtons.style.display ="none";
           defenseButtons.style.display = "none";
           removeStatsContainer(player);
           removeStatsContainer(computer);
           userCharacter.life = userCharacter.initialLife;
           userCharacter.power = userCharacter.initialPower;
           computerCharacter.life = computerCharacter.initialLife;
           computerCharacter.power = computerCharacter.initialPower;

           playerOneChosen = false;
           opponentChosen = false;
        } else if (computerCharacter.life <= 0) {
          console.log("insidethe win handler: "+ computer);
          messageHandler('win', computerCharacter);
          player.classList.remove('position-two');
          player.classList.add('position-one');
          gameWindow.removeChild(computer);
          userCharacter.life = userCharacter.initialLife + computerCharacter.absorbed;
          userCharacter.power = userCharacter.initialPower;
          attackButtons.style.display ="none";
          defenseButtons.style.display = "none";
          opponentChosen = false;
          attackMode = true;
          numberOfOpponents = numberOfOpponents -1;
          if (numberOfOpponents == 0) {
            messageHandler('game over win');
          }
        }
      }
      
    } else if (event.target.id == 'attack-down-button' && userCharacter.life > 0 && computerCharacter.life > 0) {
      attackMode =false;
      attackButtons.style.display ="none";
      defenseButtons.style.display = "flex";
      //random swich decides if the computer wants to defend up or dow
      randomSwitch = Math.random();
      if(randomSwitch < .5) {
        computerCharacter.position = 4;
        computer.classList.remove('position-three');
        computer.classList.add('position-four');
        attackStrength = attackHandler(userCharacter);
        messageHandler('hit', computerCharacter, attackStrength);
        computerCharacter.life = computerCharacter.life - attackStrength;
        if (userCharacter.life <= 0 ) {
          console.log('inside the loose handler');
           messageHandler('loose');
           player.classList.remove('position-one');
           player.classList.remove('position-two');
           computer.classList.remove('position-three');
           computer.classList.remove('position-four');
           attackButtons.style.display ="none";
           defenseButtons.style.display = "none";
           removeStatsContainer(player);
           removeStatsContainer(computer);
           userCharacter.life = userCharacter.initialLife;
           userCharacter.power = userCharacter.initialPower;
           computerCharacter.life = computerCharacter.initialLife;
           computerCharacter.power = computerCharacter.initialPower;
     
           playerOneChosen = false;
           opponentChosen = false;
        } else if (computerCharacter.life <= 0) {
          console.log("insidethe win handler: "+ computer);
          messageHandler('win', computerCharacter);
          player.classList.remove('position-two');
          player.classList.add('position-one');
          gameWindow.removeChild(computer);
          userCharacter.life = userCharacter.initialLife + computerCharacter.absorbed;
          userCharacter.power = userCharacter.initialPower;
          attackButtons.style.display ="none";
          defenseButtons.style.display = "none";
          opponentChosen = false;
          attackMode = true;
          numberOfOpponents = numberOfOpponents -1;
          if (numberOfOpponents == 0) {
            messageHandler('game over win');
          }
        }
       
      } else if (randomSwitch >= .5) {
        computerCharacter.position = 3;
        computer.classList.remove('position-four');
        computer.classList.add('position-three');
        messageHandler('miss', computerCharacter)
  
      }
    }
    // } else if ( userCharacter.life <= 0 ) {
    //   console.log('inside the loose handler');
    //    messageHandler('loose');
    //    player.classList.remove('position-one');
    //    player.classList.remove('postion-two');
    //    computer.classList.remove('position-three');
    //    computer.classList.remove('position-four');
    // } else if (computerCharacter.life <= 0) {
    //   messageHandler('win', computerCharacter);
    // }

    console.log("user life"+ userCharacter.life);
  }

  if (playerOneChosen == true && opponentChosen == true && attackMode== false) {
    attackButtons.style.display = 'none';
    defenseButtons.style.display = 'flex';

   
      if(event.target.id == 'defend-up-button' && userCharacter.life > 0 && computerCharacter.life > 0){
        attackButtons.style.display = 'flex';
        defenseButtons.style.display = 'none';
        attackMode =true;
        player.classList.add('position-one');
        player.classList.remove('position-two');
        userCharacter.position = 2;
        //random swich decides if the computer wants to defend up or dow
        randomSwitch = Math.random();

        if(randomSwitch < .5) {
          messageHandler('dodge', computerCharacter);

        } else if (randomSwitch >= .5) {
          attackStrength = attackHandler(computerCharacter);
          messageHandler('hurt', computerCharacter, attackStrength)
          userCharacter.life = userCharacter.life - attackStrength;
          if (userCharacter.life <= 0 ) {
            console.log('inside the loose handler');
             messageHandler('loose');
             player.classList.remove('position-one');
             player.classList.remove('position-two');
             computer.classList.remove('position-three');
             computer.classList.remove('position-four');
             attackButtons.style.display ="none";
             defenseButtons.style.display = "none";
             removeStatsContainer(player);
             removeStatsContainer(computer);
             userCharacter.life = userCharacter.initialLife;
             userCharacter.power = userCharacter.initialPower;
             computerCharacter.life = computerCharacter.initialLife;
             computerCharacter.power = computerCharacter.initialPower;
    
             playerOneChosen = false;
             opponentChosen = false;
          } else if (computerCharacter.life <= 0) {
            console.log("insidethe win handler: "+ computer);
            messageHandler('win', computerCharacter);
            player.classList.remove('position-two');
            player.classList.add('position-one');
            gameWindow.removeChild(computer);
            userCharacter.life = userCharacter.initialLife + computerCharacter.absorbed;
            userCharacter.power = userCharacter.initialPower;
            attackButtons.style.display ="none";
            defenseButtons.style.display = "none";
            opponentChosen = false;
            attackMode = true;
            numberOfOpponents = numberOfOpponents -1;
            if (numberOfOpponents == 0) {
              messageHandler('game over win');
            }
          }
        }
      } else if(event.target.id == 'defend-down-button' && userCharacter.life > 0 && computerCharacter.life > 0){
        attackButtons.style.display = 'flex';
        defenseButtons.style.display = 'none';
        attackMode =true;
        player.classList.add('position-two');
        player.classList.remove('position-one');
        userCharacter.position = 2;
        //random swich decides if the computer wants to defend up or dow
        randomSwitch = Math.random();
        if(randomSwitch < .5) {
          

          attackStrength = attackHandler(computerCharacter);
          messageHandler('hurt', computerCharacter, attackStrength)
          userCharacter.life = userCharacter.life - attackStrength;
          if (userCharacter.life <= 0 ) {
            console.log('inside the loose handler');
             messageHandler('loose');
             player.classList.remove('position-one');
             player.classList.remove('position-two');
             computer.classList.remove('position-three');
             computer.classList.remove('position-four');
             attackButtons.style.display ="none";
             defenseButtons.style.display = "none";
             removeStatsContainer(player);
             removeStatsContainer(computer);
             userCharacter.life = userCharacter.initialLife;
             userCharacter.power = userCharacter.initialPower;
             computerCharacter.life = computerCharacter.initialLife;
             computerCharacter.power = computerCharacter.initialPower;

             playerOneChosen = false;
             opponentChosen = false;
          } else if (computerCharacter.life <= 0) {
            console.log("insidethe win handler: "+ computer);
            messageHandler('win', computerCharacter);
            player.classList.remove('position-two');
            player.classList.add('position-one');
            gameWindow.removeChild(computer);
            userCharacter.life = userCharacter.initialLife + computerCharacter.absorbed;
            userCharacter.power = userCharacter.initialPower;
            attackButtons.style.display ="none";
            defenseButtons.style.display = "none";
            opponentChosen = false;
            attackMode = true;
            numberOfOpponents = numberOfOpponents -1;
            if (numberOfOpponents == 0) {
              messageHandler('game over win');
            }
          }

        } else if (randomSwitch >= .5) {
          
          messageHandler('dodge', computerCharacter)

        }
      }

    }
  } 

  //reload the stats for after every move
  statsHandler(computerCharacter);
  statsHandler(userCharacter);

  function statsHandler(character) {
    let forceArg = `force-stat${character.id}`;
    let powerArg = `power-stat${character.id}`;
    console.log("forcearg:"+forceArg);
    document.getElementById(forceArg).textContent = character.life;
    document.getElementById(powerArg).textContent = character.power;
  }
  
});
// end Event Listener