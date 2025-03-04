import {Request} from 'express'
import dbConnect from '../common/db';
import { IpRequestLog, IpRequestLogType } from './models/ipReqeustLog';
import HttpError from '../common/customErrors/HttpError';


dbConnect();

async function ipLog(req: Request){
  const requestIP = req.ip;
  const iplog: IpRequestLogType | null = await IpRequestLog.findOne({ip: requestIP})
  if(!iplog){
    await IpRequestLog.create({
      ip: requestIP
    })
    return
  }
  if(iplog.requestCount > 50){
    throw new HttpError(403, "Too many requests");
  }
  await IpRequestLog.updateOne({ip: requestIP}, {
    $inc: {requestCount: 1}
  })
}