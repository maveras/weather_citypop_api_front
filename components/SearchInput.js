import { useState } from "react"
import {serviceGetCities} from '../services/weather'

export const SearchInput = ({getInputValue}) => {
  const [cities, setCities] = useState([])
  const [showSuggest, setShowSuggest] = useState(true)
  const [city, setCity] = useState({})
  const [inputValue, setInputValue] = useState('')

  const handleChangeCity = async (e) => {
    setInputValue(e.target.value)
    if (e.target.value !== '') {
      const cities = await serviceGetCities(e.target.value)
      setCities(cities)
      setShowSuggest(true)
    } else {
      setShowSuggest(false)
      setCity({})
      getInputValue({})
    }
  }
  const handleSelectCity = (city) => {
    setCity(city)
    setShowSuggest(false)
    setInputValue(city.city)
    getInputValue(city)

  }
  const style = () => {
    const height = cities.length > 0 ? 'h-36' : 'hidden'
    return `results overflow-y-auto ${height}`
  }
  return (
    <div>
      {showSuggest &&
        <div className={style()}>
          {
            cities.map( (city, i) => {
              return (
                <div key={i} className="city border rounded text-grey-darker bg-pink-300 p-2 fc-white-100 text-pink-100 hover:bg-pink-500" onClick={ () => handleSelectCity(city) }> <span>{city.city}</span></div>
              )
            })
          }
        </div>
      }
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-5" id="city" type="text" value={inputValue} placeholder="Cityaa" onChange={(e)=>handleChangeCity(e)}/>
    </div>
  )
}