import { CreateUserInput } from './create-user.input';
import {InputType, Field, PartialType, ID} from '@nestjs/graphql';
import {IsBoolean, IsEnum, IsOptional, IsUUID} from "class-validator";
import {ValidRoles} from "../../../auth/enums/valid-roles.enum";

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => [ValidRoles])
  @IsOptional()
  @IsEnum(ValidRoles,{each: true})
  roles?: ValidRoles[];

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
