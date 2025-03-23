import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User, UserTweet } from './models/user-tweet.model';
import { CreateTwittDto } from './dto/create-twitt.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './auth/decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


   // * AUTH MS REGION
   @Post('register')
   createUser(@Body() createUserDto: CreateUserDto) {
    return this.appService.register(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.appService.login(loginUserDto);
  }
  //* TWEETS MS REGION
  @Get()
  @UseGuards(AuthGuard('jwt')) // Protección con JWT
  async getAllTweets(@Req() req): Promise<UserTweet[]> {
    console.log(req.user); // Aquí puedes ver los datos del usuario extraídos del token
    return this.appService.getAllTweets();
  }

  @Post('createtweet')
  async createTweet(@Body() createTwittDto: CreateTwittDto) {
    return this.appService.create(createTwittDto);
  }

  //* EXAMPLE FOR POST METHODS
  @Post('saludo')
  async sayHello(@Body() object: any){
    return this.appService.sayHello(object)
  }

  //*END OF EXAMPLE FOR POST METHODS
}
