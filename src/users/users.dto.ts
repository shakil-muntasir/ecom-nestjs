import { IsString, IsBoolean, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsBoolean()
    isActive: boolean;
}
