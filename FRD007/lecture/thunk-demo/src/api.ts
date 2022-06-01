export const APIOrigin = process.env.REACT_APP_API_SERVER

async function parseResponse(resP: Promise<Response>) {
  try {
    const res = await resP
    let contentType = res.headers.get('Content-Type') || 'text/plain'
    if (contentType.includes('json')) {
      const json = await res.json()
      return json
    }
    if (contentType.includes('text')) {
      const text = await res.text()
      return text
    }
    throw new Error('unknown response Content-Type: ' + contentType)
  } catch (error) {
    return { error: String(error) }
  }
}

export async function get(
  url: string,
  params?: Record<string, string | number | boolean>,
) {
  let urlSearchParams = new URLSearchParams()
  if (params) {
    for (let key in params) {
      let value = params[key]
      urlSearchParams.set(key, String(value))
    }
  }
  let searchParamsText = urlSearchParams.toString()
  url = APIOrigin + url
  if (searchParamsText) {
    url += '?' + searchParamsText
  }
  const resP = fetch(url, {
    method: 'GET',
    headers: {},
  })
  return parseResponse(resP)
}

export async function post(url: string, body: any) {
  const resP = fetch(`${APIOrigin}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return parseResponse(resP)
}
