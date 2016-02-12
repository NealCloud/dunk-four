function createShotAttempt(){ //

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
    console.log(hit, target.left);
    console.log(accuracy);

    //test case
    if(accuracy < 50){
        randomAlert("good");
        $("#playingBall").addClass("swish");
        $("#net").addClass("rimshake");
        setTimeout(function(){
            shotSuccess(currentBox);
            modalActive();
            return;
        }, 2700)
    }
    else{
        randomAlert("bad");
        $("#playingBall").addClass("tooShort");
        setTimeout(function(){
            modalActive();
            togglePlayerSymbols();
            return;
        }, 2700)
    }

}
var boom = new Audio("audio/boomshaka.mp3");
var downtown = new Audio("audio/downtown.mp3");
var onfire = new Audio("audio/onfire.mp3");
var heckler = new Audio("audio/boo.mp3");
var alert = [["Boomshakala",boom],["From DOWNTOWN", downtown],["He's on fire", onfire]];
var wiff = [["Airrball", heckler],["a Big Miss", heckler],["wheres the focus", heckler]];



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

//







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