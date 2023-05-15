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
  <table>
  <tbody>
    <tr>
      <td>{props.text}  {props.value}</td>
    </tr>
    </tbody>
  </table>
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
  const [selected, setSelected] = useState(0)
const [anecdotes,setAnecdotes] = useState([
  {text:"'If it hurts, do it more often.",votes:0},
{text:"Adding manpower to a late software project makes it later!",votes:0},
{text:"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",votes:0},
{text:"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",votes:0},
{text:"Premature optimization is the root of all evil.",votes:0},
{text:"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",votes:0},
{text:"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",votes:0},
{text:"The only way to go fast, is to go well.",votes:0}
])

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



  function handleVote(index) {
    const updatedAnecdotes = anecdotes.map((anecdote, i) => {
      if (i === index) {
        return { ...anecdote, votes: anecdote.votes + 1 };
      }
      return anecdote;
    });
    setAnecdotes(updatedAnecdotes);
  }

 const handleAnecdote = () =>{
  setSelected(Math.floor(Math.random()*7))
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
  const randomIndex = Math.floor(Math.random() * anecdotes.length);
  const anecdote = anecdotes[randomIndex];
  let votes = []
  anecdotes.map(elem=>votes.push(elem.votes))
  let higheshtVote = votes.sort((a,b)=>a-b).reverse()[0]
  let mostVotedQuote = anecdotes.filter(elem=>elem.votes === higheshtVote)
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

     <p>{anecdote.text}</p>
      <p>has {anecdote.votes} votes</p>
      <button onClick={() => handleVote(anecdotes.indexOf(anecdote))}>Vote</button>
     <button onClick={handleAnecdote}>Next Anecdote</button>

     <h2>Anecdote with the most votes</h2>
     <p>{mostVotedQuote[0].text}</p>
     <p>has {mostVotedQuote[0].votes} votes</p>
    </div>
  )
}

export default App