import React from 'react'
import Entry from './Entry'

const Numbers = ({persons, filter, handleDelete}) => {

  return(
    <div>
      {persons
        .filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
          || person.number.includes(filter))
        .map(person =>
          <Entry key={person.name} person={person} handleDelete={handleDelete} />
          )
        }
    </div>
  )
}

export default Numbers
