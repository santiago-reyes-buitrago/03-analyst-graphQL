import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {User} from "./entities/user.entity";
import {CoreModule} from "../core/core.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]),CoreModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
