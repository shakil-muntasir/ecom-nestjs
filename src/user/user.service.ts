import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateDto } from 'src/user/dto/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async create(userCreate: CreateDto): Promise<User | void> {
    const user = this.usersRepository.create(userCreate);
    return this.usersRepository.save(user);
  }

  async update(id: number, userCreate: CreateDto): Promise<User | void> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.firstName = userCreate.firstName;
    user.lastName = userCreate.lastName;
    user.isActive = userCreate.isActive;

    return this.usersRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
