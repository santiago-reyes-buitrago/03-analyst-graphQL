import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {SignupInput} from "./dto/inputs/signup.input";
import {AuthResponseType} from "./types/auth-response.type";
import {LoginInput} from "./dto/inputs/login.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseType,{name: 'signUp'})
  signUp(@Args('signUpInput') signUpInput: SignupInput): Promise<AuthResponseType>{
    return this.authService.signUp(signUpInput)
  }

  @Mutation(() => AuthResponseType,{name: 'login'})
  login(@Args('loginInput') loginInput: LoginInput): Promise<AuthResponseType>{
    return this.authService.login(loginInput)
  }

  @Query(() => String, {name: 'revalidate'})
  revalidateToken() {
    return this.authService.revalidate()
  }
}
