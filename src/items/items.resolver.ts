import {Logger, ParseUUIDPipe, UseGuards} from "@nestjs/common";
import {Resolver, Query, Mutation, Args, ID} from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import {CreateItemInput, UpdateItemInput} from "./dto/inputs";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {CurrentUser} from "../auth/decorators/current-user.decorator";
import {User} from "../users/entities/user.entity";


@Resolver(() => Item)
@UseGuards(JwtAuthGuard)
export class ItemsResolver {
  private logger = new Logger(ItemsResolver.name)
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput,@CurrentUser() user: User): Promise<Item> {
    return this.itemsService.create(createItemInput,user);
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemsService.findAll();
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.itemsService.findOne(id);
  }

  @Mutation(() => Item)
  updateItem(@Args('updateItemInput') updateItemInput: UpdateItemInput) {
    return this.itemsService.update(updateItemInput.id, updateItemInput);
  }

  @Mutation(() => Item)
  removeItem(@Args('id', { type: () => String }) id: string) {
    return this.itemsService.remove(id);
  }
}
