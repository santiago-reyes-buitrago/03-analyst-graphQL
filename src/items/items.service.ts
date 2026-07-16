import {Injectable, NotFoundException} from '@nestjs/common';
import {CreateItemInput, UpdateItemInput} from "./dto/inputs";
import { Item } from "./entities/item.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class ItemsService {
  constructor(
      @InjectRepository(Item) private readonly itemsRepository: Repository<Item>
  ) {}
  async create(createItemInput: CreateItemInput): Promise<Item> {
    return this.itemsRepository.save(this.itemsRepository.create(createItemInput));
  }

  findAll() {
    return this.itemsRepository.find();
  }

  async findOne(id: string): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({id});
    if (!item) throw new NotFoundException('No se encontro el producto solicitado')
    return item;
  }

  async update(id: string, updateItemInput: UpdateItemInput): Promise<Item> {
    const item  = await this.findOne(id)
    return this.itemsRepository.save({...item,...updateItemInput});
  }

  async remove(id: string): Promise<Item> {
    const item = await this.findOne(id)
    return this.itemsRepository.remove(item);
  }
}
