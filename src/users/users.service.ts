import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {UpdateUserInput} from "./dto/inputs";
import {User} from "./entities/user.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {SignupInput} from "../auth/dto/inputs/signup.input";
import {HandleErrors} from "../core/helper/handleErrors";
import {ValidRoles} from "../auth/enums/valid-roles.enum";

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name)
  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
      private readonly handleErrors: HandleErrors
  ) {
  }

  async create(signUpInput: SignupInput): Promise<User> {
    try {
      return await this.userRepository.save(this.userRepository.create({
        ...signUpInput,
        password: bcrypt.hashSync(signUpInput.password, 10)
      }));
    } catch (err) {
      this.handleErrors.handleError(err)
      throw new BadRequestException('Algo salio mal')
    }
  }

  async findAll(roles: ValidRoles[] = []): Promise<User[]> {
    if (roles.length === 0) return this.userRepository.find(
        {
          where: {status: true},
          relations: {
            lastUpdateBy: true
          }
        });
    return this.userRepository.createQueryBuilder()
        .leftJoin('users', 'us', '"User"."lastUpdateBy" = us.id')
        .andWhere('ARRAY["User".roles] && ARRAY[:...roles]')
        .setParameter('roles', roles)
        .getMany()

  }

  async findOne(id: string) {
    try {
      return await this.userRepository.findOneByOrFail({id})
    } catch (error) {
      this.handleErrors.handleError(error)
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOneByOrFail({email})
    } catch (error) {
      this.handleErrors.handleError(error)
    }
  }

  async update(updateUserInput: UpdateUserInput,userLastUpdate: User): Promise<User> {
    try {
      const userToUpdate = await this.userRepository.preload(updateUserInput)
      if (!userToUpdate) throw new NotFoundException('No se encontro este usuario')
      userToUpdate.lastUpdateBy =  userLastUpdate
      return await this.userRepository.save({...userToUpdate,password: bcrypt.hashSync(userToUpdate.password, 10)});
    }catch (e) {
      this.logger.error(e)
      throw new InternalServerErrorException('Un error incontrolable')
    }
  }

  async block(id: string, user?: User): Promise<User> {
    const userToBlock = await this.findOne(id);
    if (!userToBlock) throw new NotFoundException('Usuario no existe')
    userToBlock.status = false;
    userToBlock.lastUpdateBy = user;
    return await this.userRepository.save(userToBlock);
  }
}
