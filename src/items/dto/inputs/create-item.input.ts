import {InputType, Field, Float} from '@nestjs/graphql';
import {IsNumber, IsOptional, IsString} from "class-validator";

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsString()
  name: string;
  @Field(() => Float)
  @IsNumber()
  quantity: number;
  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  quantityUnits?: string;
}
