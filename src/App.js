//css
import './App.css';
//react
import { useCallback, useEffect, useState } from "react";
//dados
import { wordsList } from "./data/words";
//components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];


function App() {



  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuessed] = useState(3);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = () => {

    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return { word, category };
  };

  //iniciar game
  const startGame = () => {

    //pick word and pick category
    const { word, category } = pickWordAndCategory();

    let wordLetters = word.split("");

    wordLetters = wordLetters.map((e) => e.toLowerCase());

    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  };

  //processar letra inputada
  const verifyLetter = (letter) => {

    const  normalizedLetter = letter.toLowerCase();

    //check if inputed letter has already been utilized (right or wrong)
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ])
    }

    

    //setGameStage(stages[2].name);
  }

  console.log(guessedLetters)
    console.log(wrongLetters)

  //reiniciar
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && (
        <Game verifyLetter={verifyLetter} 
              pickedWord={pickedWord} 
              pickedCategory={pickedCategory} 
              letters={letters} 
              guessedLetters = { guessedLetters }
              wrongLetters = { wrongLetters }
              guesses = { guesses }
              score = { score }
        />)}
      {gameStage === "end" && <GameOver retry={retry} />}
    </div>
  );
}

export default App;
