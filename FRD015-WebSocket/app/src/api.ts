import { env } from './env'

export async function handleResponse(resP: Promise<Response>) {
  try {
    let res = await resP
    let json = await res.json()
    return json
  } catch (error) {
    return { error: String(error) }
  }
}

export async function post(url: string, body: object, token?: string) {
  return await handleResponse(
    fetch(env.API_ORIGIN + url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(body),
    }),
  )
}

export async function get(url: string, token?: string) {
  return await handleResponse(
    fetch(env.API_ORIGIN + url, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }),
  )
}
