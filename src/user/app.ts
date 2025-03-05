import express from 'express'
import cookieParser from 'cookie-parser'
import { User } from '../common/interface/user'
import HttpError from '../common/customErrors/HttpError'
import { createUser, deleteUser, getUser, loginUser } from './user'
import  dbConnect  from '../common/db'
import { decodeSession, generateSession } from './session'
import sessionBlocklist from '../common/models/sessionBlocklist'


dbConnect()

const app = express()
const port = 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.post("/user", async (req, res) => {
  try{
    const userData = await req.body
    if(!userData?.email){
      throw new HttpError(400, "Invalid user data")
    }
    Validate.createUserData(userData)
    const sessionkey = await createUser(req.body)
    res.cookie("sessionkey", sessionkey, { maxAge: 86400, httpOnly: true })
    res.json({"message": "User created"})
  }catch(err: any){
    res.status(err.status).json({"message": err.message})
  }
})

app.get("/user",async (req, res)=>{
  try{
    const cookie = req.cookies
    if(cookie.sessionkey){
      const userid = decodeSession(cookie.sessionkey)
      await getUser(userid)
      res.send()
    }else{
      const data = req.body
      Validate.loginData(data)
      const user = await loginUser(data.email, data.password)
      const sessionkey = generateSession(user)
      res.cookie("sessionkey", sessionkey, { maxAge: 86400, httpOnly: true })
      res.send()
    }
  }catch(err:any){
    res.status(err.status).json({"message": err.message})
  }
})


// logout

// private routes



// /user/update => => uses session key to get user and operate


app.get("/", (req, res) => {
  res.send("hello world")
})
app.listen(port, ()=> {
  console.log("listenting on port: 3000")
  console.log(`http://localhost:${port}`)
})





class Validate{
  static email(email: String){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.toString())) {
      throw new HttpError(400, "Invalid email format");
    }
  }
  static password(password: String){
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$#!%*?&]{8,20}$/
    if (!passwordRegex.test(password.toString())) {
      throw new HttpError(400,"Invalid password format. Password must be between 8 and 20 characters and contain at least one letter and one number.");
    }
  }

  static createUserData(user: User){
    if(user.name.length<3){
      throw new HttpError(400, "Name Required and must be at least 3 characters")
    }
    if(!user.password){
      throw new HttpError(400, "Password Required")
    }
    Validate.email(user.email)
    Validate.password(user.password)
  }

  static loginData(data: {email:string, password:string}){
    if(!data.email){
      throw new HttpError(400, "Email Required")
    }
    if(!data.password){
      throw new HttpError(400, "Password Required")
    }
    Validate.email(data.email)
    Validate.password(data.password)
  }
}
