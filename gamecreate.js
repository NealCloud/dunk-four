$(document).ready(function(){
//        A button to Start the Game
    $("#start").click(function(){
        removeWinAnimation();
        modalActive("startModal");
    });
    $("#shot3").click(function(){
        var num =$('.aimer').offset();
        shotMade(num.left);
    })
    $("#shot2").click(function(){

    })
    $("#shot1").click(function(){
       dunked();
    })

    $("#startgame").click(function(){
        player1Symbol = homeTeam[$('#team1').val()];
        player2Symbol = awayTeam[$('#team2').val()];

        var size = $('#gamesize').val();
        $(".home img").attr("src", player1Symbol);
        $(".away img").attr("src", player2Symbol);
        modalActive("startModal");
        player1score = 0;
        player2score = 0;
        updateDisplay();
        match = size > 3 ? 4 : 3;
        startGame(size);
    })
});

//    starts the game take in a number
function startGame(num){
//  creates number of div boxes and a board array;
    createBoxes(num);
    gameBoard = createBoardArray(num);  //placeholder for board array create
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
    for(var row = 0; row < num; row++){
        for(var col = 0; col < num; col++){
//                creates a box element with an id equal to its row and column in the board array;
            var box = $("<div>",{
                class: "box",
                id: row + "" + col
                //html: "<img src='" + currentSymbol + "'>"
            });
            if(row == 0){
                $(box).addClass("backboard");
            }
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

    for (var row = 0; row < number; row++) {
        var rowArray = [];

        for(var col = 0; col < number; col++) {
            rowArray.push("");
        }
        gameArray.push(rowArray);
    }
    return gameArray;
}

