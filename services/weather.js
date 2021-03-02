import {WEB_CONFIG} from '../config/index'
export const serviceGetWeather = async (body) => {
  console.log('el body', body)
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