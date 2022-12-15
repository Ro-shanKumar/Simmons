var gamePattern = [];

var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

function nextsequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("h1").text("level " + level);


}

function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];

}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel-1] == gamePattern[currentLevel-1]){
    userClickedPattern = [];
    setTimeout(function(){nextsequence();}, 1000);
  }else{
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

  }
}

$(".btn").click(function(event){
  var userChosenColour = event.target.id ;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  if(userClickedPattern.length == gamePattern.length){
    checkAnswer(userClickedPattern.length);
  }
});

function playSound(colour){
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}
function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){$("."+currentColor).removeClass("pressed");}, 100);

}

$(document).keydown(function(){
  startOver();
  setTimeout(function(){nextsequence();}, 1000);
});
