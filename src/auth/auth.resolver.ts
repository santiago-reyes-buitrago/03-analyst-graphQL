import {Mutation, Query, Resolver} from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String,{name: 'signUp'})
  signUp(){
    return this.authService.signUp()
  }

  @Mutation(() => String,{name: 'login'})
  login(){
    return this.authService.login()
  }

  @Query(() => String, {name: 'revalidate'})
  revalidateToken(){
    return 'revalidate'
  }
}
