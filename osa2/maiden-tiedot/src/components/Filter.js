import React from 'react'

const Filter = ({filter, setFilter, handleFilter, setCountry}) => {
  return(
    <div>
      <p>Search countries by name:</p>
      <input value={filter} onChange={handleFilter} />
      <button onClick={() => setFilter('')}>Reset search</button>
    </div>
  )
}

export default Filter
