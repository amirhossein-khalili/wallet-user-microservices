import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);

    /*
    this is the part that should send event to another service that create a new wallet for the user
    
    */
    console.log('='.repeat(50));
    console.log('rabbit wallet created');
    console.log('='.repeat(50));

    return createdUser.save();
  }

  async findByUsername(userName: string) {
    return this.userModel.findOne({ userName: { $eq: userName } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );

    return existingUser;
  }

  async findAll(seletion?: string) {
    return this.userModel.find().select(seletion).exec();
  }

  async findOne(id: string, seletion?: string) {
    return this.userModel.findById(id).select(seletion).exec();
  }
}
