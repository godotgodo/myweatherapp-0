import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { animate, motion } from "framer-motion"
import axios from 'axios';
import İmageList from './İmageList';

function App() {
  const [data, setData] = useState({});
  const [searchValue, setSearchValue] = useState('');
  const [animateController, setAnimateContller] = useState(false);
  const divim = useRef(null);

  console.log(data);

  const mounted = useRef();
  useEffect(() => {
    if (!mounted.current) {
      //componentdidmount
      mounted.current = true;
    }
    else {
      //componenddidupdate
    }
  }, [data])

  const searching = async () => {
    if (data.name !== undefined)
      divim.current.classList.remove("bg-" + data.weather[0].main.toLowerCase());
    setAnimateContller(false)
    console.log(searchValue);
    const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
    setData(res.data);
    setAnimateContller(true)
    divim.current.classList.add(`bg-${res.data.weather[0].main.toLowerCase()}`);
  }

  return (
    <>
      <motion.div
        className="w-screen h-screen absolute"
        initial={animateController && { opacity: 0 }}
        animate={animateController ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        ref={divim}
      >
      </motion.div>
      <div className="flex">
        <div className="w-1/4 h-screen min-w-80 z-10 bg-transparent ">
          {data.name !== undefined &&
            <div className="flex flex-col">
              <h1 className="text-8xl text-white ml-8 !mt-12">{data.main.temp}°</h1>
              <h5 className="text-2xl text-gray-400 ml-8 !mt-8">Feels like: {data.main.feels_like}°</h5>
              <h5 className="text-2xl text-gray-400 ml-8 !mt-4">Humidity: {data.main.humidity}</h5>
              <h5 className="text-2xl text-gray-400 ml-8 !mt-4">Min-Max Temp: {data.main.temp_min}-{data.main.temp_max}</h5>
              <h2 className="lg:-rotate-90 text-4xl text-gray-200 lg:ml-56 sm:ml-10 md:rotate-0 md:ml-10">{data.weather[0].main}</h2>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} className="-mt-8" width={200} alt="" />
              <h3 className="text-2xl text-sky-900 ml-8 !mt-4">Wind Deg: {data.wind.deg}</h3>
              <h3 className="text-2xl text-sky-900 ml-8 !mt-4">Wind Speed: {data.wind.speed}</h3>
            </div>
          }
        </div>
        <div className="w-3/4">
          <div className="ui search">
            <div className="ui icon input">
              <input className={`prompt !bg-transparent ${data.name !== undefined && '!text-white'}`} type="text" placeholder="Search city..." onChange={(e) => {
                setSearchValue(e.target.value)
              }} onKeyDown={(e) => { e.key === 'Enter' && searching() }} />
              <button className="absolute right-3 top-2.5">
                <i className="search icon" onClick={searching}>
                </i>
              </button>
            </div>
            {data.name !== undefined && <İmageList search={searchValue} searched={data.name} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
