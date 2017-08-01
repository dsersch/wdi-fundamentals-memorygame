console.log("Up and running!");

var cards = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png"
  },
  {
    rank: "queen",
    suit: "diamonds",
    cardImage: "images/queen-of-diamonds.png"
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png"
  },
  {
    rank: "king",
    suit: "diamonds",
    cardImage: "images/king-of-diamonds.png"
  }
];

Array.prototype.shuffle = function() {
  var input = this;
  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1));
    var itemAtIndex = input[randomIndex];

    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};

cards.shuffle();
var cardsInPlay = [];
var totalScore = 0;

var checkForMatch = function() {
  if (cardsInPlay.length === 2) {
    if (cardsInPlay[0] === cardsInPlay[1]) {
      alert("You've found a match!");
      totalScore++;
      console.log("Score: " + totalScore);
      document.getElementById('score').textContent = "TOTAL SCORE: " + totalScore;
    } else {
      alert("Sorry, try again.");
    }
  }
}

var flipCard = function () {
  var cardId = this.getAttribute('data-id');
  console.log("User flipped " + cards[cardId].rank);
  cardsInPlay.push(cards[cardId].rank);
  console.log(cards[cardId].cardImage);
  console.log(cards[cardId].suit);
  this.setAttribute('src', cards[cardId].cardImage);
  checkForMatch();
};

var firstRound = true;

var createBoard = function() {
  if (firstRound === true) {
    for (var i = 0; i < cards.length; i++) {
      var cardElement = document.createElement('img');
      cardElement.setAttribute('src', 'images/back.png');
      cardElement.setAttribute('data-id', i);
      cardElement.addEventListener('click', flipCard);
      document.getElementById('game-board').appendChild(cardElement);
      firstRound = false;
    }
  } else {
    for (var i = 0; i < cards.length; i++) {
      document.getElementsByTagName('img')[i].setAttribute('src', 'images/back.png');
    }
  }
};

var resetGame = function() {
  cards.shuffle();
  cardsInPlay = [];
  createBoard();
};

createBoard();

document.getElementById('reset').addEventListener('click', resetGame);
