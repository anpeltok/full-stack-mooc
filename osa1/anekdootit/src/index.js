import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  // Gets random number for quote index
  const getRand = () => Math.floor(Math.random() * anecdotes.length)
  let index = anecdotes.indexOf(selected)

  // Function for pulling random quote from props
  const setRandQuote = () => {
    getRand()
    let result = anecdotes[getRand()]

    // Eliminating repeat quotes
    while(result === selected){
      getRand()
      result = anecdotes[getRand()]
    }
    setSelected(result)
  }

  // Sets the quote's votes into an array on the same index as the chosen quote
  const giveVotes = () => {
    const copy = [...votes]
    copy[index]++
    setVotes(copy)
  }

  // Finds index of anecdote with most votes
  const indexOfMax = () => votes.indexOf(Math.max(...votes))

  // Setting initial quote before render
  if(selected === 0){
    setSelected(anecdotes[getRand()])
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{selected}</p>
      <h4>{votes[index]} votes</h4>
      <Button text="vote" handleClick={giveVotes} />
      <Button text="next anecdote" handleClick={setRandQuote} />
      <MostVotes
        quote={anecdotes[indexOfMax()]}
        votes={votes[indexOfMax()]} />
    </div>
  )
}

const Button = ({text, handleClick}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const MostVotes = ({quote, votes}) => {
  if(votes > 0){
    return(
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{quote}</p>
        <h4>{votes} votes</h4>
      </div>
    )
  }
  return(
    <div></div>
  )
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
