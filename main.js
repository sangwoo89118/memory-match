
$(document).ready(initializeApp);


function initializeApp(){
    welcomeModal();
    moveCard();

    $('.back').on('click', card_clicked);
    $('.reset').on('click', reset);
    $('#music').on('click', musicControl);
    $('#sfx').on('click', sfxControl);

    $('.card').on('dragstart', function(event){
        event.preventDefault();
    });


    $('.about').on('click', function(){
        $('#aboutModal').modal({backdrop: true})
    })

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

                acc();
                display_stats();
                wait1sec();
                function wait1sec(){
                    $(first_card_clicked).parent().find('.front').toggleClass('damn');
                    $(second_card_clicked).parent().find('.front').toggleClass('damn')

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
                acc();

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


function acc () {
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


    var counterF = null;
    var cardArr =[];
    var bouncerN = true;
    while(bouncerN){
        if(counterF < 9){

            var randomNum = Math.floor(Math.random() * 44)+1;
            if(cardArr.indexOf(randomNum) === -1){
                counterF++;
                cardArr.push(randomNum);
            }
        }else{
            bouncerN = false;
        }
    }

    var counterN = null;
    var elementArr =[];
    var bouncer2 = true;
    while(bouncer2){
        if(counterN < 18){

            var randomNum2 = Math.floor(Math.random() * 18)+1;
            if(elementArr.indexOf(randomNum2) === -1){
                counterN++;
                elementArr.push(randomNum2);
            }
        }else{
            bouncer2 = false;
        }
    }
    console.log(elementArr);


    for(var i = 0, k =0; i <cardArr.length , k < elementArr.length; i++, k+=2){
        $('#game-area :nth-child(' + elementArr[k] + ') .front img').attr('src', 'images/card'+cardArr[i]+'.png');
        $('#game-area :nth-child(' + elementArr[k+1] + ') .front img').attr('src', 'images/card'+cardArr[i]+'.png');

        $('#game-area :nth-child(' + elementArr[k] + ') .front img').parent().parent().css({
            left: -k+10 + '%',
            top: -k+10 + '%',
        })
        $('#game-area :nth-child(' + elementArr[k+1] + ') .front img').parent().parent().css({
            left: -k+10 + '%',
            top: -k+10 + '%',
        })

        setTimeout(function(){
            for(var i = 1; i < 19; i++) {
                $('#game-area :nth-child(' + i + ') .front img').parent().parent().css({
                    left: 0,
                    top: 0,
                })
            }
        }, 1500);

        $('#game-area .back').hide();
        setTimeout(function () {
            $('#game-area .back').show();
        }, 450);
    }
}


function display_stats () {

    $('.games-played > .value').text(games_played);
    $('.attempts .value').text(attempts);
    acc();
}

function reset_stats () {
    match_counter = 0;
    accuracy = 0;
    matches = 0;
    attempts = 0;
    $('.accuracy .value').text('');
    display_stats();
}

function reset (){
    birthday.pause();
    games_played++;
    reset_stats();
    $('.back').show();
    moveCard();
    $('#game-area .front').removeClass('hidden');
    $('#game-area .front').removeClass('damn');
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


// var frontCards = ['images/card1.png','images/card2.png','images/card3.png','images/card4.png','images/card5.png',
//     'images/card6.png','images/card7.png','images/card8.png','images/card9.png','images/card10.png','images/card11.png',
//     'images/card12.png','images/card13.png','images/card14.png','images/card15.png','images/card16.png','images/card17.png',
//     'images/card18.png','images/card19.png','images/card20.png','images/card21.png','images/card22.png','images/card23.png',
//     'images/card24.png','images/card25.png','images/card26.png','images/card27.png','images/card28.png','images/card29.png',
//     'images/card31.png','images/card32.png','images/card33.png','images/card34.png','images/card35.png','images/card36.png',
//     'images/card37.png','images/card38.png','images/card39.png','images/card40.png','images/card41.png','images/card42.png',
//     'images/card43.png','images/card44.png'];

