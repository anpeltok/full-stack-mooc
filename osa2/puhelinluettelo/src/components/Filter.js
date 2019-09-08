import React from 'react'

const Filter = ({filter, handleFilter, setFilter}) => {
  return(
    <div>
      filter results: <input value={filter} onChange={handleFilter} />
      <button onClick={() => setFilter('')}>Reset filter</button>
    </div>
  )
}

export default Filter
