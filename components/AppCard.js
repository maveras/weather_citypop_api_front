import {useState} from 'react'
import {serviceGetWeather} from '../services/weather'
export const AppCard = () => {

  const [loadedImage, setLoadedImage] = useState("https://i.redd.it/avo9vpidmzg41.jpg")
  const [city, setCity] = useState('')
  const [weatherRes, setWeatherRes] = useState({})
  const [cityAlbum, setCityAlbum] = useState({})
  const [loading, setLoading] = useState(false)
  const [titleValue, setTitleValue] = useState('')
  const [artistValue, setArtistValue] = useState('')
  const [yearValue, setYearValue] = useState('')
  const [error, setError] = useState(false)
  const containerStyle = {
    height: '100vh',
    backgroundImage: `url("${loadedImage}")`,
  }

  const bluredBack = {
    height: '100vh',
    backdropFilter: 'blur(20px)'
  }
  const splitValues = (cityAlbum) => {
    setTitleValue(cityAlbum.title.split('-')[1])
    setArtistValue(cityAlbum.title.split('-')[0])
    setYearValue(cityAlbum.year)
  }
  const onRequestWeather = async () => {
    try {
      setLoading(true)
      setError(false)
      const res = await serviceGetWeather({city: `${city}`})
      const {cityALbum, createdWeather} = res.data
      setWeatherRes(createdWeather.resWeather)
      setCityAlbum(cityALbum)
      setLoadedImage(cityALbum.cover_image)
      setLoading(false)
      splitValues(cityALbum)
    } catch (error) {
      setLoading(false)
      setCityAlbum({})
      setWeatherRes({})
      setError(true)
      console.log('error', error)
    }
  }
  return (
    <>
      <head>
        <meta property="og:type" content="body"/>
        <meta property="og:url" content="http://newsblog.org/news/136756249803614"/>
        <meta property="og:title" content="City weather and City Pop"/>
        <meta property="og:image" content="https://i.redd.it/avo9vpidmzg41.jpg"/>
        <meta property="og:description" content="Simple weather and city pop recommendation"/>
      </head>
      <body>
        <div id="app-container" style={containerStyle} className="bg-no-repeat bg-cover">
          <div style={bluredBack}>
            <div className="font-sans flex flex-col">
              <div className="z-index: 0 mt-6 -inset-x-0 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex justify-start flex-col space-x-4">
                <div class="mb-4">
                  <label class="block text-grey-darker text-sm font-bold mb-2 text-pink-500 ">
                    City
                  </label>
                  <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-5" onChange={(e) => setCity(e.target.value)} id="city" type="text" placeholder="City" />
                  <div className="flex justify-center	m-5">
                    <button class="bg-pink-300 p-3 rounded text-gray-50 disabled:bg-pink-100 hover:bg-pink-400" disabled={city.length < 3} onClick={onRequestWeather} >Gimme City weather and City Pop</button>
                  </div>
                </div>
              </div>
              {
              loading &&
                <div className="bg-white mt-10 p-6 mx-auto max-w-sm rounded shadow-md flex flex-row rounded-xl space-x-4">
                  <svg className="bg-pink-100 animate-pulse h-5 w-5 mr-3" viewBox="0 0 24 24">
                  </svg>
                  <span className="text-pink-600">
                  Cargando...
                  </span>
                </div>
              }
              {
                error && !loading && 
                <>
                  <div className=" bg-white mt-10 p-6 mx-auto max-w-sm rounded shadow-md flex flex-row rounded-xl space-x-4">
                    <h3 className="text-pink-400 mt-3">A error has occured, please verify city</h3>
                  </div>
                </>
              }
              { weatherRes && weatherRes.name && !loading &&
                <>
                  <div className=" bg-white mt-10 p-6 mx-auto max-w-sm rounded shadow-md flex flex-row rounded-xl space-x-4">
                    <div className="flex flex-col	justify-center text-pink-500">
                      <h2 className="text-xl">{weatherRes.name}</h2>
                      <span className="text-4xl">{Math.trunc(weatherRes.main.temp - 273.15) }ºC</span>
                    </div>
                    <div className="pl-5">
                      <img className="border-pink-300 border-4 rounded-full h-24 w-24 flex items-center justify-center" src={`http://openweathermap.org/img/wn/${weatherRes.weather[0].icon}@2x.png`} alt=""/>
                    </div>
                  </div>
                  <div className=" bg-white mt-10 mx-auto max-w-sm rounded shadow-md flex flex-col rounded-xl space-x-4">
                    <div>
                      <img src={`${cityAlbum.cover_image}`.includes('spacer.gif') ? 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' : cityAlbum.cover_image } alt=""/>
                    </div>
                    <div className="flex flex-col pb-6 pt-6">
                      <span className="text-pink-400 ">Title: </span> <span className="text-pink-600 font-bold">{titleValue}</span>
                      <span className="text-pink-400 mt-3">Artist: </span> <span className="text-pink-600 font-bold">{artistValue}</span>
                      <span className="text-pink-400 mt-3">Year: </span> <span className="text-pink-600 font-bold">{yearValue}</span>

                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </body>
    </>
  )
}