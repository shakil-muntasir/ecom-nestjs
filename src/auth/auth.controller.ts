import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from 'src/auth/sign-in.dto';
import { CreateUserDto } from 'src/users/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserRequest } from 'src/users/user-request.interface'

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/register')
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto);
    }

    @Get('/user')
    @UseGuards(AuthGuard)
    showAuthUser(@Request() { user }: { user: UserRequest }) {
        return this.authService.getAuthUser(user.id);
    }
}
