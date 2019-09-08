import React from 'react';

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({name}) => {
  return(
    <h2>{name}</h2>
  )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map(item => <Part key={item.id} name={item.name} exercises={item.exercises} />)}
    </div>
  )
}

const Part = ({name, exercises}) => {
  return(
    <p>
      {name} {exercises}
    </p>
  )
}

const Total = ({parts}) => {

  const count = parts.reduce((sum, part) => sum + part.exercises, 0)

  return(
    <b><p>Number of exercises {count}</p></b>
  )
}

export default Course
