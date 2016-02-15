
//toggles a modal depending on id given
function modalActive(mode){ //no returns, utility
    var modal = $("#" + mode); //jquery method to check if hidden
    if ( modal.is( ":hidden" ) ) {
        // pointing to a jquery selector in a variable modal previously declared
        modal.css( "display", "block" );
    }
    else{
        // pointing to a jquery selector in a variable modal previously declared
        modal.css( "display", "none");
    }
}
//uses announcerDisplay and an array to display random phrases and sounds
function randomAnnouncerDisplay(com, type){
    var r = Math.floor(Math.random()* com[1].length);
    announcerDisplay(com[r][0], type, com[r][1]);
}

//uses the alert element to display information
//params: text to display, string("warn", success"), sound object
function announcerDisplay(text, type, sound){
    var message = null;
    if(type == "warn"){
        // pointing to a jquery selector in a variable message previously declared
        message = $("#alert");
        message.removeClass("success"); //toggling classes
        message.addClass("warning");
    }
    else{
        // pointing to a jquery selector in variable message previously declared
        message = $("#alert");
        message.removeClass("warning");
        message.addClass("success")
    }
    if(sound){
        sound.play(); // variable sound calls on play audio function
    }
    $("#alert h1").text(text);  //displays commentator message
}
// updates the score stats on the title and lights up current team
function updateDisplay(){
    if(Data.player1turn){
        $(".home").addClass("current_team");
        $(".away").removeClass("current_team");
        Data.currentSymbol = Data.player1Symbol;
    }
    else{
        $(".away").addClass("current_team");
        $(".home").removeClass("current_team");
        Data.currentSymbol = Data.player2Symbol;
    }

    $(".home .value").text(Data.player1score);
    $(".away .value").text(Data.player2score);
}
//kobe dunking animation  takes the column integer to dunk on
function dunkAnimation(column){
    var id = $("#0" + column);
    var off = id.offset();
    // a chain of timeout and appends the kobe images stored in a jquery holder
    // uses css animation keyframes
    id.append(Data.kobe);
    setTimeout(function(){
        $(Data.kobe).remove();
        id.append(Data.kobe2, Data.ball);
        setTimeout(function(){
            //loop through columns and destory symbols and make explosions
            for(var i = 0; i < Data.gameBoard.length; i++){
                $("#" + (i) + column).addClass("explode");
                $("#" + (i) + column).empty();
            }
            $(Data.kobe2).remove();
            setTimeout(function(){
                $(Data.ball).remove();
                //destroyRow(column);
                setTimeout(function(){
                //remove explosions;
                for(var i = 0; i < Data.gameBoard.length; i++){
                    $("#" + (i) + column).removeClass("explode");
                }
                },1000);
            },800);
        },500);
    },2000);
}

function dunkAnimationMiss(column){
    var id = $("#0" + column);
    // a chain of timeout and appends the kobe images stored in a jquery holder
    // uses css animation keyframes
    id.append(Data.kobe, Data.kobe3);
    setTimeout(function(){
        $(Data.kobe).remove();

        id.append(Data.kobe2, Data.ballmiss);
        setTimeout(function(){
            $(Data.kobe2).remove();
            setTimeout(function(){
                $(Data.kobe3).remove();
                $(Data.ballmiss).remove();
            },800);
        },500);
    },2000);
}

function finishDunk(){

}

function winAnimation(player){ // displays which player wins and displays crowd imgs and audio
    //animates images
    $(".board").addClass('winner');
    var symbol = $("<img>",
        {
            src: Data.currentSymbol,
        });
    if(player == "home"){
        $(".board").append(symbol);
        $(".board").text("HOME TEAM WINS!!!");
    }
    else if(player == "away"){
        $(".board").text("AWAY TEAM WINS!!!");
    }
    else{
        $(".board").text("ITS A DRAW");
        return;
    }
    $("#alert").slideUp("slow"); // jquery method which animates the hide
    $("#crowd").html("<audio autoplay loop><source src='audio/readyforthis.mp3' type='audio/mpeg'></audio>"); //used jquery to append html to the crowd

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

function removeWinAnimation() { //removes the winning display
    $("#crowd").empty();  //jquery method .empty removes all child elements from the selectors
    $("#crowd2").empty();
    $(".board").empty("");
    $(".board").removeClass("lights").removeAttr("height");
    $(".message h1").html('');

    clearInterval(Data.countdownClock);//calls clearInterval function with parameter countdownClock
    Data.notStarted = true;
    $("#alert").show();
}