import { env } from './env'

export let jwtConfig = {
  jwtSecret: env.JWT_SECRET,
  jwtSession: {
    session: false,
  },
}
