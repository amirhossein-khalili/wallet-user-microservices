import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  BadRequestException,
  Get,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll() {
    const selection = '_id userName firstName lastName gender';
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
    const existingUser = await this.userService.findOne(id);
    if (!existingUser) throw new NotFoundException('User not found');

    const checkUserWithUserName = await this.userService.findByUsername(
      updateUserDto.userName,
    );

    console.log(existingUser);
    if (
      checkUserWithUserName &&
      String(checkUserWithUserName._id) != String(existingUser._id)
    )
      throw new BadRequestException('please try with another username');

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
