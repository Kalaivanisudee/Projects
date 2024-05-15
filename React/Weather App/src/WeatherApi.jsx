import React, { useEffect, useState } from 'react'

import clearIcon from "./assets/clear.jpg"
import cloudIcon from "./assets/cloud.jpg"
import drizzleIcon from "./assets/drizzle.jpg"
import humidityIcon from "./assets/humidity.jpg"
import rainIcon from "./assets/rain.jpg"
import searchIcon from "./assets/search.jpg"
import snowIcon from "./assets/snow.jpg"
import windIcon from "./assets/wind.jpg"


let WeatherDetails = ({ icon, temp, city, country, lat, log, humidity, wind }) => {
    return (
        <>
            <div className="imge">
                <img src={icon} alt="clearIcon" />
            </div>
            <div className="temp">{temp}°C </div>
            <div className="location">{city}</div>
            <div className="country">{country}</div>
            <div className="cord">
                <div>
                    <span className="lat">latitude</span>
                    <span>{lat}</span>
                </div>
                <div>
                    <span className="log">longitude</span>
                    <span>{log}</span>
                </div>
            </div>
            <div className="data-container">
                <div className="element">
                    <img src={humidityIcon} className="icon" alt="humidityIcon" />
                    <div className="data">
                        <div className="humiditypercentage">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={windIcon} className="icon" alt="windIcon" />
                    <div className="data">
                        <div className="windpercentage">{wind}km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>

            </div>

        </>
    )
}



export const WeatherApi = () => {
    let [text, setText] = useState("chennai")
    let [icon, setIcon] = useState(windIcon)
    let [temp, setTemp] = useState(0)
    let [city, setCity] = useState(" ")
    let [country, setCountry] = useState("India")
    let [lat, setLat] = useState(0)
    let [log, setLog] = useState(0)
    let [humidity, setHumidity] = useState(0)
    let [wind, setWind] = useState(0)
    let [cityNotFound, setCityNotFound] = useState(false)
    let [loading, setLoading] = useState(false)
    let [error,setError] =useState(null)

    let weatherIconMap = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": drizzleIcon,
        "03n": drizzleIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "13d": snowIcon,
        "13n": snowIcon,

    }


    let search = async () => {
        setLoading(true)
        let apiKey = `8832a43caf0dd3604eb2fc018ef61d9b`
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`

        try {
            let res = await fetch(url);
            let data = await res.json();
            // console.log(data)
            if (data.cod == "404") {
                console.error("City Not Found")
                setCityNotFound(true)
                setLoading(false)
                return;
            }


            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(Math.floor(data.main.temp));
            setCity(data.name)
            setCountry(data.sys.country);
            setLat(data.coord.lat)
            setLog(data.coord.lon)
            let weatherIconCode = data.weather[0].icon;
            setIcon(weatherIconMap[weatherIconCode] || clearIcon)
            setCityNotFound(false)



        } catch (error) {
            console.error("An error occured:", error.message)
            setError("An error occured ")
        } finally {
            setLoading(false)
        }



    }
    let handleCity = (e) => {
        setText(e.target.value)

    }
    let handleKeyDown = (e) => {
        if (e.key == "Enter") {
            search();
        }
    }


    useEffect(() => {
        search();
    }, [])
    return (
        <>
            <div className="container">
                <div className="input-container">
                    <input type="text" className='cityinput' onChange={handleCity} value={text} onKeyDown={handleKeyDown} placeholder='search city' />

                    <div className="searchicon">
                        <img src={searchIcon} alt="searchIcon" onClick={() => search()} />
                    </div>
                </div>
        
               {loading &&  <div className="loading-message">Loading...</div>}
                {error && <div className="error-message">{error}</div>}
               { cityNotFound && <div className="cityNotFound">cityNotFound</div>}

               {!loading && !cityNotFound && <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humidity={humidity} wind={wind} />}

                <p className='copyright'><i>Designed by <span>kalai</span></i></p>
            </div>

        </>
    )
}
