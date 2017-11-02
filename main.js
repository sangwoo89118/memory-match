
$(document).ready(initializeApp);



function initializeApp(){
    $('.back').on('click', card_clicked);
    $('.card').on('dragstart', function(event){
        event.preventDefault();
    });

    moveCard();


}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var bouncer = true;

function card_clicked(){
    console.log(this);
    if(bouncer === true) {


        bouncer = false;
        $(this).hide();
        if (first_card_clicked === null) {
            first_card_clicked = this;
            bouncer = true;
        } else {
            second_card_clicked = this;

            var firstUrl = $(this).parent().find('.front img').attr('src');
            var secondUrl = $(first_card_clicked).parent().find('.front img').attr('src');

            if (firstUrl === secondUrl) {
                bouncer = true;
                match_counter++;
                first_card_clicked = null;
                second_card_clicked = null;
                if (match_counter === total_possible_matches) {
                    $('#game-area').text('You Won');
                    $('#game-area').css({
                        color: 'white',
                        'font-size': '12vmin',
                    })
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
                    }, 2000);
                }

            }
        }
    }
}


var frontCards = [
    'images/card1.png',
    'images/card2.png',
    'images/card3.png',
    'images/card4.png',
    'images/card5.png',
    'images/card6.png',
    'images/card7.png',
    'images/card8.png',
    'images/card9.png',
    'images/card10.png',
    'images/card11.png',
    'images/card12.png',
    'images/card13.png',
    'images/card14.png',
    'images/card15.png',
    'images/card16.png',
    'images/card17.png',
    'images/card18.png'
    // 'images/card19.png',
]


function moveCard () {
    var counterF = null;
    var cardArr =[];
    var bouncerN = true;
    while(bouncerN){
        if(counterF < 9){

            var randomNum = Math.floor(Math.random() * 17);
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
        $('#game-area :nth-child(' + elementArr[k] + ') .front img').attr('src', frontCards[cardArr[i]]);
        $('#game-area :nth-child(' + elementArr[k+1] + ') .front img').attr('src', frontCards[cardArr[i]]);


    }






}



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


