import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import {IsString} from "class-validator";

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => String)
  @IsString()
  id: string;
}
