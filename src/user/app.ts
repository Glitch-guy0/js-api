import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { checkRoutes } from './middleware'
import cookieParser from 'cookie-parser'


const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// public routes
app.use(checkRoutes)
// signup => creates user
// login => gets user using email password (getSesssionkey)

// private routes
// logout
// dashboard => gets user using sessionkey(getUser)
// /user/update => => uses session key to get user and operate
// /user/delete => uses session key to get user and operate

app.get("/", (req, res) => {
  res.send("hello world")
})
app.listen(port, ()=> {
  console.log("listenting on port: 3000")
  console.log(`http://localhost:${port}`)
})