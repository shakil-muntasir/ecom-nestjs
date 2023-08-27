import {
    IsArray,
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { Role } from 'src/users/users.entity';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsBoolean()
    isActive: boolean;

    @IsArray()
    roles: Role[];
}
