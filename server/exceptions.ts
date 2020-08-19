export class HttpsErrorException extends Error {
  status: number;
  message: string;
  data?: object;
  constructor(ErrorData: { status: number; message: string; data?: object }) {
    super(ErrorData.message);
    this.status = ErrorData.status || 500;
    this.message = ErrorData.message;
    this.data = ErrorData.data;
  }
}
