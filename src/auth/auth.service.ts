import {BadRequestException, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {SignupInput} from "./dto/inputs/signup.input";
import {AuthResponseType} from "./types/auth-response.type";
import {UsersService} from "../users/users.service";
import {LoginInput} from "./dto/inputs/login.input";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

  constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService
  ) {
  }

  private getJwtToken = (userId: string) => this.jwtService.sign({id: userId})

  async signUp(signUpInput: SignupInput): Promise<AuthResponseType> {
    const user = await this.usersService.create(signUpInput);
    const token = this.getJwtToken(user.id)
    return {
      token,
      user
    }
  }

  async login(loginInput: LoginInput): Promise<AuthResponseType> {
    const user = await this.usersService.findOneByEmail(loginInput.email);
    if (!user) throw new Error('Usuario no encontrado')

    if (!bcrypt.compareSync(loginInput.password,user.password)) {
      throw new BadRequestException('Email/Password do not match')
    }

    const token = this.getJwtToken(user.id)

    return {
      token,
      user
    }
  }

  revalidate() {
    throw new Error('Method not implemented.');
  }
}
