import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';

@Controller('/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('')
    index() {
        return this.usersService.findAll();
    }

    @Post('/')
    store(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Get('/:id')
    show(@Param('id') id: number) {
        return this.usersService.findOne(id);
    }

    @Patch('/:id')
    update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
        return this.usersService.update(id, createUserDto);
    }

    @Delete('/:id')
    @HttpCode(204)
    destroy(@Param('id') id: number) {
        this.usersService.delete(id);

        return;
    }
}
