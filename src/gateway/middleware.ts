import {Request} from 'express'
import dbConnect from '../common/db';
import { IpRequestLog, IpRequestLogType } from './models/ipReqeustLog';
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
    await sessionBlocklist.findOne({sessionkey})
    return true
  }catch(err:any){
    return false;
  }
}