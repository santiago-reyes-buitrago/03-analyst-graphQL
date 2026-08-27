import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import {UsersService} from './users.service';
import {User} from './entities/user.entity';
import {ValidateRolesArgs} from "./dto/args/roles.arg";
import {CurrentUser} from "../auth/decorators/current-user.decorator";
import {ParseUUIDPipe, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";

@Resolver(() => User)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
  }

  @Query(() => [User], {name: 'users'})
  findAll(@Args() validRoles: ValidateRolesArgs, @CurrentUser() user: User): Promise<User[]> {
    return this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, {name: 'user'})
  findOne(@Args('id', {type: () => ID},ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  blockUser(@Args('id', {type: () => ID},ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.block(id);
  }
}
