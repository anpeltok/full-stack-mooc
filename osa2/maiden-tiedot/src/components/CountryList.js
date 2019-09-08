import React from 'react';

const CountryList = ({list, setFilter}) => {
  return(
    list.map(item => <div key={item.name}>
      {item.name} <button onClick={() => setFilter(item.name)}>Show info</button>
      </div>)
  )
};

export default CountryList;
