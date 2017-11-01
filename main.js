
$(document).ready(initializeApp);



function initializeApp(){
    $('.back').on('click', card_clicked);
    $('.card').on('dragstart', function(event){
        event.preventDefault();
    });


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
