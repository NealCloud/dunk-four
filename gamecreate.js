//most button event handlers go in here
$(document).ready(function(){
//        A button to Start the Game
    $("#start").click(function(){
        removeWinAnimation();
        modalActive("startModal");
    });
// 3 point shot button
    $("#shot3").click(function(){
        var num =$('.aimer').offset();
        shotMade(num.left);
    });
    //2 point shot button
    $("#shot2").click(function(){

    });
    //dunk button
    $("#shot1").click(function(){
       dunked();
    });
    //resets game
    $("#startgame").click(function(){
        //assigns symbol based on drop down menu value
        Data.player1Symbol = Data.homeTeam[$('#team1').val()];
        Data.player2Symbol = Data.awayTeam[$('#team2').val()];
        //assigns size from dropdown menu
        var size = $('#gamesize').val();
        //puts up home and away team logos
        $(".home img").attr("src", Data.player1Symbol);
        $(".away img").attr("src", Data.player2Symbol);
        //closes start modal and resets scores
        modalActive("startModal");
        Data.player1score = 0;
        Data.player2score = 0;
        updateDisplay();
        //checks if size greater than 6 and assigns matches needed
        Data.match = size > 6 ? 4 : 3;
        //if match > 3 enable connect 4 mode
        Data.connectFour = Data.match > 3 ? true: false;
        //start game with board size
        startGame(size);
    })
});

//    starts the game take in a board size number
function startGame(num){
//  creates the number of div boxes in html
    createBoxes(num);
    //creates empty board array
    Data.gameBoard = createBoardArray(num);
//passes a click handler to each box class to activate the game logic
    $(".box").click(function(){
        clicked(this);
    });
    //check if game has started
    if(Data.notStarted){
        //flag start and start countdown to 2 min
        // TODO: create timer input options
        Data.notStarted = false;
        //takes variable storage, duration, display element, ending function
        countdown("countdownClock", 120, ".timer .value", function(){
            //when timer ends call winAnimation;
            winAnimation();
        });
    }
}
//Params: storage variable, duration integer, element display, function

function countdown(holder, duration, display, callback){
    var minutes, seconds;
    //use pointer to assign interval variable;
    Data[holder] = setInterval(function () {
        //divide time left by 60 to get min and seconds
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);
        //adds a zero if less then 10 for uniform display
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        //display text to the target element
        $(display).text(minutes + ":" + seconds);
        //check if less than 10 seconds and apply glowing class
        if (--duration < 10) {
            $(display).addClass("current_team");
            if(duration <  0){
                //activate callback and clear interval when reaches 0
                callback();
                clearInterval(Data[holder]);
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
            });
            //add backboard to top row
            if(row == 0){
                $(box).addClass("backboard");
            }
            //check box dimensions
            boxDimensions(num,box);
            $(box).appendTo(".board");
        }
    }
}

// takes in element
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

