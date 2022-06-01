import express from "express"

export let appleRoutes = express.Router()

appleRoutes.use((req, res, next) => {
  console.log('appleRoutes spy:', {
    method: req.method,
    url: req.url,
    originalUrl: req.originalUrl,
  })
  next()
})

appleRoutes.get('/', (req, res) => {
  res.json({ appleList: [] })
})

appleRoutes.get('/:id', (req, res) => {
  res.json({
    apple: {
      id: req.params.id,
      price: Math.random(),
    },
  })
})

export let isAppleStaff = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  next()
  // res.status(403).json({ message: "You shouldn't know the secret" })
}