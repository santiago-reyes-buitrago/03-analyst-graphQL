import {BadRequestException, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UpdateUserInput} from "./dto/inputs";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SignupInput} from "../auth/dto/inputs/signup.input";
import {HandleErrors} from "../core/helper/handleErrors";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private readonly handleErrors: HandleErrors
  ) {
  }

  async create(signUpInput: SignupInput): Promise<User> {
    try {
      return await this.userRepository.save(this.userRepository.create({...signUpInput,password: bcrypt.hashSync(signUpInput.password,10)}));
    } catch (err) {
      this.handleErrors.handleError(err)
      throw new BadRequestException('Algo salio mal')
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({where: {status: true}});
  }

  async findOne(id: string) {

  }

  async findOneByEmail(email: string) {
    try {
      return this.userRepository.findOneByOrFail({email})
    }catch (error ){
      this.handleErrors.handleError(error)
    }

  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error('Method not implemented.');
    // return ;
  }
}
