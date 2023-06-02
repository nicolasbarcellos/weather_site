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
    const {data} = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=-22.11&lon=-45.05&appid=f5074c7a55386895a37bbedfbb872512&units=metric`)
    // const {current} = 
    const icon = data.weather[0].icon

    console.log('first')

    setTemperature(Math.round(data.main.temp).toFixed(0) + 'º')
    setImgSource(`http://openweathermap.org/img/w/${icon}.png`)

  }

  useEffect(() => {
  async function fetchData() {
     await fetchTemperature()
    }

    fetchData()

    const interval = setInterval(() => fetchData(), 600000); // 10 minutos

    return () => {
      clearInterval(interval)
    }


  }, [temperature, imgSource])


  useEffect(() => {
    const interval = setInterval(() => setValue( format(new Date(), 'pp', {locale: ptBR})), 1000)

    return () => {
      clearInterval(interval)
    }

  }, [value])

  return (
    <div className='wrapper'>

     
   
     <h1 className='title'>São Lourenço</h1>

     <div className='temperatureWrapper'>

    <p className='temperature'>{temperature}</p>
    <img src={imgSource} alt="imagem da temperatura" />

     </div>
    
    <p className='timer'>{value}</p>
    </div>
  );
}



export default App;
