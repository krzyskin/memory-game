$(() => {
    /*let c=18;
    let array = [];
    let names = [];
    for(let i=0;i<c;i++){
        let cardA = `<div>aaaa</div>`;
        array.push(cardA);
    }

    array = array.join("");
    document.querySelector('body').innerHTML = array;*/
    let images =[];
    const cardImagesAll = ["img-0", "img-0","img-1", "img-1", "img-2", "img-2", "img-3", "img-3", "img-4", "img-4", "img-5", "img-5", "img-6", "img-6", "img-7", "img-7", "img-8", "img-8"];

    console.log(images[0]);

    urlApi = "https://dog.ceo/api/breeds/image/random/9";
        $.ajax({
            url: urlApi,
            async:false,
        }).done(function (res) {

            for (let i = 0; i < res.message.length; i++) {
                images.push(res.message[i]);
            }


        }).fail(function () {
            console.log('fail');
        });

    let allCards = document.querySelectorAll("div");

    allCards = [...allCards];

    const startTime = new Date().getTime();
    let activeCard = "";
    const activeCards = [];
    const gamePairs = allCards.length / 2;
    let gameResult = 0;

    const clickCard = function () {
        activeCard = this;
        if(activeCard == activeCards[0]) {
            return
        }
        activeCard.classList.remove('hidden');
        if (activeCards.length === 0) {
            activeCards[0] = activeCard;
            return;
        } else {
            allCards.forEach(card => card.removeEventListener('click', clickCard));
            activeCards[1] = activeCard;

            setTimeout(function () {
                if (activeCards[0].className === activeCards[1].className) {
                    console.log("wygrana");
                    activeCards.forEach(card => card.classList.add("off"));
                        gameResult++;
                    $('.off').css( "background-image", `` );
                        allCards = allCards.filter( card => !card.classList.contains("off"));


                        if (gameResult == gamePairs) {
                            console.log("wygrana gra");
                            const endTime = new Date().getTime();
                            const gameTime = (endTime - startTime)/1000;
                            alert(`udało sie!!! Twój czas to ${gameTime}`);
                            location.reload();
                        }

                } else {
                    console.log("przegrana");
                    activeCards.forEach(card => {
                        card.classList.add("hidden")
                    })
                }
                activeCard = "";
                activeCards.length = 0;

                allCards.forEach(card => card.addEventListener('click', clickCard));
            }, 1000)


        }
    };

    console.log(images[0]);
    const init = function () {

       allCards.forEach(card => {
            card.classList.add("hidden");
            const position = Math.floor(Math.random() * cardImagesAll.length);
            card.classList.add(cardImagesAll[position]);
            cardImagesAll.splice(position, 1);

        });


       for(let i=0;i<allCards.length/2;i++){
           $(`div[class*='${i}']`).css('background-image', `url(${images[i]})`);
          }

    };
    setTimeout(function () {
        allCards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        })
    }, 2000);
    init();
});