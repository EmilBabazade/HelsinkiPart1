import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const AnectodeOfTheDay = ({currentAnectode, currentVote, voteHandler, changeAnectodeHandler}) =>{
  return (
    <div>
      <h1>Anectode of the day</h1>
      {currentAnectode}
      <br/>
      <p>has {currentVote} votes</p>
      <br/>
      <button onClick={changeAnectodeHandler}>
        next anectode
      </button>
      <button onClick={voteHandler}>
        vote
      </button>
    </div>
  );
};

const HighestVoteAnectode = ({highestVotedAnectode, highestVote}) =>{
  return(
    <div>
      <h1>Anectode with most votes</h1>
      <p>{highestVotedAnectode}</p>
      <p>has {highestVote} votes</p>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState({
    index: 0,
    votes: new Uint8Array(props.anecdotes.length) 
  });

  const changeAnictode = () => {
    // randomly selects an anecdote from anecdotes array (puts its index inside selected) 
    let anectodeIndex = Math.floor((Math.random() * props.anecdotes.length));
    const newSelected = {
      index: anectodeIndex,
      votes: [...selected.votes]
    };
    setSelected(newSelected);
  };

  //element in same index in votes as in anecdotes is the vote for the anecdote the index points to
  const vote = () => {
    //updates vote in votes array for current anectode
    let votes = [...selected.votes];
    votes[selected.index]++;
    const newSelected = {
      index: selected.index,
      votes: votes
    };
    setSelected(newSelected);
  };
  

  let currentAnectode = props.anecdotes[selected.index];
  let currentVote = selected.votes[selected.index];
  let indexOfMaxVote = selected.votes.indexOf(Math.max(...selected.votes));
  let maxVote = selected.votes[indexOfMaxVote];
  let maxVoteAnectode = props.anecdotes[indexOfMaxVote];
  return (
    <>
      <AnectodeOfTheDay
        currentAnectode={currentAnectode}
        currentVote={currentVote}
        voteHandler={vote}
        changeAnectodeHandler={changeAnictode}
      />
      <HighestVoteAnectode
        highestVote={maxVote}
        highestVotedAnectode={maxVoteAnectode}
      />
    </>
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)