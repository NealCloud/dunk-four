//horizontal function




//    global variables
//    player1turn turn is on
var player1turn = true;
//    the current mark made default x;
var currentMark = "x";
//    the current Symbol used;
var currentSymbol = "x";
//    player1turn's mark;
var player1mark = "x";
//    player2's mark;
var player2mark = "o";
// first board set to null after board function is made;
var board = [["","",""],["","",""],["","",""]];


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
    var id = $(targ).attr("id");
//        splits id into row and column according to array position
    //    calls the function checkClicked to see if a box was already clicked
    if (checkClicked(targ)) {
        return;
    }
    var row = id[0];
    var col = id[1];
//        use the currentSymbol the mark the box
    $(targ).html(currentSymbol);

//        set the board to row and column in array;
    board[row][col] = currentMark;
//        console the win check
    console.log("board value: " + board[row][col]);
    if (checkWin(board)) {
        $('.board').html('YOU WIN');
    }
//        switch the symbols for player turn;
        togglePlayerSymbols();
    }

// This function checks to see if the a clicked box has been clicked
function checkClicked(targ){
    if($(targ).text()){
        return true; // return true if there is already text in the box
    }
    else{
        return false;
    }
}

function togglePlayerSymbols(){
//        if player 1 turn
    if(player1turn){
//            set current mark and symbol to player2 and toggle player boolean
        currentMark = player2mark;
        currentSymbol = player2mark;
        player1turn = false;
    }
//        must be players 2 turn
    else{
//            switch back current mark/symbol to player 1 and toggle player boolean;
        currentMark = player1mark;
        currentSymbol = player1Symbol;
        player1turn = true;
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
        startGame(3); //change to take input value = to board size;
    })
})

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