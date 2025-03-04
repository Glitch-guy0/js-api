import express from 'express'
import { Request, Response, NextFunction } from 'express';
import { ipLog } from './middleware';

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', async (req: Request, res: Response) => {
  try{
    await ipLog(req)
    res.send("working")
  }catch(err: any){
    res.status(err.status)
    res.json({"message": err.message})
  }
})

app.listen(port, ()=> {
  console.log("listenting on port: 3000")
  console.log(`http://localhost:${port}`)
})
