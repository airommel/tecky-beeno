import { env } from './env'

export function toImageUrl(filename: string) {
  return env.imagePrefix + '/' + filename
}

export function get(url: string) {
  return handleResponse(fetch(env.apiOrigin + url))
}

export function upload(url: string, body: FormData) {
  return handleResponse(
    fetch(env.apiOrigin + url, {
      method: 'POST',
      body,
    }),
  )
}

async function handleResponse(resP: Promise<Response>) {
  try {
    let res = await resP
    let json = await res.json()
    return json
  } catch (error) {
    return { error: String(error) }
  }
}
