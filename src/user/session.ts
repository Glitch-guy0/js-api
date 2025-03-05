import HttpError from "../common/customErrors/HttpError";
import { User } from "../common/interface/user";
import jwt from "jsonwebtoken";


const JWT_TOKEN = "secret"

export function generateSession(user: User &{_id: string}){
  // create a sessiion key return jwt token
  return jwt.sign({"id": user._id},JWT_TOKEN, { expiresIn: '1h' })
}


export function decodeSession(sessionkey:string){ // gets sessonkey from cookie
  try{
    const token =  jwt.verify(sessionkey, JWT_TOKEN) as {id: string}
    return token.id
  }catch(err){
    throw new HttpError(401, "Invalid session key")
  }
}