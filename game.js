var buttonArray = ["red","blue","green","yellow"];
var gamePatten = [];
var userClickPattern = [];
var level =0;
var started = false;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("level " + level);
        nextsequence();
        started = true;
    }
});

function nextsequence(){

    userClickPattern = [];
    level++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonArray[randomNumber];

    gamePatten.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    

    playSound(randomChosenColor);


    
    

}

$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);

    console.log(userClickPattern);
    
    playSound(userChosenColor)
    
    animatePress(userChosenColor);
    checkAswer(userClickPattern.length-1);    
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor){
    
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAswer(currentLevel){

    if(gamePatten[currentLevel] === userClickPattern[currentLevel]){
        console.log("success");

        if(userClickPattern.length == gamePatten.length){
            setTimeout(function(){
                nextsequence();

            },1000);
        }

    }
    else{
        console.log("fail");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press any key to restart");
        startOver();
    }
}

function startOver(){

    level =0;
    gamePatten=[];
    started =false;
}