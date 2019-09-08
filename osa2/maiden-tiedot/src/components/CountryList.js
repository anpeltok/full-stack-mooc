import React from 'react';

const CountryList = ({list, switchCountry}) => {
  return(
    list.map(item => <div key={item.name}>
      {item.name} <button onClick={() => switchCountry(item)}>Show info</button>
      </div>)
  )
};

export default CountryList;
