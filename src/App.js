import logo from './logo.svg';
import './App.css';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useEffect, useState } from 'react';
import plantsList from './plants';

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function App() {
  const [index, setIndex] = useState(Math.floor(Math.random() * plantsList.length));
  const [didAnswer, setDidAnswer] = useState()
  const [answers, setAnswers] = useState(null)
  const [completed, setCompleted] = useState({})
  const [lastClicked, setLastClicked] = useState();

  const data = plantsList[index];
  const [curImg, setCurImg] = useState(Math.floor(Math.random() * data.img.length));


  if (!answers) {
    let tempAnswers = [index];
    while (tempAnswers.length < 6) {
      let selection = Math.floor(Math.random() * plantsList.length);
      let isValid = true;
      for (let i = 0; i < tempAnswers.length; i++) {
        if (selection == tempAnswers[i]) {
          isValid = false;
          break;
        }
      }
      if (isValid) {
        tempAnswers.push(selection);
      }
    }
    setAnswers(shuffle(tempAnswers));
  };

  if (!answers) {
    return <div />
  }

  return (
    <div className="App">
      <img src={
        data.img[curImg]
      } />
      <Stack spacing={2} direction="column">
        {answers.map((_, i) => {
          // Return the element. Also pass key
          if ((!didAnswer || index != answers[i]) && lastClicked != i) {
            return (<Button onClick={() => {
              setDidAnswer(true);
              setLastClicked(i);
              let tempCompleted = completed;
              completed[index] = true;
              setCompleted(tempCompleted);
              console.log(completed);
            }} variant="outlined">{plantsList[answers[i]].comName + ", " + plantsList[answers[i]].sciName}</Button>);
          } else if (lastClicked == i && index != answers[i]) {
            return (<Button variant="contained" color="error">{plantsList[answers[i]].comName + ", " + plantsList[answers[i]].sciName}</Button>
            );
          }
          else {
            return (<Button variant="contained" color="success">{plantsList[answers[i]].comName + ", " + plantsList[answers[i]].sciName}</Button>
            );
          }
        })}
      </Stack>
      <br />
      <Button onClick={() => {
        if (Object.keys(completed).length == plantsList.length) {
          alert("You did it! Refresh to restart.")
          return
        }
        let i = Math.floor(Math.random() * plantsList.length);
        while (completed[i] != null) {
          i = Math.floor(Math.random() * plantsList.length);
        }
        console.log("ermm awkward");
        setIndex(i);
        setDidAnswer(false);
        setAnswers(null);
        setLastClicked(null);
        setCurImg(Math.floor(Math.random() * plantsList[i].img.length));
        console.log(plantsList[index].refName);
        console.log(plantsList[index].img.length);
        console.log(completed);
      }} variant="contained">Next Question</Button>
    </div>
  );
}

export default App;
