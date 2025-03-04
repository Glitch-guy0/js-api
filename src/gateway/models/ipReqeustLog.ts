import mongoose from 'mongoose'

type IpRequestLogType = {
  ip: string
  requestCount: number
  createdAt: Date
}

const ipRequestLogSchema = new mongoose.Schema({
  ip: {
    type: String,
    unique: true,
    required: true
  },
  requestCount: {
    type: Number,
    default: 1
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})

const IpRequestLog = mongoose.models.IpRequestLog || mongoose.model('IpRequestLog', ipRequestLogSchema)
export { IpRequestLogType, IpRequestLog }
