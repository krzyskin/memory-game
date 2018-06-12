$(() => {
    const cardColors = ["red", "red", "green", "green", "blue", "blue", "violet", "violet", "yellow", "yellow", "grey", "grey", "brown", "brown", "orange", "orange", "pink", "pink"];

    let allCards = document.querySelectorAll("div");

    allCards = [...cardAll];

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
            console.log("1");
            activeCards[0] = activeCard;
            return;
        } else {
            console.log("2");
            allCards.forEach(card => {
                card.removeEventListener('click', clickCard)
            });
            activeCards[1] = activeCard;

            setTimeout(function () {
                if (activeCards[0].className === activeCards[1].className) {
                    console.log("wygrana");
                    activeCards.forEach(card => card.classList.add("off"));
                        gameResult++;
                        allCards = cards.filter( card => !card.classList.contains("off"));
                        console.log(gameResult);
                        console.log(gamePairs);

                        if (gameResult == gamePairs) {
                            console.log("wygrana gra");
                            const endTime = new Date().getTime();
                            const gameTime = (endTime - startTime)/1000;
                            alert(`udało sie!!! Twój czs to ${gameTime}`);
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

                cards.forEach(card => card.addEventListener('click', clickCard));
            }, 1000)


        }
    };
    const init = function () {
        allCards.forEach(card => {
            const position = Math.floor(Math.random() * cardColors.length);
            card.classList.add(cardColors[position]);
            cardColors.splice(position, 1);
        })
    };
    setTimeout(function () {
        allCards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        })
    }, 2000);
    init();
});