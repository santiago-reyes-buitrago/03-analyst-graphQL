import {createParamDecorator, InternalServerErrorException} from '@nestjs/common';
import {GqlExecutionContext} from "@nestjs/graphql";
import {User} from "../../users/entities/user.entity";

export const CurrentUser = createParamDecorator((roles = [], req) => {
  const ctx = GqlExecutionContext.create(req);
  const user: User | undefined = ctx.getContext().req.user;
  if (!user) throw new InternalServerErrorException('User not found (request)');
  return user;
});