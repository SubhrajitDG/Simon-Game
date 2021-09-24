//variables
userSeq=[];
simonSeq=[];
const NUM_OF_LEVELS= 20;
var gameOn = false;
var id, color, level=0;
var boardSound = [
    "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
    "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
];

//1. Start board sequence
$(document).ready(function() {
    //turning on switch
    $(".switch").click(function() {    
        level=0;
        simonSeq = []
        userSeq = [];
        gameOn = (gameOn == false) ? true : false;
        console.log(gameOn);
        if(gameOn) {
            $(".inner-switch").addClass("inner-inactive");
            $(".switch").addClass("outer-active");
            $(".display").text("00");
            
            
            //starting game      
            $(".start-btn").click(function(){
                level=0;
                level++;
                simonSeq = []
                userSeq = [];
                simonSequence();
            })
        
            //user pad listener
            $(".pad").click(function(){
                id = $(this).attr("id");
                color = $(this).attr("class").split(" ")[1];
                userSeq.push(id);
                console.log(id+" "+color);
                addClassSound(id, color);
                //checking order of user sequence
                if(!checkUserSeq()) {
                    displayError();//displaying error
                    userSeq=[];
                }
                //checking end of sequence
                if(userSeq.length == simonSeq.length && userSeq.length < NUM_OF_LEVELS) {
                    level++;
                    userSeq=[];
                    simonSequence();
                }
                //checking for winner
                if(userSeq.length == NUM_OF_LEVELS){
                    $(".display").text("win");
                }
            })
        }
        else {
          $(".inner-switch").removeClass("inner-inactive");
          $(".switch").removeClass("outer-active");
          $(".display").text("");
          return;
        }    
      })
})

//checking user sequence against simon
function checkUserSeq(){
    for(var i = 0; i < userSeq.length; i++) {
        if(userSeq[i] != simonSeq[i]){
            return false;
        }      
    }
    return true;
}

//displaying error

function displayError() {  
    console.log("error"); 
    var counter = 0;
    var myError = setInterval(function(){
        $(".display").text("Err");
        counter++;
        if(counter==3 || gameOn==false){
            $(".display").text(level);
            clearInterval(myError);
            userSeq=[];
            counter=0;
        }
    },500);
}


//simon sequence
function simonSequence() {
    console.log(level);
    $(".display").text(level);
    getRandomNum();
    var i=0;
    var myInterval = setInterval(function(){
        id = simonSeq[i];
        color = $("#"+id).attr("class").split(" ")[1];
        console.log(id+" "+color);
        addClassSound(id, color);
        i++;
        if(i == simonSeq.length || gameOn==false){
            clearInterval(myInterval);
        }
    },1000);
    

}

//generate random number
function getRandomNum(){
    var random = Math.floor(Math.random() *4);
    simonSeq.push(random);
}

//add temporary class and sound
function addClassSound(id, color){
    $("#"+id).addClass(color+"-active");
    playSound(id);
    setTimeout(function(){
        $("#"+id).removeClass(color+"-active");
  }, 500);
}

//play board sound
function playSound(id) {
    var sound = new Audio(boardSound[id]);
    sound.play();
}


