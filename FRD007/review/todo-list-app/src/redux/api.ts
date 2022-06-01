import { env } from './env'

export async function callAPI<T>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  url: string,
  body?: any,
): Promise<T | { error: string }> {
  try {
    let res = await fetch(env.origin + url, {
      method,
      headers: { 'Content-Type': body ? 'application/json' : 'text/plain' },
      body: body ? JSON.stringify(body) : undefined,
    })
    let json = await res.json()
    return json as T
  } catch (error) {
    console.error('API fail:', { method, url, error })
    return {
      error: String(error),
    }
  }
}
