import { Controller } from "tsoa";

export class BaseController extends Controller {
  protected success<T>(data: T, message = "Success", code = 200) {
    this.setStatus(code);
    return { code, message, data };
  }

  protected fail(message: string, code = 400, data: any = null) {
    this.setStatus(code);
    return { code, message, data };
  }
}
