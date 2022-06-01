import { env } from './env'
import {APIResponse} from 'shared'
export function toImageUrl(filename: string) {
  return env.imagePrefix + '/' + filename
}

export function get<R extends object>(url: string) {
  return handleResponse<R>(fetch(env.apiOrigin + url))
}

export function upload<R extends object>(url: string, body: FormData) {
  return handleResponse<R>(
    fetch(env.apiOrigin + url, {
      method: 'POST',
      body,
    }),
  )
}

async function handleResponse<R extends object>(resP: Promise<Response>) :Promise<APIResponse<R>>{
  try {
    let res = await resP
    let json = await res.json()
    return json
  } catch (error) {
    return { error: String(error) }
  }
}
