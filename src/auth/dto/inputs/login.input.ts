import {IsEmail, MinLength} from "class-validator";
import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class LoginInput {

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(6)
  password: string;
}