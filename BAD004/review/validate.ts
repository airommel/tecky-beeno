import { HttpError } from './http-error'

export function ensureString(row: unknown, field: string): string {
  if (typeof row !== 'object' || !row) {
    throw new HttpError(
      400,
      'invalid input, expect object with field: ' + field,
    )
  }
  let input = row[field]
  if (!input) {
    throw new HttpError(400, 'missing field: ' + field)
  }
  return String(input)
}
