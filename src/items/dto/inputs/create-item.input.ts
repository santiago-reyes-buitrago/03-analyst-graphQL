import {InputType, Field} from '@nestjs/graphql';
import {IsOptional, IsString} from "class-validator";

@InputType()
export class CreateItemInput {
  @Field(() => String)
  @IsString()
  name: string;
  // @Field(() => Float)
  // @IsNumber()
  // quantity: number;
  @Field(() => String, {nullable: true})
  @IsString()
  @IsOptional()
  quantityUnits?: string;
}
