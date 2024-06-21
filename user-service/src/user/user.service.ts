import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User, UserDocument } from './schemas/user.schema';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class UserService {
  private client: ClientProxy;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          'amqps://oshghfds:tQi23MMPiX0K7I4Y_8haBH-SazFn2vrT@jackal.rmq.cloudamqp.com/oshghfds',
        ],
        queue: 'wallet_queue',
        queueOptions: { durable: false },
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    /*
    
    this is the part create a new user 
    
    */

    const createdUser = new this.userModel(createUserDto);

    /*

    this is the part that should send event to another service that create a new wallet for the user
    
    */

    await this.client.emit('user_created', {
      userId: String(createdUser._id),
    });

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

    if (updateUserDto.amount) {
      await this.client.emit('update_amount', {
        userId: String(existingUser._id),
        amount: updateUserDto.amount,
      });
    }

    return existingUser;
  }

  async findAll(seletion?: string) {
    const users = await this.userModel.find().select(seletion).exec();

    const usersWithWallets = await Promise.all(
      users.map(async (user) => {
        const userId = String(user._id);
        const amount = await this.client
          .send('get_user_wallet_amount', { userId })
          .toPromise();

        return {
          ...user.toObject(),
          amount,
        };
      }),
    );

    return usersWithWallets;
  }

  async findOne(id: string, seletion?: string) {
    return this.userModel.findById(id).select(seletion).exec();
  }
}
