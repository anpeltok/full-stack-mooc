import React from 'react';

const AddNewEntry = (props) => {
  return(
    <form>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button onClick={props.handleNewData} type="submit">add</button>
      </div>
    </form>
  )
}

export default AddNewEntry
