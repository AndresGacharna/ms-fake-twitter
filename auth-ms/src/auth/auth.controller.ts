import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { User } from './entities/user.entity';
import { Auth } from './decorators/auth.decorator';
import { ValidRoles } from './interfaces';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  //@Auth(ValidRoles.admin) //CON ESTE DECORADOR PERSONALIZADO SE PUEDEN COLOCAR VARIOS ROLES ValidRoles.user, etc.
  @Auth()
  privateRoute(@GetUser() user:User){

    return{
      ok:true,
      user
    }
  }

  @Get('users')
  getAllUsers(){
    return this.authService.getAllUsers();
  }

  @Get('oneuser/:id')
  getUserById(@Param('id') id: string){
    return this.authService.getOneById(id);
  }

}
