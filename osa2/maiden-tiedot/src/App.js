import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import CountryInfo from './components/CountryInfo'
import CountryList from './components/CountryList'

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState({})
  const [filter, setFilter] = useState('')


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(
          response
            .data
            .map(item => {return {
              name: item.name,
              capital: item.capital ? item.capital : 'No capital',
              population: item.population,
              languages: item.languages.map(language => language.name),
              flag: item.flag,
          }})
        )
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
    setCountry(Object.assign({},{}))
  }

  const filterCountries = () => {
    return countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const switchCountry = (newCountry) => {
    if(JSON.stringify(country) !== JSON.stringify(newCountry)){
      setCountry(Object.assign({}, newCountry))
      //setFilter('')
    }
  }

  const chooseRender = () => {
    const list = filterCountries()

    if(country.hasOwnProperty('name')){
      return <CountryInfo country={country} />
    }

    else if(filter === ''){
      return null
    }
    else if(list.length > 10){
      return 'Too many matches, specify another filter'
    }
    else if(list.length > 1){
      return (
        <CountryList list={list} switchCountry={switchCountry} />
      )
    }
    else if(list.length === 1){
      switchCountry(list[0])
    }
    if(list.length === 0){
      return 'No matches'
    }
  }

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} handleFilter={handleFilter} setCountry={setCountry} />
      {chooseRender()}
    </div>
  )
}

export default App
