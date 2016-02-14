var boom = new Audio("audio/boomshaka.mp3");
var downtown = new Audio("audio/downtown.mp3");
var onfire = new Audio("audio/onfire.mp3");
var heckler = new Audio("audio/boo.mp3");
var alert = [["Boomshakala",boom],["From DOWNTOWN", downtown],["He's on fire", onfire]];
var wiff = [["Airrball", heckler],["a Big Miss", heckler],["wheres the focus", heckler]];

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
        var r = Math.floor(Math.random()* alert.length);
        displayAlert(alert[r][0],"success", alert[r][1]);
    }
    else{
        var r = Math.floor(Math.random()* wiff.length);
        displayAlert(wiff[r][0],"warn", wiff[r][1] );
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
    if(player1turn){
        $(".home").addClass("current_team");
        $(".away").removeClass("current_team");
        currentSymbol = player1Symbol;
    }
    else{
        $(".away").addClass("current_team");
        $(".home").removeClass("current_team");
        currentSymbol = player2Symbol;
    }
    $(".home .value").text(player1score);
    $(".away .value").text(player2score);
}

function winAnimation(){ // displays which player wins and displays crowd imgs and audio
    //animates images
    if(player1score > player2score){
        $(".board").text("HOME TEAM WINS!!!");
    }
    else if(player1score < player2score){
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

    clearInterval(countdownClock);//calls clearInterval function with parameter countdownClock
    notStarted = true;
    $("#alert").show();

}