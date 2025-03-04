
export default class HttpError extends Error{
  status: Number;
  constructor(status: Number, message: string) {
    super(message);
    this.status = status;
  }
}