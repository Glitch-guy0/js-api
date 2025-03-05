import { User as UserModel } from "../common/interface/user"
import User from "../common/models/user"
import HttpError from "../common/customErrors/HttpError"
import { generateSession } from "./session"
import bcrypt from "bcrypt"





export async function createUser(userData: UserModel){
  try{
    const password = userData.password as string
    userData.password = await bcrypt.hash(password, 10)
    const user = await User.create(userData)
    const sessionkey = generateSession(user)
    return sessionkey
  }catch(err:any){
    throw new HttpError(409, "User already Exists")
  }
}


export async function getUser(userid: string){
  try{
    const user = await User.findById(userid)
    return user
  }catch(err){
    throw new HttpError(404, "user not found")
  }
}

export async function loginUser(email:string , password: string){
  // email, passwd
  try{
    const user = await User.findOne({email: email})
    await bcrypt.compare(password, user?.password as string)
    return user
  }catch(err){
    throw new HttpError(404, "user not found")
  }
}

export async function deleteUser(user: UserModel & {_id: string}){
  try{
    await User.findByIdAndDelete(user._id)
  }catch(err){
    throw new HttpError(404, "user not found")
  }
}