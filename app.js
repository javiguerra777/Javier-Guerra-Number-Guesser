/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer
- let player choose to play again
*/

// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

//Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
  console.log(1)
})
// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  //validate Input
  if(isNaN(guess)|| guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  //check if won
  if(guess === winningNum){
    //Game over, won
    gameOver(true,`${winningNum} is correct, YOU WON!`);

  } else {
    //wrong number 
    guessesLeft -= 1;

    if(guessesLeft === 0){
      //game over, lost

      gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
     
    } else{
      // game continues, answer wrong

      //clear input
      guessInput.value = '';
      //Tell user that the guess is wrong
      setMessage(`Guess is not correct, ${guessesLeft} guesses left`, 'red');
    }
  }
});

//Game over
function gameOver(won,msg){
  let color;
  won === true ? color = 'green' : color = 'red';

  //disable input
  guessInput.disabled = true;
  //change border color
  guessInput.style.borderColor = color;
  //set text color
  message.style.color = color;
  //Set message
  setMessage(msg);

  //play again
  guessBtn.value ='Play Again';
  guessBtn.className += 'play-again';
}

//Get winning Number
function getRandomNum(min, max){
  return Math.floor(Math.random() * (max-min + 1) + min);
}
//Set message 
function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}
