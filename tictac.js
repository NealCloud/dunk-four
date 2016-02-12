//horizontal function




//    global variables
//    player1turn turn is on
var player1turn = true;
//    the current mark made default x;
var currentMark = "x";
//    the current Symbol used;
var currentSymbol = "<img src='Images/bball.png'>";
var player1Symbol = "<img src='Images/bball.png'>";
var player2Symbol = "<img src='Images/ABAball.png'>";
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

// click the box function
function clicked(targ) {
//        takes element clicked id
    console.log("clicked " + targ);
//        splits id into row and column according to array position
    //    calls the function checkClicked to see if a box was already clicked
    if (!$(targ).html()) {
        currentBox = targ;
        createShotAttempt();
        // return true if there is already text in the box
    }
    else {
        console.log("filled");
        return;
    }
}
function shotSuccess(targ){
    var id = $(targ).attr("id");
    var row = id[0];
    var col = id[1];
//        use the currentSymbol the mark the box
    $(targ).html(currentSymbol);

//        set the board to row and column in array;
    board[row][col] = currentMark;
//        console the win check
    console.log("board value: " + board[row][col]);
    if(player1turn){
        player1score += 3;
        $(".home .value").text(player1score);
    }
    else{
        player2score += 3;
        $(".away .value").text(player2score);
    }


    if (checkWin(board)) {
        $('.board').html('YOU WIN');
        winAnimation();
    }
//        switch the symbols for player turn;
    togglePlayerSymbols();
}


function togglePlayerSymbols(){
//        if player 1 turn
    if(player1turn){
//            set current mark and symbol to player2 and toggle player boolean
        currentMark = player2mark;
        currentSymbol = player2Symbol;
        player1turn = false;
        $('.away').removeClass('current_team');
        $('.home').addClass('current_team');
    }
//        must be players 2 turn
    else{
//            switch back current mark/symbol to player 1 and toggle player boolean;
        currentMark = player1mark;
        currentSymbol = player1Symbol;
        player1turn = true;
        $('.home').removeClass('current_team');
        $('.away').addClass('current_team');

    }
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

$(document).ready(function(){
//        A button to Start the Game
    $("#start").click(function(){
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
}