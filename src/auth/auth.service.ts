import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { SignInDto } from 'src/auth/sign-in.dto';
import { CreateUserDto } from 'src/users/users.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from 'src/users/users.service';
import env from 'src/configs/env';

export interface TokenPair {
    accessToken: string;
    refreshToken: string;
}

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(signInDto: SignInDto): Promise<TokenPair> {
        const user = await this.usersService.findOneByEmail(signInDto.email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const passwordCorrect = await bcrypt.compare(
            signInDto.password,
            user.password,
        );

        if (!passwordCorrect) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        return this.generateTokens(user);
    }

    async signUp(createUserDto: CreateUserDto): Promise<User> {
        const userExists = await this.usersService.findOneByEmail(
            createUserDto.email,
        );

        if (userExists) {
            throw new BadRequestException('User already exists.');
        }

        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

        return await this.usersService.create(createUserDto);
    }

    generateTokens(user: User): TokenPair {
        const payload = {
            id: user.id,
            email: user.email,
        };

        const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
            expiresIn: '15m',
        });
        const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
            expiresIn: '7d',
        });

        return { accessToken, refreshToken };
    }
}
