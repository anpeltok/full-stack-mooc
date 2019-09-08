import React from 'react';

const Entry = ({person, handleDelete}) => {

  return(
    <div>
      {person.name} {person.number} <button onClick={() => handleDelete(person.id)}>delete</button>
    </div>
  )
};

export default Entry;
