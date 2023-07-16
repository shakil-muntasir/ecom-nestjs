import { IsArray, IsBoolean, IsEmail, IsString } from 'class-validator';
import { Role } from 'src/users/users.entity';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsBoolean()
    isActive: boolean;

    @IsArray()
    roles: Role[];
}
