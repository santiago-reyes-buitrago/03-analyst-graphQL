import {BadRequestException, Injectable} from '@nestjs/common';
import {UpdateUserInput} from "./dto/inputs";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SignupInput} from "../auth/dto/inputs/signup.input";

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {
  }

  async create(signUpInput: SignupInput): Promise<User> {
    try {
      return await this.userRepository.save(this.userRepository.create(signUpInput));
    } catch (err) {
      console.log(err)
      throw new BadRequestException('Algo salio mal')
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({where: {status: true}});
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error('Method not implemented.');
    // return ;
  }
}
