// JavaScript Document
console.log("howdy");

// variabele tekst elementen 
var h1Element = document.querySelector('h1');
var h2Element = document.querySelector('h2');
var scoreElement = document.querySelector('span');

// variabele button elementen
var guessbutton = document.querySelector('.button1')
var nextbutton = document.querySelector('.button2');
var listButton = document.querySelector('.listbutton');
var closeButton = document.querySelector('.closebutton');
var likeButton = document.querySelector('.likebutton');

// variable list element
var lijst = document.querySelector("ul");

var trashCan = document.querySelector(".trashcan");

// input element
var inputValue = document.querySelector('input');

// variable random pokemonplaatje
var pokemonimg = document.querySelector('.pokemonimg');

var pokemon = [
    {
        img: "images/snorlax2.png",  
        name: "snorlax"
    },
    {
        img: "images/pikachu.png",  
        name: "pikachu"
    },
    {
        img: "images/bulbasaur.png",  
        name: "bulbasaur"
    },
    {
        img: "images/chimchar.png",  
        name: "chimchar"
    },
    {
        img: "images/deoxys.png",  
        name: "deoxys"
    }   
];


// zorgt ervoor dat er steeds een andere randomgetal en dus een random pokemon wordt gegenereerd
var randomGetal;

function randompokemon(){
    randomGetal = Math.random()*pokemon.length;
    randomGetal = Math.floor(randomGetal);
    pokemonimg.src = pokemon[randomGetal].img;
    pokemonimg.classList.add('nietgeraden');
}
randompokemon(); 


// waarde van de score
var score = 0;
scoreElement.textContent = score;


// next button en like button zijn niet zichtbaar als er nog niks is geraden   
nextbutton.hidden = true;
likeButton.hidden = true;

function checkbutton(){
    if(inputValue.value == ""){
        guessbutton.disabled = true;
    }else{
        guessbutton.disabled = false;
    }
}


//wat er gebeurt als je op de 'guess' button hebt geklikt. 
//Is het goed dan kan je naar de volgende en anders wordt je score gereset en moet je verder raden
function guess(){
    if(pokemon[randomGetal].name == inputValue.value){
        h2Element.hidden = false;
        h2Element.textContent = 'Correct!';
        h2Element.classList.add("goedgeraden");
        guessbutton.hidden = true;
        nextbutton.hidden = false;
        likeButton.hidden = false;
        inputValue.disabled = true;
        pokemonimg.classList.remove('nietgeraden');
        score = score + 1;
        scoreElement.textContent = score;
    }
    else{
        h2Element.hidden = false;
        h2Element.textContent = 'Wrong!';
        inputValue.value = '';
        score = 0
        scoreElement.textContent = score;
    }
}


// wat er gebeurt als je op de 'next pokemon' button klikt
function nextpokemon(){
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
    pokemon.splice(randomGetal, 1)
    console.log(pokemon);
    randompokemon();
    guessbutton.hidden = false;
    nextbutton.hidden = true;
    likeButton.hidden = true;
    h2Element.hidden = true;
    h2Element.classList.remove("goedgeraden");
    inputValue.value = '';
    inputValue.disabled = false;
    pokemonimg.classList.add('nietgeraden');
    likeButton.classList.remove('redheart');
}

// css wordt toegevoegd of weggehaald als je de lijst open of dicht maakt
var sectionElement = document.querySelector('section:nth-of-type(2)');

function lijstOpen(){
    sectionElement.classList.add('open');
}

function lijstDicht(){
    sectionElement.classList.remove('open');
}



// chatGBT & sanne(docent)
// functie voor de toggle like button. De functie checkt of de pokemon al in de lijst zit of niet. 
// Als de pokemon er al in zit wordt de list item eruit gehaald en als de pokemon er nog niet inzit wordt deze toegevoegd aan de lijst.
var addedToList = [];

function toggleLike() {
    if (addedToList.includes(randomGetal)) {
      // Pokemon already added, remove it from the list
      var pokemonElements = lijst.querySelectorAll("li");
      pokemonElements.forEach(function (pokemonElement) {
        var nameElement = pokemonElement.querySelector(".name");
        if (nameElement.textContent === pokemon[randomGetal].name) {
          pokemonElement.remove();
  
          var index = addedToList.indexOf(randomGetal);
          addedToList.splice(index, 1);
          likeButton.classList.remove('redheart');
        }
      });
    } else {
      // Pokemon not added, add it to the list
      addedToList.push(randomGetal);
      var pokemonhtml =
        `<li>
          <h3 class="name">${pokemon[randomGetal].name}</h3>
          <img src="${pokemon[randomGetal].img}" alt="${pokemon[randomGetal].name}">
        </li>`;
      lijst.insertAdjacentHTML("afterbegin", pokemonhtml);
      likeButton.classList.add('redheart'); 
    }
  }

// eventlisteners
guessbutton.addEventListener('click', guess);
nextbutton.addEventListener('click', nextpokemon);
listButton.addEventListener('click', lijstOpen);
closeButton.addEventListener('click', lijstDicht);
inputValue.addEventListener('input', checkbutton);
likeButton.addEventListener('click', toggleLike);

// code voor de libraries zoeken en draggen

// de items in de lijst draggable maken
new Sortable(lijst, {
  animation: 150,
  ghostClass: 'blue-background-class'
});

// zoekfunctie 
var options = {
    valueNames: ['name']
  };
  
  var charactersList = new List('theList', options);
