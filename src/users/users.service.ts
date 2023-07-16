import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './users.entity';
import { CreateUserDto } from 'src/users/users.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    async findOneByEmail(email: string): Promise<User> {
        return await this.usersRepository.findOneBy({ email });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

        const user = this.usersRepository.create(createUserDto);

        return await this.usersRepository.save(user);
    }

    async update(id: number, createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.isActive = createUserDto.isActive;
        user.roles = createUserDto.roles;
        user.password = await bcrypt.hash(createUserDto.password, 10);

        return await this.usersRepository.save(user);
    }

    async delete(id: number): Promise<DeleteResult> {
        const user = await this.usersRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return await this.usersRepository.delete(user.id);
    }
}
