var game = {
  count: 0,
  showColor: ["#green", "#blue", "#red", "#dark"],
  currentGame: [],
  player: [],
  sound: {
    blue: new Audio("sound/blue-tone.mp3"),
    red: new Audio("sound/red-tone.mp3"),
    dark: new Audio("sound/dark-tone.mp3"),
    green: new Audio("sound/green-tone.mp3")
  },
  nextLevelBool: false
};

function toStop() {
  game.currentGame = [];
  game.count = 0;
  stopCounter();
}

function toPlay() {
  game.currentGame = [];
  game.count = 0;
  showCounter();
}

function displayMoves() {
  var i = 0;
  var moves = setInterval(function() {
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600);

  clearPlayer();
}

function sound(name) {
  switch (name) {
    case "#green":
      game.sound.green.play();
      break;
    case "#blue":
      game.sound.blue.play();
      break;
    case "#red":
      game.sound.red.play();
      break;
    case "#dark":
      game.sound.dark.play();
      break;
  }
}

function playGame(field) {
  $(field).addClass("hover");
  sound(field);
  setTimeout(function() {
    $(field).removeClass("hover");
  }, 300);
}

function clearPlayer() {
  game.player = [];
}

function detectMoves(id) {
  var field = "#" + id;
  game.player.push(field);
  playerTurn(field);
}

function playerTurn(x) {
  if (
    game.player[game.player.length - 1] !==
    game.currentGame[game.player.length - 1]
  ) {
    $("#alert-msg").html("Wrong move! Try again!");
    $("#buttonName").removeClass("btn-success");
    $("#buttonName").addClass("btn-danger");
    $("#buttonName").html("Try Again");
    $("#simonModal").css({ display: "flex" });
    $("#simonModal").modal();
  } else {
    sound(x);
    var check = game.player.length === game.currentGame.length;
    if (check) {
      if (game.count == 20) {
        $("#alert-msg").html("You won! Congrats.");
        $("#buttonName").removeClass("btn-danger");
        $("#buttonName").addClass("btn-success");
        $("#buttonName").html("OK");
        $("#simonModal").css({ display: "flex" });
        $("#simonModal").modal();
      } else {
        game.nextLevelBool = true;
        $("#alert-msg").html("Congratulations You Won Round " + game.count);
        $("#buttonName").removeClass("btn-danger");
        $("#buttonName").addClass("btn-success");
        $("#buttonName").html("Next Level");
        $("#simonModal").css({ display: "flex" });
        $("#simonModal").modal();
      }
    }
  }
}

function nextLevel() {
  showCounter();
}

function generateMove() {
  game.currentGame.push(game.showColor[Math.floor(Math.random() * 4)]);
  displayMoves();
}

function showCounter() {
  game.count++;
  $("#clickNumber").addClass("animated fadeOutDown");

  setTimeout(function() {
    $("#clickNumber")
      .removeClass("fadeOutDown")
      .html(game.count)
      .addClass("fadeInDown");
  }, 200);

  generateMove();
}

function stopCounter() {
  game.count;
  $("#clickNumber").addClass("animated fadeOutDown");

  setTimeout(function() {
    $("#clickNumber")
      .removeClass("fadeOutDown")
      .html(game.count)
      .addClass("fadeInDown");
  }, 200);
}

function actionModal() {
  var msg = $("#alert-msg").html();
  if (msg == "Wrong move! Try again!") {
    displayMoves();
  } else if (game.nextLevelBool) {
    nextLevel();
  } else {
    return;
  }
}
