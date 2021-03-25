import {useState} from 'react'
import {serviceGetWeather} from '../services/weather'
import Head from 'next/head'
import {Album} from '../components/Album'
import {Error} from '../components/Error'
import {Loading} from '../components/Loading'
import { SearchInput } from './SearchInput'

export const AppCard = () => {

  const [loadedImage, setLoadedImage] = useState("https://i.redd.it/avo9vpidmzg41.jpg")
  const [cityParent, setCityParent] = useState('')
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
      const res = await serviceGetWeather({city: cityParent})
      const {cityAlbum, createdWeather} = res.data
      setWeatherRes(createdWeather.resWeather)
      setCityAlbum(cityAlbum)
      setLoadedImage(cityAlbum.cover_image)
      setLoading(false)
      splitValues(cityAlbum)
    } catch (error) {
      setLoading(false)
      setCityAlbum({})
      setWeatherRes({})
      setError(true)
      console.log('error', error)
    }
  }

  const getInputValue = (value) => {
    setCityParent(value)
  }
  return (
    <>
      <Head>
        <meta property="og:type" content="body"/>
        <meta property="og:url" content="http://newsblog.org/news/136756249803614"/>
        <meta property="og:title" content="City weather and City Pop"/>
        <meta property="og:image" content="https://i.redd.it/avo9vpidmzg41.jpg"/>
        <meta property="og:description" content="Simple weather and city pop recommendation"/>
      </Head>
      <div id="app-container" style={containerStyle} className="bg-no-repeat bg-cover">
        <div style={bluredBack}>
          <div className="font-sans flex flex-col">
            <div className="z-index: 0 mt-6 -inset-x-0 p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex justify-start flex-col space-x-4">
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2 text-pink-500 ">
                  City
                </label>
                <SearchInput getInputValue={getInputValue}></SearchInput>
                <div className="flex justify-center	m-5">
                  <button className="bg-pink-300 p-3 rounded text-gray-50 disabled:bg-pink-100 hover:bg-pink-400" disabled={cityParent.length < 3} onClick={onRequestWeather} >Gimme City weather and City Pop</button>
                </div>
              </div>
            </div>
            {
              loading && <Loading></Loading>
            }
            {
              error && !loading && <Error></Error>
            }
            {
              weatherRes && weatherRes.name && !loading && <Album weatherRes={weatherRes} cityAlbum={cityAlbum} titleValue={titleValue} artistValue={artistValue} yearValue={yearValue}></Album>
            }
          </div>
        </div>
      </div>
    </>
  )
}