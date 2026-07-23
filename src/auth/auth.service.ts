import {Injectable} from '@nestjs/common';
import {SignupInput} from "./dto/inputs/signup.input";
import {AuthResponseType} from "./types/auth-response.type";
import {UsersService} from "../users/users.service";
import {LoginInput} from "./dto/inputs/login.input";

@Injectable()
export class AuthService {

  constructor(
      private readonly usersService: UsersService
  ) {
  }

  async signUp(signUpInput: SignupInput): Promise<AuthResponseType> {
    const user = await this.usersService.create(signUpInput);
    return {
      token: 'asnfkasgjaoiksfjokasfd',
      user
    }
  }

  async login(loginInput: LoginInput): Promise<AuthResponseType> {
    const user = await this.usersService.findOneByEmail(loginInput.email);
    if (!user) throw new Error('Usuario no encontrado')

    return {
      token: 'asnfkasgjaoiksfjokasfd',
      user
    }
  }

  revalidate() {
    throw new Error('Method not implemented.');
  }
}
