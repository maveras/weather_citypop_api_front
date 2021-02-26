import {useState} from 'react'
import {serviceGetWeather} from '../services/weather'
export const AppCard = () => {

  const [loadedImage, setLoadedImage] = useState("https://img.discogs.com/l3fkUAJb_4UqY0kYQrPr077QyEA=/fit-in/600x554/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-16659231-1609105178-7556.png.jpg")
  const containerStyle = {
    height: '100vh',
    backgroundImage: `url("${loadedImage}")`,
  }

  const bluredBack = {
    height: '100vh',
    backdropFilter: 'blur(20px)'
  }
  const onRequestWeather = async () => {
    try {
      const res = await serviceGetWeather({city: 'santiago'})
      console.log('uyu', res)
    } catch (error) {
      console.log('error', error)
    }
  }
  return (
    <>
      <div id="app-container" style={containerStyle} className="bg-no-repeat bg-cover">
        <div style={bluredBack}>
          <div className="z-index: 0 -inset-x-0 fixed p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex justify-start flex-col space-x-4" >
            <div className="">
              <div class="mb-4">
                <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                  City {process.env.NEXT_PUBLIC_DEPLOY_ENVIRONMENT}
                </label>
                <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="city" type="text" placeholder="City" />
                <div className="flex justify-center	m-5">
                  <button class="bg-pink-300 p-3 rounded text-gray-50" onClick={onRequestWeather}>Dame el tiempo y City Pop</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}