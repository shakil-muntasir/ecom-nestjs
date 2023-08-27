import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    image: string;

    @IsNumber()
    categoryId: number;
}
