
$(document).ready(initializeApp);



function initializeApp(){
    $('.card').on('click', card_clicked);


}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var bouncer = true;

function card_clicked(){
    if(bouncer === true) {

        bouncer = false;
        $(this).find('.back').hide();
        if (first_card_clicked === null) {
            first_card_clicked = this;
            bouncer = true;
        } else {
            second_card_clicked = this;

            var firstUrl = $(this).find('.front img').attr('src');
            var secondUrl = $(first_card_clicked).find('.front img').attr('src');

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

                        $(first_card_clicked).find('.back').show();
                        $(second_card_clicked).find('.back').show();
                        first_card_clicked = null;
                        second_card_clicked = null;
                        bouncer = true;
                    }, 2000);
                }

            }
        }
    }
}
