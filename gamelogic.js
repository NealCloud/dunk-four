Data = {
    player1turn: true,
    currentMark: "x",
    connectFour: false,
    boom : new Audio("audio/boomshaka.mp3"),
    downtown : new Audio("audio/downtown.mp3"),
    onfire : new Audio("audio/onfire.mp3"),
    dunk1 : new Audio("audio/dunk1.mp3"),
    dunkjam : new Audio("audio/dunkjam.mp3"),
    retire : new Audio("audio/dunkretire.mp3"),
    tobig : new Audio("audio/tobigtofast.mp3"),
    face : new Audio("audio/face.mp3"),
    shoes : new Audio("audio/shoes.mp3"),
    heckler : new Audio("audio/boo.mp3"),
    awayTeam: ["Images/lakers.png","Images/heat.png","Images/mavericks.svg","Images/celtics.png"],
    homeTeam: ["Images/pacers.png","Images/heat.png","Images/mavericks.svg","Images/celtics.png"],
    //    the current Symbol used;
    currentSymbol : null,
    player1Symbol : null,
    player2Symbol : null,
    //    player1turn's mark;
    player1mark : "x",
    //    player2's mark;
    player2mark : "o",
    // first board set to null after board function is made;
    //var board = [["","",""],["","",""],["","",""]];
    gameBoard : [["x","","x"],["","",""],["","",""]],
    match : 3,
    boardFill : 0,
    player1score : 0,
    player2score : 0,
    currentBox: null,
    countdownClock : 0,
    shotClock: 0,
    notStarted : true,
    kobe : $("<img>",{
        src: "Images/kobedunk2.png",
        class: "dunk"
    }),
    kobe2 : $("<img>",{
        src: "Images/kobedunk.png",
        class: "dunk2"
    }),
    kobe3 : $("<img>",{
        src: "Images/kobedunk2.png",
        class: "block"
    }),
    ball : $("<img>",{
        src: "Images/bball.png",
        id: "balldrop"
    }),
    ballmiss : $("<img>",{
        src: "Images/bball.png",
        id: "ballmiss"
    }),
    topBox: null,
    timerMode: false
}
var alert = [["Boomshakala!!!!",Data.boom],["From DOWNTOWN!!!", Data.downtown],["He's on fire!!", Data.onfire]];
var wiff =[["Airrrrballll!!!", Data.heckler],["A Big Miss!!", Data.heckler],["Wheres the focus at??", Data.heckler]];
var dunkalert = [["A SPECTACULAR DUNK!!!", Data.dunk1],["JAMS IT IN!!!!!!", Data.dunkjam],["Consider retiring after being Dunked on like that", Data.retire]];
var dunkblock = [["ouch to the face", Data.face],["To Big to Fast to get by", Data.tobig],["Maybe its the shoes", Data.shoes]];
// click the box function
function clicked(targ) {

//        splits id into row and column according to array position
    //    calls the function checkClicked to see if a box was already clicked
    if (!$(targ).html()) {
        Data.currentBox = targ;
        createShotAttempt();
        // return true if there is already text in the box
    }
    else {
        console.log("filled");
        return;
    }
}

function createShotAttempt(){
    modalActive("shotmodal");

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
    if(hit == 10){
        randomAnnouncerDisplay(alert);
        $("#playingBall").addClass("swish" , "success");
        $("#net").addClass("rimshake");
        setTimeout(function(){
            shotSuccess(Data.currentBox);
            modalActive("shotmodal");
            return;
        }, 100)
    }
    else{
        randomAnnouncerDisplay(wiff, "warn");
        $("#playingBall").addClass("tooShort");
        setTimeout(function(){
            shotMiss(Data.currentBox);
            modalActive("shotmodal");
            return;
        }, 100)
    }
}
//TODO make check for meter power and apply approriate accuracy attempt;
function dunked(){
    modalActive("shotmodal");
    var id = $(Data.currentBox).attr("id");
    var col = parseInt(id[1]);
    dunkAnimation(col);
    randomAnnouncerDisplay(dunkalert, "success");
    if(Data.player1turn){
        Data.player1score += 2;
        $(".home .value").text(Data.player1score);
    }
    else{
        Data.player2score += 2;
        $(".away .value").text(Data.player2score);
    }

    updateDisplay();
    togglePlayerSymbols();
}

function dunkedMiss(){
    modalActive("shotmodal");
    var id = $(Data.currentBox).attr("id");
    var col = parseInt(id[1]);
    dunkAnimationMiss(col);
    randomAnnouncerDisplay(dunkblock, "warn");

    updateDisplay();
    togglePlayerSymbols();
}

function shotSuccess(targ){
    //get row and col info from element id
    var id = $(targ).attr("id");
    var row = parseInt(id[0]);
    var col = parseInt(id[1]);
//  if connect Four increment down to last unused row
    if(Data.connectFour) {
        while (row < Data.gameBoard.length - 1 && Data.gameBoard[row + 1][col] === "") {
            ++row;
        }
    }
//  set the game board to current players mark value inside row and column numbers provided;
    Data.gameBoard[row][col] = Data.currentMark;
    //create and append an image to game board with current Player Symbol
    var img = $("<img>",
        {
            src: Data.currentSymbol
        })
    $("#0" + col).append(Data.ball);

   // $("#0" + col).remove(Data.ball);
    //remove the drop animation;
    setTimeout(function(){

        $("#" + row + col).append(img);
        $(Data.ball).remove();
    },1300)

    if(Data.player1turn){
        Data.player1score += 2;
        $(".home .value").text(Data.player1score);
    }
    else{
        Data.player2score += 2;
        $(".away .value").text(Data.player2score);
    }

    updateDisplay();
    if (checkWin(Data.gameBoard, row, col, Data.match)) {
        if(Data.player1turn){
            Data.player1score += 10;
        }
        else Data.player2score += 10;
    }
//        switch the symbols for player turn;
    togglePlayerSymbols();
}

function shotMiss(targ){
    //get row and col info from element id
    var id = $(targ).attr("id");
    var col = parseInt(id[1]);
    $("#0" + col).append(Data.ballmiss);

    // $("#0" + col).remove(Data.ball);
    //remove the drop animation;
    setTimeout(function(){
        $(Data.ballmiss).remove();
    },1100)

//        switch the symbols for player turn;
    togglePlayerSymbols();
}

function togglePlayerSymbols(){
//        if player 1 turn
    if(Data.player1turn){
//            set current mark and symbol to player2 and toggle player boolean
        Data.currentMark = Data.player2mark;
        Data.currentSymbol = Data.player2Symbol;
        Data.player1turn = false;
    }
//        must be players 2 turn
    else{
//            switch back current mark/symbol to player 1 and toggle player boolean;
        Data.currentMark = Data.player1mark;
        Data.currentSymbol = Data.player1Symbol;
        Data.player1turn = true;
    }
    updateDisplay();
}








