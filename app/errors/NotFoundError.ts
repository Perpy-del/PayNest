class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 404;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default NotFoundError;
