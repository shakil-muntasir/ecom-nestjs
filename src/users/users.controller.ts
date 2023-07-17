import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleGuard } from 'src/auth/role.guard';

@Controller('/users')
@UseGuards(new RoleGuard(['admin']))
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get('/')
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
    @HttpCode(HttpStatus.NO_CONTENT)
    destroy(@Param('id') id: number) {
        this.usersService.delete(id);

        return;
    }
}
