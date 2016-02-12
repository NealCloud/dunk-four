//horizontal function




//    global variables
//    player1turn turn is on
var player1turn = true;
//    the current mark made default x;
var currentMark = "x";
//    the current Symbol used;
var currentSymbol = "<img src='Images/ABAball.png'>";
var player1Symbol = "<img src='Images/ABAball.png'>";
var player2Symbol = "<img src='Images/bball.png'>";
//    player1turn's mark;
var player1mark = "x";
//    player2's mark;
var player2mark = "o";
// first board set to null after board function is made;
var board = [["","",""],["","",""],["","",""]];
var draw = 0;
var player1score = 0;
var player2score = 0;

var currentBox;
var countdownClock = 0;
var notStarted = true;


//toggles the shot modal which allows user to make a shot
function modalActive(){ //no returns, utility
    var modal = $("#mode0" ); //jquery method to check if hidden
    if ( modal.is( ":hidden" ) ) {
        // pointing to a jquery selector in a variable modal previously declared
        modal.css( "display", "block" );
    }
    else{
        // pointing to a jquery selector in a variable modal previously declared
        modal.css( "display", "none");
    }
}
//takes in the text color and sound to display;

function countdown(duration, display, callback){
    var timer, minutes, seconds;

    countdownClock = setInterval(function () {
        //uses abs to clear - sign
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);
        //adds a zero if less then 10 for uniformity
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $(display).text(minutes + ":" + seconds);

        if (--duration < 10) {
            $(display).addClass("current_team");
            if(duration <  0){
                //activate callback and clear timer
                callback();
                clearInterval(countdownClock);
            }
        }
    }, 1000);
}

function randomAlert(com){
    if(com == "good"){
        var r = Math.floor(Math.random()* alert.length);
        displayAlert(alert[r][0],"success", alert[r][1]);
    }
    else{
        var r = Math.floor(Math.random()* wiff.length);
        displayAlert(wiff[r][0],"warn", wiff[r][1] );
    }
}

//takes in the text color and sound to display;
function displayAlert(text, type, sound){
    var message = null;
    if(type == "warn"){
        // pointing to a jquery selector in a variable message previously declared
        message = $("#alert");
        message.removeClass("success"); //toggling classes
        message.addClass("warning");
    }
    else{
        // pointing to a jquery selector in variable message previously declared
        message = $("#alert");
        message.removeClass("warning");
        message.addClass("success")
    }
    if(sound){
        sound.play(); // variable sound calls on play audio function
    }
    $("#alert h1").text(text);  //displays commentator message
}

function winAnimation(){ // displays which player wins and displays crowd imgs and audio
    //animates images
    if(player1score > player2score){
        $(".board").text("HOME TEAM WINS!!!");
    }
    else if(player1score < player2score){
        $(".board").text("AWAY TEAM WINS!!!");
    }
    else{
        $(".board").text("ITS A DRAW");
        return;
    }
    $("#alert").slideUp("slow"); // jquery method which animates the hide
    $("#crowd").html("<audio autoplay loop><source src='audio/readyforthis.mp3' type='audio/mpeg'></audio>"); //used jquery to append html to the crowd

    setTimeout(function(){
        var img = $('<div>',{
            html: "<image id='backc' src='Images/crowd2.png'><image id='frontc' src='Images/crowd1.png'>"
        })
        var img2 = $('<div>',{
            html: "<image id='backc' src='Images/crowd2.png'><image id='frontc' src='Images/crowd1.png'>"
        })
        $("#crowd").append(img);
        $("#crowd2").append(img2);
        $(".board").css("height", "67vh");
        $(".board").addClass("lights");


    }, 2000)
}

function removeWinAnimation() { //removes the winning display
    $("#crowd").empty();  //jquery method .empty removes all child elements from the selectors
    $("#crowd2").empty();
    $(".board").empty("");
    $(".board").removeClass("lights").removeAttr("height");
    $(".message h1").html('');
    player1score = 0;  //added player1score and player2scores to reset score
    player2score = 0;
    $(".home .value").text(player1score);
    $(".away .value").text(player2score);
    clearInterval(countdownClock);//calls clearInterval function with parameter countdownClock
    notStarted = true;
    $("#alert").show();

}

function createBoxes(num){
//        creates the boxes in html depending on number
    for(var i = 0; i < num; i++){
        for(var j = 0; j < num; j++){
//                creates a box element with an id equal to its row and column in the board array;
            var box = $("<div>",{
                id: i + "" + j,
                class: "box"
            });

            boxDimensions(num,box);
            $(box).appendTo(".board");
        }
    }
}



function createBoardArray(number){
    var gameArray = [];

    for (var i = 0; i < number; i++) {
        var pushArray = [];
        //gameArray.push(pushArray);
        for(var j = 0; j < number; j++) {

            pushArray.push("");
        }

        gameArray.push(pushArray);
    }
    return gameArray;
}

function boxDimensions(number,box){
    var size = (parseInt(100/number) -.4) + "%";
    box.css({"width":size,"height":size});
}

$(document).ready(function(){
//        A button to Start the Game
    $("#start").click(function(){
        removeWinAnimation();
        $('.board').html('');
        $('.away .home').removeClass('current_team');
        var getNumberBoxes = prompt("Enter the number of squares you want: 3 4 5");
        while(getNumberBoxes < 3 || getNumberBoxes > 5){
            getNumberBoxes = prompt("Incorrect number: Only 3 4 5");
        }
        startGame(getNumberBoxes); //change to take input value = to board size;
    });
    $("#shot").click(function(){
        var num =$('.aimer').offset();
        shotMade(num.left);

    })
});

//    starts the game take in a number
function startGame(num){
//        creates number of div boxes and a board array;
    createBoxes(num);
    board = createBoardArray(num);  //placeholder for board array create
//passing a click handler to each box to activate the click function;
    $(".box").click(function(){
        clicked(this);
    });
    if(notStarted){
        notStarted = false;
        countdown(120, ".timer .value", function(){
            winAnimation();
        });
    }
}