
$(document).ready(initializeApp);


function initializeApp(){
    clickHandler();
    welcomeModal();
    moveCard();

    $('.card').on('dragstart', function(event){
        event.preventDefault();
    });

    themeAudio.loop = true;
    themeAudio.play();
}


var birthday = new Audio('audio/birthdayyo.mp3');
var winnerSound = new Audio('audio/winner.mp3');
var clickSound = new Audio('audio/clickSound.mp3');
var themeAudio = new Audio('audio/theme.mp3');


var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var bouncer = true;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;




function clickHandler(){
    $('.back').on('click', card_clicked);
    $('.reset').on('click', resetGame);
    $('#music').on('click', musicControl);
    $('#sfx').on('click', sfxControl);
    $('.about').on('click', function(){
        $('#aboutModal').modal({backdrop: true})
    })
}



function welcomeModal(){
    $('#welcome').modal({backdrop: true});
    setTimeout(function(){
        $('#welcome').modal('hide');
    }, 1500);
}

function card_clicked() {
    if (bouncer === true) {
        clickSound.play();
        bouncer = false;
        $(this).hide();
        if (first_card_clicked === null) {
            first_card_clicked = this;
            bouncer = true;
        } else {
            second_card_clicked = this;
            attempts++;

            var firstUrl = $(this).parent().find('.front img').attr('src');
            var secondUrl = $(first_card_clicked).parent().find('.front img').attr('src');

            if (firstUrl === secondUrl) {

                winnerSound.play();
                bouncer = false;
                match_counter++;
                matches++;

                accuracy();
                display_stats();
                wait1sec();
                function wait1sec(){
                    $(first_card_clicked).parent().find('.front').toggleClass('spinner');
                    $(second_card_clicked).parent().find('.front').toggleClass('spinner')

                    setTimeout(function (){
                        $(first_card_clicked).parent().find('.front').toggleClass('hidden');
                        $(second_card_clicked).parent().find('.front').toggleClass('hidden');
                        first_card_clicked = null;
                        second_card_clicked = null;
                        bouncer = true;
                    },2000)
                }
                if (match_counter === total_possible_matches) {

                    birthday.play();
                    themeAudio.muted = true;
                    $('#winner').modal({backdrop: true});
                } else {
                    return;
                }
            } else {
                wait2sec();
                accuracy();

                function wait2sec() {
                    setTimeout(function () {
                        $(first_card_clicked).show();
                        $(second_card_clicked).show();
                        first_card_clicked = null;
                        second_card_clicked = null;
                        bouncer = true;
                    }, 1000);
                }
            }
        }
    }
    display_stats();
}


function accuracy () {
    accuracy = Math.round((matches / attempts)*100);
    var percentage = accuracy + '%';
    if(!isNaN(accuracy)) {
        $('.accuracy .value').text(percentage);
    }
}




function moveCard () {
    if(themeAudio.muted){
        themeAudio.muted = false;
    }
    //store random numbers between 1 - 44 into cardRandums array
    var cardCounter = null;
    var cardRandNums =[];
    while(cardCounter < 9){
        var randNum = Math.floor(Math.random() * 44)+1;
        if(cardRandNums.indexOf(randNum) === -1){
            cardCounter++;
            cardRandNums.push(randNum);
        }
    }
    //store random numbers between 1 - 18 into elementRandNums array
    var elementCounter = null;
    var elementRandNums =[];
    while(elementCounter < 18){
        var randNum = Math.floor(Math.random() * 18)+1;
        if(elementRandNums.indexOf(randNum) === -1){
            elementCounter++;
            elementRandNums.push(randNum);
        }
    }

    for(var i = 0, k =0; i <cardRandNums.length , k < elementRandNums.length; i++, k+=2){

        var $element1 = $(`#game-area :nth-child(${elementRandNums[k]}) .front img`);
        var $element2 = $(`#game-area :nth-child(${elementRandNums[k +1]}) .front img`)

        //put cards into elements
        $element1.attr('src', `images/card${cardRandNums[i]}.png`);
        $element2.attr('src', `images/card${cardRandNums[i]}.png`);

        // move card around based randomly
        $element1.closest('.card').css({
            left: (-k-5) + '%',
            top: (k-5) + '%'
        });
        $element2.closest('.card').css({
            left: (k-5) + '%',
            top: (-k-5) + '%'
        });

        // put all cards back to their original space
        setTimeout(function(){
            $('.card').css({
                left: 0,
                top: 0
            })
        }, 1500);

        // front card will show for .5 seconds and spins
        $('#game-area .back').hide();
        $('.card').addClass('spinner');
        setTimeout(function () {
            $('#game-area .back').show();

        }, 500);
    }
}


function display_stats () {
    $('.games-played > .value').text(games_played);
    $('.attempts .value').text(attempts);
    accuracy();
}






function musicControl (){
    if($('#music').text() === 'Music Off'){
        themeAudio.muted = true;
        $('#music').text('Music On')
    }else if($('#music').text() === 'Music On'){
        themeAudio.muted = false;
        $('#music').text('Music Off')
    }
}

function sfxControl () {
    if($('#sfx').text() === 'SFX Off'){
        birthday.muted = true;
        winnerSound.muted = true;
        clickSound.muted = true;
        $('#sfx').text('SFX On');
    }else if($('#sfx').text()=== 'SFX On'){
        birthday.muted = false;
        winnerSound.muted = false;
        clickSound.muted = false;
        $('#sfx').text('SFX Off')
    }
}


function resetGame (){
    birthday.pause();
    games_played++;
    reset_stats();

    $('.card').removeClass('spinner');
    $('.front').removeClass('hidden');
    $('.front').removeClass('spinner');

    moveCard();
}

function reset_stats () {
    match_counter = 0;
    accuracy = 0;
    matches = 0;
    attempts = 0;
    $('.accuracy .value').text('');
    display_stats();
}




