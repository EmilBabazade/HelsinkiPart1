import React from 'react'
import ReactDOM from 'react-dom'

const Part = (props) => {
  return(
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  )
};

const Content = (props) => {
  return (
    <>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises} /> 
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises} /> 
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises} /> 
    </>
  )
};

const Header = (props) => {
  return(
    <>
      <h1>{props.name}</h1>
    </>
  )
};


const Total = (props) => {
  return(
    <> 
      <p>Number of exercises {props.total_exercises}</p>
    </>
  )
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  };
  var totalExerciseCount = 0;
  for(let part of course.parts){
    totalExerciseCount += part.exercises;
  }
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total_exercises={totalExerciseCount} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))