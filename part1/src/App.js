import { useState } from "react"

const Header = (props) => (
     <>
        <h1>{props.course}</h1>
     </>
)

const Part = (props) => {
  return (
    <>
      <p>
        {props.part1} {props.exercises1}
      </p>
      <p>
        {props.part2} {props.exercises2}
      </p>
      <p>
        {props.part3} {props.exercises3}
      </p>
    </>
  )
}

const Content = (props) => (
  <>
    <Part  
    part1 ={props.parts[0].name}  
    exercises1={props.parts[0].exercises}

    />
    <Part  
    part2={props.parts[1].name}  
    exercises2= {props.parts[1].exercises}

    />
    <Part 
    part3={props.parts[2].name}
    exercises3={props.parts[2].exercises}
    />
  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  </>
)



const Statistics = (props) => {
let total = props.good+props.bad+props.neutral
let average = total / 3
let positive = props.good/total*100
 return   (
       <>
           <h2>Statistics</h2>
            <StatisticLine text="good" value ={props.good} />
            <StatisticLine text="neutral" value ={props.neutral} />
            <StatisticLine text="bad" value ={props.bad} />
            <StatisticLine text="all" value ={total} />
            <StatisticLine text="average" value ={average} />
            <StatisticLine text="positive" value ={positive} />
      </>
     )
}

const StatisticLine = (props) => (
  <>
    <p>{props.text}  {props.value}</p>
  </>
)

const Button = (props) => (
  <div style={{display:"flex"}}>
   <button onClick={props.handleGood} style={{margin:"8px"}}>Good</button>
    <button onClick={props.handleNuetral} style={{margin:"8px"}}>Neutral</button>
    <button onClick={props.handleBad} style={{margin:"8px"}}>Bad</button>
  </div>
  
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
  }

  const handleGood = () => {
    setGood(good+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }

  const handleNuetral = () => {
    setNeutral(neutral+1)
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    <h2>Give feedback</h2>
    <Button handleBad={handleBad} handleNuetral={handleNuetral} handleGood={handleGood}/>
     {
       (good>=1 &&  <Statistics good={good} bad={bad} neutral={neutral}/>) 
     || (bad>=1 &&  <Statistics good={good} bad={bad} neutral={neutral}/>)
     || (neutral>=1 &&  <Statistics good={good} bad={bad} neutral={neutral}/>)
     } 
    </div>
  )
}

export default App