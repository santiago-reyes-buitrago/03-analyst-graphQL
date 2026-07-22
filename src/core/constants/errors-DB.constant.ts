import {ConflictException} from "@nestjs/common";

export const DB_ERROR:Record<string, (param: string) => void> = {
  '23505': (err: string) => {
    throw new ConflictException(err)
  }
};