
//toggles the shot modal which allows user to make a shot
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

function randomAlert(com){
    if(com == "good"){
        var r = Math.floor(Math.random()* Data.alert.length);
        displayAlert(Data.alert[r][0],"success", Data.alert[r][1]);
    }
    else{
        var r = Math.floor(Math.random()* Data.wiff.length);
        displayAlert(Data.wiff[r][0],"warn", Data.wiff[r][1] );
    }
}

//takes in the text color and sound to display;
function displayAlert(text, type, sound){
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
function dunkAnimation(column){
    var id = $("#0" + column);
    var off = id.offset();
    id.append(Data.kobe);
    setTimeout(function(){
        $(Data.kobe).remove();
        id.append(Data.kobe2);
        id.append(Data.ball);
        setTimeout(function(){
            $(Data.kobe2).remove();
            setTimeout(function(){
                //$(Data.ball).remove();
                setTimeout(function(){
                    //destroyRow(column);
                },1400);
            },1400);
        },500);
    },2000);
}

function finishDunk(){

}

function winAnimation(){ // displays which player wins and displays crowd imgs and audio
    //animates images
    $(".board").addClass('winner');
    if(Data.player1score > Data.player2score){
        var img = $("<img>",
            {
                src: Data.currentSymbol,
            })
        $(".board").append(img);

        $(".board").text("HOME TEAM WINS!!!");
    }
    else if(Data.player1score < Data.player2score){
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