const newWordBtn = document.querySelector('#btnNovaPalavra');
const checkBtn = document.querySelector('#btnVerificarPalavra');
const userAns = document.querySelector('#ipPalavraResposta');
const playedLettersEl = document.querySelector('#spLetrasJogadas');
const img = document.querySelector('#imgForca');
userAns.focus();

const jogo = {
  randomWord: '',
  playedLetters: [],
  newArr: [],
  indices: [],
  counter: 0,
}

const palavras = [
  "macaco", "elefante", "baleia", "cachorro"
];

//Função refatorada com 5 sentenças
newWordBtn.addEventListener("click", () => {
  raffleRandomWord(palavras);
  replaceItem();
  clearGame();
  rmvAttributes();
});

const raffleRandomWord = (list) => {
  const raffleWord = Math.floor(Math.random() * list.length);
  return jogo.randomWord = list[raffleWord];
}

const replaceItem = () => {
  const wordArr = jogo.randomWord.split('');
  const newWordArr = wordArr.map(letter => letter.replace(letter, '_'));
  const arrToStrg = newWordArr.join(' ');
  spPalavraSecreta.innerText = arrToStrg;
}

const clearGame = () => {
  playedLettersEl.innerText = '';
  jogo.newArr = []
  jogo.playedLetters = [];
  jogo.counter = 0;
  img.setAttribute('src', `img/Forca0${jogo.counter}.png`);

}

const rmvAttributes = () => {
  userAns.removeAttribute('disabled', 'true');
  checkBtn.removeAttribute('disabled', 'true');
}

//Função refatorada com 5 sentenças
checkBtn.addEventListener('click', () => {
  showLetters();
  userAns.focus();
  userAns.value = '';
});

const showLetters = () => {
  let letter = userAns.value;
  jogo.playedLetters.push(letter);
  playedLettersEl.innerText = jogo.playedLetters;
  verifyLetter();
}

//Função refatorada com 5 sentenças
const verifyLetter = () => {
  if (jogo.randomWord.includes(userAns.value)) {
    revealsLetter();
  } else {
    ++jogo.counter;
    wrongLetter();
  }
}


//Função refatorada com 5 sentenças
const wrongLetter = () => {
  changeImage();
}

const changeImage = () => {
  if (jogo.counter == 6) {
    youLose();
  } else {
    img.setAttribute('src', `img/Forca0${jogo.counter}.png`);
  }
}

const youLose = () => {
  checkBtn.setAttribute('disabled', 'true');
  img.setAttribute('src', `img/Forca0${jogo.counter}.png`);
  userAns.setAttribute('disabled', 'true');
  alert("você perdeu.");
}


//Função refatorada com 5 sentenças
const revealsLetter = () => {
  let palavraArr = jogo.randomWord.split('');
  replaceLetter(palavraArr);
  checkWord(palavraArr);
}

const replaceLetter = (word) => {
  while (jogo.newArr.length == 0) {
    word.forEach((_, i) => {
      jogo.newArr[i] = '_';
    });
  }
}

const verificaVitoria = () => {
  if (!jogo.newArr.includes('_') && jogo.counter < 6) {
    checkBtn.setAttribute('disabled', 'true');
    alert('você ganhou!');
  }
}

const checkWord = (word) => {
  if (word.includes(userAns.value)) {
    updateInterface(word)
  }
}

const updateInterface = (word) => {
  getIndex(word);
  verificaVitoria();
  updateIf();
}

const getIndex = (word) => {
  for (i = 0; i < word.length; i++) {
    if (word[i] == userAns.value) {
      jogo.indices.push(i);
      jogo.newArr[i] = userAns.value;
    }
  }
}

const updateIf = () => {
  const wordStrg = jogo.newArr.join(' ');
  spPalavraSecreta.innerText = wordStrg;
}