var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(function(){
  if(!started){
  $("#level-title").text("Level 0");
  nextSequence();
  started=true;
    }
});
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(this.id);
  checkAnswer(userClickedPattern.length -1);

})

function nextSequence(){
  userClickedPattern=[];
level=level+1;
$("#level-title").text("Level "+level);
var  randomNumber=Math.random()*4;
randomNumber=Math.floor(randomNumber);
var randomColor=buttonColors[randomNumber];

gamePattern.push(randomColor);
  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){
$("#"+currentColor).addClass("pressed");
setTimeout(function(){
  $("#"+currentColor).removeClass("pressed");
},100);
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    console.log("true");
if(userClickedPattern.length===gamePattern.length)
{
  setTimeout(function(){
    nextSequence();
  },1000);
}
  }
  else{
    startOver();
console.log("wrong");
playSound("wrong");
$("body").addClass("game-over");
setTimeout(function(){
  $("body").removeClass("game-over");
},200);
$("#level-title").text("Game Over,Press any key to Restart");

  }
}
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
