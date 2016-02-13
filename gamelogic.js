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

function createShotAttempt(){
    modalActive();
    $("#playingBall").removeClass("tooShort");
    $("#playingBall").removeClass("swish");
    $("#net").removeClass("rimshake");
    $("#shot").show();
    $(".modal-footer").html("");
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
    $("#shot").hide();
    //the range is 86 - 475
    var target = $(".target").offset();
    var accuracy = Math.abs(hit - target.left);
    //console.log(accuracy);
    //test case
    if(accuracy < 50){
        randomAlert("good");
        $("#playingBall").addClass("swish");
        $("#net").addClass("rimshake");
        setTimeout(function(){
            shotSuccess(currentBox);
            modalActive();
            return;
        }, 1800)
    }
    else{
        randomAlert("bad");
        $("#playingBall").addClass("tooShort");
        setTimeout(function(){
            modalActive();
            togglePlayerSymbols();
            return;
        }, 1800)
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








