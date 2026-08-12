import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {SignupInput} from "./dto/inputs/signup.input";
import {AuthResponseType} from "./types/auth-response.type";
import {LoginInput} from "./dto/inputs/login.input";
import {Logger, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "./guards/jwt-auth.guard";
import {CurrentUser} from "./decorators/current-user.decorator";
import {User} from "../users/entities/user.entity";

@Resolver()
export class AuthResolver {
  private readonly logger = new Logger(AuthResolver.name)
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
  revalidateToken(@CurrentUser() user: User): AuthResponseType {
    // return this.authService.revalidate()
    this.logger.log(user)
    throw new Error('method not implemented')
  }
}
