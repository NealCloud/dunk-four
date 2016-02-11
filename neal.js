//GameLogic
//holds modal hiding
function modalActive(){
    var modal = $("#mode0" );
    if ( modal.is( ":hidden" ) ) {
        modal.css( "display", "block" );
    }
    else{
        modal.css( "display", "none");
    }
}
//takes in the text color and sound to display;
function displayAlert(text, type, sound){
    var message = null;
    if(type == "warn"){
        message = $("#alert");
        message.removeClass("success");
        message.addClass("warning");
    }
    else{
        message = $("#alert");
        message.removeClass("warning");
        message.addClass("success")
    }
    if(sound){
        sound.play();
    }

    $("#alert h1").text(text);
}

function winAnimation(){
    $("#alert").slideUp("slow");
    $("#crowd").html("<audio autoplay loop><source src='audio/readyforthis.mp3' type='audio/mpeg'></audio>");

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

function createShotAttempt(){
    modalActive();
    var shotTarget = $('<div>',{
        class: "target"
    });
    var shotAimer = $('<div>',{
        class: "aimer"
    });

    var shotbox = $('<div>',{
        class: "backboard",
    });

    shotbox.append(shotTarget, shotAimer);
    shotbox.appendTo(".modal-footer");

    //create random number and apply to
    var random = Math.floor(Math.random()* 400);
    $(".target").css("left", random + "px");


}
function shotMade(hit){
    //the range is 86 - 475
    var target = $(".target").offset();

    var accuracy = Math.abs(hit - target.left);
    console.log(hit, target.left);
    console.log(accuracy);

    //test case
    if(accuracy < 50){
        randomAlert();
    }

}
var boom = new Audio("audio/boomshaka.mp3");
var downtown = new Audio("audio/downtown.mp3");
var onfire = new Audio("audio/onfire.mp3");
var alert = [["Boomshakala",boom],["From DOWNTOWN", downtown],["He's on fire", onfire]];

function randomAlert(){
    var r = Math.floor(Math.random()* alert.length);
    displayAlert(alert[r][0],"warn", alert[r][1]);
}


function horizontal (board) {
    var x; var o;
    var bLen = board.length;

    for(var i = 0; i < bLen ; i++){
        x = 0;
        o = 0;
        for(var j = 0; j < bLen ; j++ ){
            if (board[i][j] == "x"){
                x += 1;
            }
            else if (board[i][j] == "o"){
                o += 1;
            }

        }
        if(x == bLen){
            return "X";

        }
        else if(o == bLen){
            return "O";
        }

    }
    return false;
}

function vertical(board){
    var x; var o;
    var bLen = board.length;
    for(var i = 0;i < bLen; i++){
        x = 0;
        o = 0;
        for(var j = 0; j < bLen; j++){
            if(board[j][i] == "x"){
                x += 1;
            }
            else if(board[j][i] == "o"){
                o += 1;
            }
        }
        if(x == bLen){
            return "X";
        }
        else if(o == bLen){
            return "O";
        }
    }
    return false;
}

function leftToRightDiagonal(array) {
    var counterX = 0;
    var counterO = 0;
    for (var i = 0; i < 1; i++) {
        for (var j = 0; j < array.length; j++) {
            if (array[i + j][j] == "x") {
                counterX++;
            }
            else if(array[i + j][j] == "o"){
                counterO++;
            }
        }
    }

    if(counterO == array.length){
        return("O wins");
    }
    else if(counterX == array.length){
        return("X wins");
    }
    else{
        return false;
    }
}

function rightToLeftDiagonal(array) {
    var counterX = 0;
    var counterO = 0;
    for (var i = array.length - 1; i < array.length; i++) {
        for (var j = 0; j < array.length; j++) {
            if(array[i - j][j] == "o") {
                counterO++;
            }
            else if(array[i - j][j] == "x"){
                counterX++;
            }
        }
    }
    if(counterO == array.length){
        return("O wins");
    }
    else if(counterX == array.length){
        return("X wins");
    }else{
        return false;
    }
}


var winConditions = [vertical, horizontal, rightToLeftDiagonal, leftToRightDiagonal];

function checkWin(){
    for(var i = 0; i < winConditions.length; i++){
        var a = winConditions[i](board);
        if(a) return a + i;
    }
    return false;
}



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
        winAnimation();
    }
//        switch the symbols for player turn;
    togglePlayerSymbols();
}

// This function checks to see if the a clicked box has been clicked
function checkClicked(targ){
    if($(targ).html()){
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
        currentSymbol = player2Symbol;
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
    $("#shot").click(function(){
        var num =$('.aimer').offset();
        shotMade(num.left);
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