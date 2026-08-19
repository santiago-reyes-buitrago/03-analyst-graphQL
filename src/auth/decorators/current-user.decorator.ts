import {createParamDecorator, ForbiddenException, InternalServerErrorException} from '@nestjs/common';
import {GqlExecutionContext} from "@nestjs/graphql";
import {User} from "../../users/entities/user.entity";
import {ValidRoles} from "../enums/valid-roles.enum";


const validateRole = (validateRoles: ValidRoles[] = [],userRoles: string[] = []) => {
  for (const role of userRoles) {
    console.log(role)
    console.log(validateRoles)
    if (validateRoles.includes(role as ValidRoles)) return true;
  }
  return false;
}

export const CurrentUser = createParamDecorator((roles: ValidRoles[] = [], req) => {
  const ctx = GqlExecutionContext.create(req);
  const user: User | undefined = ctx.getContext().req.user;
  if (!user) throw new InternalServerErrorException('User not found (request)');
  if (roles.length === 0) return user;
  if (!validateRole(roles, user.roles)) throw new ForbiddenException('user not enough permissions');
  return user;
});