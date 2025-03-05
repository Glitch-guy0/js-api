import {Request} from 'express'
import dbConnect from '../common/db';
import { IpRequestLog, IpRequestLogType } from '../common/models/ipReqeustLog';
import HttpError from '../common/customErrors/HttpError';
import sessionBlocklist from '../common/models/sessionBlocklist';


dbConnect();

export async function ipLog(req: Request){
  const requestIP = req.ip;
  const iplog: IpRequestLogType | null = await IpRequestLog.findOne({ip: requestIP})
  if(!iplog){
    await IpRequestLog.create({
      ip: requestIP
    })
    return
  }
  if(iplog.requestCount > 10){
    throw new HttpError(403, "Too many requests");
  }
  await IpRequestLog.updateOne({ip: requestIP}, {
    $inc: {requestCount: 1}
  })
}

export async function isSessionBlocked(sessionkey: string){
  try{
    const session = await sessionBlocklist.findOne({sessionkey})
    if(session){
      return true;
    }
    return false
  }catch(err:any){
    return true;
  }
}