var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []
var levelNumber = 0

$("body").keypress(function() {
  if ($("h1:contains('Press')").length) {
    nextSequence()
  }
})

function nextSequence() {
  var randomNumber = Math.random()
  randomNumber = Math.floor(randomNumber * 4)

  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  playSound(randomChosenColour)
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100)

  var level = "Level " + levelNumber
  $("h1").text(level)
  levelNumber++
}

$(".btn").click(function() {
  var userChosenColour = this.id
  userClickedPattern.push(userChosenColour)

  playSound(userChosenColour)
  animatePress(userChosenColour)

  checkAnswer()
})

function checkAnswer() {
  if (gamePattern.length == userClickedPattern.length && gamePattern.length > 0) {
    correctAnswer()
  }
}

function correctAnswer() {
  if (gamePattern.toString() == userClickedPattern.toString()) {
    setTimeout(function() {
      nextSequence()
    }, 1000)
    userClickedPattern = []
  } else {
    $("h1").text("Game Over, Press Any Key to Restart")
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)
    var audio = new Audio("sounds/wrong.mp3")
    audio.play()
    startOver()
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
}

function animatePress(name) {
  $("#" + name).addClass("pressed")
  setTimeout(function() {
    $("#" + name).removeClass("pressed")
  }, 100)
}

function startOver() {
  gamePattern = []
  userClickedPattern = []
  levelNumber = 0
}
