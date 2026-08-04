import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {SignupInput} from "./dto/inputs/signup.input";
import {AuthResponseType} from "./types/auth-response.type";
import {LoginInput} from "./dto/inputs/login.input";
import {UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";

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


  @Query(() => AuthResponseType, {name: 'revalidate'})
  @UseGuards(JwtAuthGuard)
  revalidateToken(): AuthResponseType {
    // return this.authService.revalidate()
    throw new Error('method not implemented')
  }
}
