import {Injectable} from '@nestjs/common';
import {SignupInput} from "./dto/inputs/signup.input";
import {AuthResponseType} from "./types/auth-response.type";
import {UsersService} from "../users/users.service";

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

  login() {
    throw new Error('Method not implemented.');
  }

  revalidate() {
    throw new Error('Method not implemented.');
  }
}
