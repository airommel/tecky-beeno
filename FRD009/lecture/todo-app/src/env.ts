if (!process.env.REACT_APP_API_ORIGIN) {
  throw new Error('missing REACT_APP_API_ORIGIN in environment variable')
}

if (!process.env.REACT_APP_FACEBOOK_APP_ID) {
  throw new Error('missing REACT_APP_FACEBOOK_APP_ID in environment variable')
}

export let env = {
  API_ORIGIN: process.env.REACT_APP_API_ORIGIN,
  FACEBOOK_APP_ID: process.env.REACT_APP_FACEBOOK_APP_ID,
}
