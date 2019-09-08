import React from 'react';
import Weather from './Weather'

const CountryInfo = ({country}) => {
  return(
    <div>
      <h1>{country.name}</h1>
      Capital: {country.capital}<br/>
      Population: {country.population}<br/>
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <h3>Flag</h3>
      <img style={{height: '150px'}} src={country.flag} alt={`Flag of ${country.name}`} />
      <Weather name={country.name} capital={country.capital} />
    </div>
  )
};

export default CountryInfo;
