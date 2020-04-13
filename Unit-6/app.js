
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('div#phrase');
const phrases = [`die with memories not dreams`, `change the world by being yourself`,
`everything you can imagine is real`, `we are what we think`,`what we think we become`];

const resetButton = document.querySelector('.btn__reset');
const div = document.querySelector('.winlost');
const ul = document.querySelector('#phrase ul');

const lost = document.querySelector('#lost');
const win = document.querySelector('#win');
let missed = 0; 
const ol = document.querySelector('#list');
let checkLetters = document.getElementsByClassName("letter");
let checkShowed =  document.getElementsByClassName("show");



// functions 

function getRandomPhraseAsArray(arr){
    let random = Math.floor(5 * Math.random());
    let phrase = arr[random];
    return phrase;
}

const addPhraseToDisplay = (arr) =>{

    for(let i=0; i<arr.length; i++){
        const li = document.createElement('li');
        if(arr[i].includes(' ')){
            li.style.width = '15px';
        }
        else{
            li.className = "letter";
            li.textContent = arr[i];
        }
        ul.appendChild(li);
    }
}

let checkLetter = (btn) =>{
    let letterFound = null;
    const letters = document.getElementsByClassName("letter");
    
    for(letter of letters){
        if(btn.innerHTML == letter.innerHTML ){
            letter.classList.add('show');
            letterFound = btn.innerHTML;
        }  
    }
   return letterFound;
}


const checkIfWon = () => {
    if(checkLetters.length === checkShowed.length){
        win.classList.remove("hide");
        setTimeout(() => {win.classList.add("win");}, 400);
    }
}


// listeners



resetButton.addEventListener('click', () =>{
    const overlay = document.querySelector('#overlay');
    overlay.classList.add('hide');
});

qwerty.addEventListener('click', (e) => {
    
    const btn = e.target; 
    
    if(btn.tagName === "BUTTON" && btn.className !== "chosen"){
        
        btn.classList.add("chosen");
        btn.disabled = true;
         let result = checkLetter(btn);
        
        if(result === null){
            missed++;
            ol.lastElementChild.remove();
            btn.classList.add("wrong");
            if(missed > 4){
                lost.classList.remove("hide");
                setTimeout(() => {lost.classList.add("lost");}, 400); //source: https://www.w3schools.com/jsref/met_win_settimeout.asp
            }
        }
    } 
    checkIfWon(); 
});

div.addEventListener('click', (e)=>{
    btn = e.target;
    if(btn.tagName==="A"){
        location.reload();  //source: http://strefakodera.pl/tworzenie-stron-www/podrecznik-javascript/tworzenie-przycisku-wstecz-dalej-i-odswiez;
    }
});

// place where I call the functions
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);
