import PaypalButton from '../components/PaypalButton'
export const Album = ({weatherRes, cityAlbum, titleValue, artistValue, yearValue} ) => {
  return (
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
        <div className="flex flex-col pb-6 pt-6 m-0">
          <span className="text-pink-400 ">Title: </span> <span className="text-pink-600 font-bold">{titleValue}</span>
          <span className="text-pink-400 mt-3">Artist: </span> <span className="text-pink-600 font-bold">{artistValue}</span>
          <span className="text-pink-400 mt-3">Year: </span> <span className="text-pink-600 font-bold">{yearValue}</span>
        </div>
      <PaypalButton></PaypalButton>
      </div>
    </>
  )
}