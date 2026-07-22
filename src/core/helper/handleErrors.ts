import {DB_ERROR} from "../constants/errors-DB.constant";
import {Injectable, InternalServerErrorException, Logger} from "@nestjs/common";

interface ErrorDetailDB {
  detail: string
}


interface paramErrors<T extends ErrorDetailDB> {
  code: string,
  detail: string
}

@Injectable()
export class HandleErrors {
  private logger: Logger = new Logger(HandleErrors.name)
  private errors = {
    ...DB_ERROR
  }


  handleError({code, detail}: paramErrors<any>) {
    if (!this.errors[code]) throw new InternalServerErrorException('Error unknown')
    this.logger.error(`Code: ${code} - Message: ${detail}`)
    this.errors[code](detail)
  }

}