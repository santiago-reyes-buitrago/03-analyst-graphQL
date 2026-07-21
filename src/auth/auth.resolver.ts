import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {SignupInput} from "./dto/inputs/signup.input";
import {AuthResponseType} from "./types/auth-response.type";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseType,{name: 'signUp'})
  signUp(@Args('signUpInput') signUpInput: SignupInput): Promise<AuthResponseType>{
    return this.authService.signUp(signUpInput)
  }

  @Mutation(() => String,{name: 'login'})
  login(){
    return this.authService.login()
  }

  @Query(() => String, {name: 'revalidate'})
  revalidateToken() {
    return this.authService.revalidate()
  }
}
