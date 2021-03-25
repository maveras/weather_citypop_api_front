import {WEB_CONFIG} from '../config/index'
export const serviceGetWeather = async (body) => {
  const res = await fetch(`${WEB_CONFIG.BASE_URL}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    }
  )
  const json = await res.json()
  return json
}

export const serviceGetCities = async (city) => {
  const res = await fetch(`${WEB_CONFIG.BASE_URL}/getCities?name=${city}`)
  const json = await res.json()
  return json
}