(function() {
  // Inside the IIFE. The DOM will be available here because I am importing
  // this file at the end of the <body> tag in my HTML.

  var startButton = document.getElementById("start");
  var stopButton = document.getElementById("stop");
  // var timer = document.getElementById("timer");
  var nextWordButton = document.getElementById("next-word");
  var skipWordButton = document.getElementById("skip-word");
  var wordDiv = document.getElementById("word");
  var numberCorrectDiv = document.getElementById("number-correct");
  var numberCorrect = 0;
  var timer;

  startButton.onclick = function() {
    resetStartWord();
    selectWord();
    startButton.setAttribute("disabled", "disabled");
    stopButton.removeAttribute("disabled");
    nextWordButton.removeAttribute("disabled");
    skipWordButton.removeAttribute("disabled");
    startTimer();
    resetNumberCorrect();
  };

  stopButton.onclick = function() {
    stopTimer();
    stopButton.setAttribute("disabled", "disabled");
    nextWordButton.setAttribute("disabled", "disabled");
    skipWordButton.setAttribute("disabled", "disabled");
  }

  nextWordButton.onclick = function() {
    if(selectWord()) {
      incrementNumberCorrect();
    }
  };

  skipWordButton.onclick = function() {
    selectWord();
  }

  var startTimer = function() {
    timer = setTimeout(function() {
      startButton.removeAttribute("disabled");
      stopButton.setAttribute("disabled", "disabled");
      nextWordButton.setAttribute("disabled", "disabled");
      skipWordButton.setAttribute("disabled", "disabled");
      wordDiv.innerText = "STOP!!";
    }, 120000);
  };

  var stopTimer = function() {
    clearTimeout(timer);
    startButton.removeAttribute("disabled");
    nextWordButton.removeAttribute("disabled");
    wordDiv.innerText = "STOP!!";
  };

  var resetNumberCorrect = function() {
    numberCorrect = 0;
    numberCorrectDiv.innerText = 0;
  };

  var resetStartWord = function() {
    wordDiv.innerText = "EMPIEZA YA!";
  };

  var incrementNumberCorrect = function() {
    numberCorrect += 1;
    numberCorrectDiv.innerText = numberCorrect;
  }

  var generateRandomIndex = function() {
    return Math.floor(Math.random() * wordList.length);
  }

  var selectWord = function() {
    if(localStorage.length === wordList.length) {
      wordDiv.innerText = "ERROR: No more words.";
      nextWordButton.setAttribute("disabled", "disabled");
      return false;
    }

    var randomIndex;

    do {
      randomIndex = generateRandomIndex();
    } while(localStorage.getItem(randomIndex) !== null)

    var randomWord = wordList[randomIndex];

    wordDiv.innerText = randomWord;
    localStorage.setItem(randomIndex, randomWord);

    return true;
  };
})();
