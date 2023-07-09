import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateProductDto {
    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsNumber()
    quantity: number;

    @IsOptional()
    @IsString()
    image: string;

    @IsNumber()
    categoryId: number;
}
