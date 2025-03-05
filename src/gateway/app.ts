import express from 'express'
import { Request, Response, NextFunction } from 'express';
import { isSessionBlocked, ipLog } from './middleware';
import HttpError from '../common/customErrors/HttpError';

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/gateway", (req, res)=>{
  res.send("working")
})

app.use(async (req: Request, res: Response, next: NextFunction) => {
  try{
    await ipLog(req)
    if(req.cookies.sessionkey){
      if(await isSessionBlocked(req.cookies.sessionkey)){
        throw new HttpError(403, "Session blocked")
      }
    }
    next() // there is not next have to send a response,
    // here make axios ???? what??
  }catch(err: any){
    res.status(err.status)
    res.json({"message": err.message})
  }
})

app.listen(port, ()=> {
  console.log("listenting on port: 3000")
  console.log(`http://localhost:${port}`)
})
