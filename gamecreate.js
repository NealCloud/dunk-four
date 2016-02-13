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

function countdown(duration, display, callback){
    var minutes, seconds;

    countdownClock = setInterval(function () {
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

function boxDimensions(number,box){
    var size = (parseInt(100/number) -.4) + "%";
    box.css({"width":size,"height":size});
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

