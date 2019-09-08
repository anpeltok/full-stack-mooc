import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Weather = ({name, capital}) => {

  const [weather, setWeather] = useState({})
  const city = capital.replace(/[.',]/g, '')
  const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=f2060889e56a440cae54c78f2f778aee`

  console.log(url);
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        const item = response.data.data[0]
        setWeather({
          temp: item.temp,
          icon: `https://www.weatherbit.io/static/img/icons/${item.weather.icon}.png`,
          iconDesc: item.weather.description,
          windSpeed: item.wind_spd * 3.6,
          windDir: item.wind_cdir
        })
      })
    .catch(error => {
      console.log(error);
    })
  }, [url])

  if(weather.temp === undefined){
    return(
      <div>
      <h3>Weather not found</h3>
      </div>
    )
  }
  else{
    return(
      <div>
        <h3>Weather in {capital}</h3>
        <p>Temperature: {`${weather.temp} Celsius`}</p>
        <img src={weather.icon} alt={weather.iconDesc} />
        <p>Wind speed: {`${Math.round(weather.windSpeed * 10) / 10} km/h, direction of ${weather.windDir}`}</p>
      </div>
    )
  }
};

export default Weather;
