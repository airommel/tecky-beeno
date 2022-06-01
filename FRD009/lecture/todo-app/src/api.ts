import { env } from './env'
import { useGetWithToken } from './hooks/useGet'

async function handleResponse(resP: Promise<Response>) {
  try {
    let res = await resP
    let json = await res.json()
    return json
  } catch (error) {
    return { error: String(error) }
  }
}

export function post(url: string, body?: any) {
  let resP = fetch(env.API_ORIGIN + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return handleResponse(resP)
}

export async function postWithToken(
  token: string | null | undefined,
  url: string,
  body?: any,
) {
  if (!token) {
    return { error: 'This API is not available to guest' }
  }
  let resP = fetch(env.API_ORIGIN + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify(body),
  })
  return handleResponse(resP)
}

export async function get(url: string) {
  let resP = fetch(env.API_ORIGIN + url, {
    method: 'GET',
  })
  return handleResponse(resP)
}

export async function getWithToken(
  token: string | null | undefined,
  url: string,
) {
  if (!token) {
    return { error: 'This API is not available to guest' }
  }
  let resP = fetch(env.API_ORIGIN + url, {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })
  return handleResponse(resP)
}

export type NewTodoItemDTO = {
  title: string
  desc: string
}

export type TodoItem = {
  id: number
  is_done: 1 | 0
  count: number
} & NewTodoItemDTO

export function useTodoItems() {
  return useGetWithToken<{ items: TodoItem[] }>('/todo')
}

export function addNewItem(
  token: string | undefined | null,
  item: NewTodoItemDTO,
) {
  return postWithToken(token, '/todo/', item)
}
