
$(document).ready(initializeApp);



function initializeApp(){
    $('#welcome').modal({backdrop: true});
    $('.back').on('click', card_clicked);
    $('.card').on('dragstart', function(event){
        event.preventDefault();
    });

    $('.reset').on('click', reset);

    moveCard();

}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var bouncer = true;

var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;



function card_clicked() {

    if (bouncer === true) {

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
                bouncer = false;
                match_counter++;
                matches++;
                wait1sec();
                function wait1sec(){
                    setTimeout(function (){
                $(first_card_clicked).parent().find('.front').toggleClass('hidden');
                $(second_card_clicked).parent().find('.front').toggleClass('hidden');
                first_card_clicked = null;
                second_card_clicked = null;
                bouncer = true;
                    },2000)
                }
                if (match_counter === total_possible_matches) {
                    $('#winner').modal({backdrop: true});
                } else {
                    return;
                }
            } else {
                wait2sec();

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

    accuracy = Math.round((matches / attempts)*100);
    display_stats();
}

var frontCards = ['images/card1.png','images/card2.png','images/card3.png','images/card4.png','images/card5.png',
    'images/card6.png','images/card7.png','images/card8.png','images/card9.png','images/card10.png','images/card11.png',
    'images/card12.png','images/card13.png','images/card14.png','images/card15.png','images/card16.png','images/card17.png',
    'images/card18.png','images/card19.png','images/card20.png','images/card21.png','images/card22.png','images/card23.png',
    'images/card24.png','images/card25.png','images/card26.png','images/card27.png','images/card28.png','images/card29.png',
    'images/card31.png','images/card32.png','images/card33.png','images/card34.png','images/card35.png','images/card36.png',
    'images/card37.png','images/card38.png','images/card39.png','images/card40.png','images/card41.png','images/card42.png',
    'images/card43.png','images/card44.png'];


function moveCard () {




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
    console.log(cardArr);
    console.log(cardArr.length);

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
    console.log(elementArr.length);

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
    console.log(games_played);
    $('.games-played > .value').text(games_played);
    $('.attempts .value').text(attempts);

    var percentage = accuracy + '%';
    if(attempts !== 0) {
        $('.accuracy .value').text(percentage);
    }
}

function reset_stats () {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

function reset (){
    games_played++;
    reset_stats();
    display_stats();
    $('.back').show();
    moveCard();
    $('#game-area .front').removeClass('hidden')




}


// for(var i = 1; i < 19; i++){
//     if($('#game-area :nth-child(' + i + ').front').attr('class') === 'front hidden'){
//         $('#game-area :nth-child(' + i + ').front').removeClass('hidden');
//     }
// }

//
// for(var w = 0; w < 12 ; w++) {
//
//     setTimeout(function () {
//         $('#game-area .back').toggleClass('flip');
//     }, 500);
//     w;
// }

//
// for(var k = 0; k < 8; k++) {
//     var randomNum = Math.floor(Math.random() * 18)+1;
//     var randomNum2 = Math.floor(Math.random() * 18)+1;
//     var randomNum3 = Math.floor(Math.random() * 18)+1;
//
//     var a =[];
//     var b =[];
//     var c =[];
//
//
//     if(a.indexOf(randomNum) === -1 && b.indexOf(randomNum2) === -1 && c.indexOf(randomNum3) === -1) {
//         a.push(randomNum);
//         b.push(randomNum2);
//         c.push(randomNum3);
//     }
// }console.log('a:' + a + 'b: '+ b + "c: "+ c);



//            $('#game-area :nth-child(' + randomNum2 + ') .front img').attr('src', frontCards[randomNum]);
//$('#game-area :nth-child(' + randomNum3 + ') .front img').attr('src', frontCards[randomNum])


//$('#game-area :nth-child(1) .front img').attr('src', 'images/card9.png')
//$('.row-1 :nth-child(1) .front img').attr('src','images/card9.png');
//var element = $('#game-area .card .front img')
// var element = $('#game-area .card .front')



//
//
//
//
//     var randomNum = Math.floor(Math.random() * )
// }


