const cardsContainer = document.getElementById("cards");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;

fetch("./data/cards.json")
.then((res) => res.json())
.then((data) => {
    cards = [...data,...data];
    // first data => "image": "assets/chili.png".(link).
    // secind data =>  "name": "chili".(name).
    console.log(cards);
    });

    function shuffleCards()
    {
        let temp;//ward
        let currentIndex = cards.length;//adam
        let randomIndex;//john

        while(currentIndex !== 0)
        {
            randomIndex = Math.floor(Math.random() * currentIndex);//Math.floor => close the number to the lower value ====> to the numbers not to be outside the array.
            currentIndex--;
            temp = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temp;
        }  
    }
    function jenerate_cards() // jenerate and create cards.
        {
         for(let card of cards)
         {
            const cardElement = document.createElement('div');// const==> like private it doesn't be changed.
            cardElement.classList.add("card");
            cardElement.setAttribute("data-name", card.name);
            cardElement.innerHTML =`
            <div class = "front">
            <img class = "front-image" src = ${card.image}/>
            </div>
            <div class = "back"></div>
            `;
            // this code from HTML =====> to connect html > js.  
         }
         cardsContainer.appendChild(cardElement);
         cardElement.addElementListener("click",flipcard);
        }
        function flipcard()
        {
            if(lockBoard)
            {
                return;
            }
            if(this === firstcard)
            {
                return;
            }
            this.classList.add("fliped");

            if(firstCard)
            {
                firstcard = this;
                return;
            }
            secondCard = this;
            lockBoard = true;
            checkForMatch();// compare the first card and the second card.
        } 

        function checkForMatch()// check if the cards are the same .
        {
            let isMatch = firstCard.dataset.name === secondCard.dataset.name;
            if(isMatch)
            {
                disableCards();
            }
            else
            {
                unfliped();
            }
        }