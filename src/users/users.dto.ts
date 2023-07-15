import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsBoolean()
    isActive: boolean;
}
