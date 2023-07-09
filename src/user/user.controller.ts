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

import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('api/users')
    index() {
        return this.userService.findAll();
    }

    @Post('api/users')
    store(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @Get('api/users/:id')
    show(@Param('id') id: number) {
        return this.userService.findOne(id);
    }

    @Patch('api/users/:id')
    update(@Param('id') id: number, @Body() createUserDto: CreateUserDto) {
        return this.userService.update(id, createUserDto);
    }

    @Delete('api/users/:id')
    @HttpCode(204)
    destroy(@Param('id') id: number) {
        return this.userService.delete(id);
    }
}
