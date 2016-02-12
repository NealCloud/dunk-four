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
    if(player1score > player2score){
        $(".board").text("HOME TEAM WINS!!!");
    }
    else if(player1score < player2score){
        $(".board").text("HOME TEAM WINS!!!");
    }
    else{
        $(".board").text("ITS A DRAW");
        return;
    }
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
    $("#playingBall").removeClass("tooShort");
    $("#playingBall").removeClass("swish");
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
        setTimeout(function(){
            shotSuccess(currentBox);
            modalActive();
            return;
        }, 2600)
    }
    else{
        randomAlert("bad");
        $("#playingBall").addClass("tooShort");
        setTimeout(function(){
            modalActive();
            togglePlayerSymbols();
            return;
        }, 2600)
    }

}
var boom = new Audio("audio/boomshaka.mp3");
var downtown = new Audio("audio/downtown.mp3");
var onfire = new Audio("audio/onfire.mp3");
var alert = [["Boomshakala",boom],["From DOWNTOWN", downtown],["He's on fire", onfire]];
var wiff = [["Airrball",boom],["a Big Miss", downtown],["wheres the focus", onfire]];

function randomAlert(com){
    if(com == "good"){
        var r = Math.floor(Math.random()* alert.length);
        displayAlert(alert[r][0],"warn", alert[r][1]);
    }
    else{
        var r = Math.floor(Math.random()* wiff.length);
        displayAlert(wiff[r][0],"warn" );
    }
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