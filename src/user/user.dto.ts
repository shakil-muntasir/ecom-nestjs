import { IsString, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsBoolean()
    isActive: boolean;
}
