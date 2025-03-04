import { Request, Response, NextFunction } from 'express'

const publicRoutes = ["/signup", "/login"]


export async function checkRoutes(req: Request, res: Response, next: NextFunction) {
  const userCookies = req.cookies

  if(userCookies?.session){
    verifySession(userCookies.session) // does nothing now, have to implement after /signup is complete
    next()
  }else{
    if(publicRoutes.includes(req.path)){
      next()
    }else{
      res.status(401).json({"message": "Unauthorized"})
    }
  }
  // res.cookie("session", "this is sessionkey", { maxAge: 900000, httpOnly: true });
  next()
}

function verifySession(sessionKey: string){
  console.log(sessionKey)
  return
}