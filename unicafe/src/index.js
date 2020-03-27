import React, { useState } from 'react'
import ReactDOM from 'react-dom'

//button
const Button = ({text, clickHandler}) => {
  return(
    <button onClick={clickHandler}>
      {text}
    </button>
  );
}

//feedback
const Feedback = ({good, neutral, bad}) => {
  return(
    <div>
      <Button text='good' clickHandler={good}/>
      <Button text='neutral' clickHandler={neutral}/>
      <Button text='bad' clickHandler={bad}/>
    </div>
  );
}

//stats
const Stats = ({good, neutral, bad}) => {
  if(good || neutral || bad ) {
    return(
      <div>
        <table>
          <tbody>
            <Stat text='good' stat={good}/>
            <Stat text='neutral' stat={neutral}/>
            <Stat text='bad' stat={bad}/>
            <Total totalReviewCount={good + neutral + bad} />
            <AvgScore 
            good={good}
            neutral={neutral}
            bad={bad}
            />
            <PosPercentage
            good={good}
            neutral={neutral}
            bad={bad}
            />
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
}

//total reviews
const Total = ({totalReviewCount}) => {
  return(
    <tr>
      <td>all</td>
      <td>{totalReviewCount}</td>
    </tr>
  );
};

//average score
const AvgScore = ({good, neutral, bad}) => {
  const goodCoeff = 1;
  const neutralCoeff = 0;
  const badCoeff = -1;

  if(good && neutral && bad) {
    var avgScore = (good * goodCoeff + neutral * neutralCoeff + bad * badCoeff ) /
    (good + bad + neutral);    
  } else {
    var avgScore = 0;
  }

  return(
    <tr>
      <td>average</td>
      <td>{avgScore}</td>
    </tr>
  );
};

//percentage of positive feedback
const PosPercentage = ({good, neutral, bad}) => {
  if(good && neutral && bad){
    var positivePercentage = good / (good + neutral + bad);
  } else {
    var positivePercentage = 0;
  }
  return(
    <tr>
      <td>positive</td>
      <td>{positivePercentage}</td>
    </tr>
  );
};

//display a stat
const Stat = ({text, stat}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{stat}</td>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Feedback 
        good={increaseGood}
        neutral={increaseNeutral}
        bad={increaseBad}
      />
      <h1>statistics</h1>
      <Stats 
        good={good} neutral={neutral} bad={bad}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)