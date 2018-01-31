
$(document).ready(initializeApp);


function initializeApp(){
    clickHandler();
    welcomeModal();
    moveCard();

    $('.card').on('dragstart', function(event){
        event.preventDefault();
    });

    gameData.themeAudio.loop = true;
    gameData.themeAudio.play();
}


var gameData = {
    birthday : new Audio('assets/audio/birthdayyo.mp3'),
    winnerSound : new Audio('assets/audio/winner.mp3'),
    clickSound : new Audio('assets/audio/clickSound.mp3'),
    themeAudio : new Audio('assets/audio/theme.mp3'),

    first_card_clicked : null,
    second_card_clicked : null,
    total_possible_matches : 9,
    match_counter : 0,
    bouncer : false,

    matches : 0,
    attempts : 0,
    accuracy : 0,
    games_played : 0
}



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

function moveCard () {
    if(gameData.themeAudio.muted){
        gameData.themeAudio.muted = false;
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

    for(var i = 0; i <cardRandNums.length; i++){

        var k = i * 2;
        var $element1 = $(`#game-area :nth-child(${elementRandNums[k]}) .front img`);
        var $element2 = $(`#game-area :nth-child(${elementRandNums[k +1]}) .front img`)

        //put cards into elements
        $element1.attr('src', `assets/images/card${cardRandNums[i]}.png`);
        $element2.attr('src', `assets/images/card${cardRandNums[i]}.png`);

        // move card around based randomly
        $element1.closest('.card').css({
            left: (-k-5) + '%',
            top: (k-5) + '%'
        });
        $element2.closest('.card').css({
            left: (k-5) + '%',
            top: (-k-5) + '%'
        });
    }
    // put all cards back to their original space
    setTimeout(function(){
        console.log('hello world');
        $('.card').css({
            left: 0,
            top: 0
        })
        gameData.bouncer = true;
    }, 1500);

    // front card will show for .5 seconds and spins
    $('#game-area .back').hide();
    $('.card').addClass('spinner');
    setTimeout(function () {
        console.log('world hello');
        $('#game-area .back').show();

    }, 500);


}

function card_clicked() {
    if (gameData.bouncer === true) {
        console.log('clicks before wow????');
        gameData.clickSound.play();

        gameData.bouncer = false;
        if (gameData.first_card_clicked === null) {

            gameData.first_card_clicked = this;
            $(gameData.first_card_clicked).hide();

            gameData.bouncer = true;
        } else {

            gameData.second_card_clicked = this;
            $(gameData.second_card_clicked).hide();
            gameData.attempts++;
            var firstUrl = $(this).parent().find('.front img').attr('src');
            var secondUrl = $(gameData.first_card_clicked).parent().find('.front img').attr('src');

            if (firstUrl === secondUrl) {
                console.log('hello double!!');
                gameData.winnerSound.play();
                gameData.bouncer = false;
                gameData.match_counter++;
                gameData.matches++;


                acc();
                display_stats();
                wait1sec();
                function wait1sec(){
                    $(gameData.first_card_clicked).parent().find('.front').toggleClass('spinner');
                    $(gameData.second_card_clicked).parent().find('.front').toggleClass('spinner')

                    setTimeout(function (){
                        $(gameData.first_card_clicked).parent().find('.front').toggleClass('hidden');
                        $(gameData.second_card_clicked).parent().find('.front').toggleClass('hidden');
                        gameData.first_card_clicked = null;
                        gameData.second_card_clicked = null;
                        gameData.bouncer = true;
                    },2000)
                }
                if (gameData.match_counter === gameData.total_possible_matches) {

                    gameData.birthday.play();
                    gameData.themeAudio.muted = true;
                    $('#winner').modal({backdrop: true});
                } else {
                    return;
                }
            } else {
                wait2sec();
                acc();

                function wait2sec() {
                    setTimeout(function () {
                        $(gameData.first_card_clicked).show();
                        $(gameData.second_card_clicked).show();
                        gameData.first_card_clicked = null;
                        gameData.second_card_clicked = null;
                        gameData.bouncer = true;
                    }, 1000);
                }
            }
        }
    }
    display_stats();
}

function resetGame (){
    gameData.birthday.pause();
    gameData.games_played++;
    reset_stats();
    gameData.bouncer = false;
    $('.card').removeClass('spinner');
    $('.front').removeClass('hidden');
    $('.front').removeClass('spinner');

    moveCard();
}

function musicControl (){
    if($('#music').text() === 'Music Off'){
        gameData.themeAudio.muted = true;
        $('#music').text('Music On')
    }else if($('#music').text() === 'Music On'){
        gameData.themeAudio.muted = false;
        $('#music').text('Music Off')
    }
}

function sfxControl () {
    if($('#sfx').text() === 'SFX Off'){
        gameData.birthday.muted = true;
        gameData.winnerSound.muted = true;
        gameData.clickSound.muted = true;
        $('#sfx').text('SFX On');
    }else if($('#sfx').text()=== 'SFX On'){
        gameData.birthday.muted = false;
        gameData.winnerSound.muted = false;
        gameData.clickSound.muted = false;
        $('#sfx').text('SFX Off')
    }
}

function acc () {
    gameData.accuracy = Math.round((gameData.matches / gameData.attempts)*100);
    var percentage = gameData.accuracy + '%';
    if(!isNaN(gameData.accuracy)) {
        $('.accuracy .value').text(percentage);
    }
}

function display_stats () {
    $('.games-played > .value').text(gameData.games_played);
    $('.attempts .value').text(gameData.attempts);
    acc();
}


function reset_stats () {
    gameData.match_counter = 0;
    gameData.accuracy = 0;
    gameData.matches = 0;
    gameData.attempts = 0;
    $('.accuracy .value').text('N/A');
    display_stats();
}




