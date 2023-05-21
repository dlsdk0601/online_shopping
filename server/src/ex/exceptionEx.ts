import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
export class ExceptionEx implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const status = exception ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    res.status(status).json({
      data: null,
      message: exception.message,
      timestamp: new Date().toISOString(),
    });
  }
}
