import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  BadRequestException,
  Get,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('WALLET_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get('')
  async findAll() {
    const selection =
      '_id userName firstName lastName gender createdAt updatedAt';
    return this.userService.findAll(selection);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.userService.findByUsername(
      createUserDto.userName,
    );
    if (existingUser)
      throw new BadRequestException('please try with another username');

    return this.userService.create(createUserDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    /*
    
    this part check if there is not a user with the given id return error
    
    */
    const existingUser = await this.userService.findOne(id);
    if (!existingUser) throw new NotFoundException('User not found');
    /*
    
    this part check if there is already another user with the same user name return an error
    
    */
    const checkUserWithUserName = await this.userService.findByUsername(
      updateUserDto.userName,
    );
    if (
      checkUserWithUserName &&
      String(checkUserWithUserName._id) != String(existingUser._id)
    )
      throw new BadRequestException('please try with another username');
    /*
    
    this part update another field of the user data and in service it check if it contain the amount emit the event of the wallet service
    
    */
    return this.userService.update(id, updateUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const selection = '_id userName firstName lastName gender';
    const existingUser = await this.userService.findOne(id, selection);
    if (!existingUser) throw new NotFoundException('User not found');

    return existingUser;
  }
}
