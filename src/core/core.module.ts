import { Module } from '@nestjs/common';
import {HandleErrors} from "./helper/handleErrors";

@Module({
  exports: [HandleErrors],
  providers: [HandleErrors],
})
export class CoreModule {}
