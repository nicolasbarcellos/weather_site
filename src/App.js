import axios from 'axios';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';

import './App.css'


function App() {
  const [value, setValue] = useState()
  const [temperature, setTemperature] = useState()
  const [imgSource, setImgSource] = useState()

  async function fetchTemperature() {
    const {data} = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=ee5c7911c1e7469b985133338222701&q=-22.12,%20-45.05&days=1`)
    
    const {current} = data
    
    setTemperature(Math.round(current.temp_c).toFixed(0) + 'º')
    setImgSource(current.condition.icon)

  }

  useEffect(() => {
  async function fetchData() {
     await fetchTemperature()
    }

    fetchData()

  }, [temperature, imgSource])


  useEffect(() => {
    const interval = setInterval(() => setValue( format(new Date(), 'pp', {locale: ptBR})), 1000)

    return () => {
      clearInterval(interval)
    }

  }, [value])

  return (
    <div className='wrapper'>

     
   
     <h1 className='title'>Tempo São Lourenço</h1>

     <div className='temperatureWrapper'>

    <p className='temperature'>{temperature}</p>
    <img src={imgSource} alt="imagem da temperatura" />

     </div>
    
    <p className='timer'>{value}</p>
    </div>
  );
}



export default App;
