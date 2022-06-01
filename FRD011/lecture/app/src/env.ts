if (!process.env.REACT_APP_IMAGE_PREFIX) {
  console.error('missing REACT_APP_IMAGE_PREFIX environment variable')
}

export let env = {
  imagePrefix: process.env.REACT_APP_IMAGE_PREFIX || '?',
  apiOrigin:
    (window.location.origin === 'http://localhost:3000'
      ? process.env.REACT_APP_LOCAL_API_ORIGIN
      : process.env.REACT_APP_PROD_API_ORIGIN) || '?',
}

if (env.apiOrigin === '?') {
  console.error('missing API_ORIGIN in environment variable')
}
