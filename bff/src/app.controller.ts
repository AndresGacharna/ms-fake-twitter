import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Req, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { User, UserComments, UserTweet } from './models/user-tweet.model';
import { CreateTwittDto } from './dto/create-twitt.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './auth/decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ok } from 'assert';
import { use } from 'passport';
import { UserRoleGuard } from './auth/guards/user-role.guard';
import { RoleProtected } from './auth/decorators/role-protected.decorator';
import { Auth } from './auth/decorators/auth.decorator';
import { ValidRoles } from './auth/interfaces';
import { UpdateTwittDto } from './dto/update-twitt.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  @Patch('edituser')
  @Auth()
  editUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
){
  return this.appService.editUser(user, updateUserDto)
}

  // * ENDS AUTH'S MS REGION


  //* TWEETS MS REGION
  @Get()
  async getAllTweets(@Req() req): Promise<UserTweet[]> {
    console.log(req.user); // Aquí puedes ver los datos del usuario extraídos del token
    return this.appService.getAllTweets();
  }

  @Post('createtweet')
  @Auth()
  async createTweet(
    @GetUser() user: User,
    @Body() createTwittDto: CreateTwittDto) {
    return this.appService.create(createTwittDto,user);
  }

  @Patch('updatetweet/:id')
  @Auth() 
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateTwittDto: UpdateTwittDto,
    @GetUser() user: User,
  ){
    return this.appService.updatetweets(id, updateTwittDto); //Aca se podria agregar la verificacion de usuario (Para que no lo pueda editar cualquier usuario cualquier tweet)
  }

  @Auth() 
  @Get('findonetweet/:term')
  findOne(@Param('term') term: string) {
    return this.appService.findOne(term);
  }

  @Auth()
  @Delete('deletetweet/:id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.removeTweet(id);
  }
  // * ENDS TWEET'S MS REGION

  
  //* LIKES MS REGION
  @Auth()
  @Post('makelike/:id')
  create(
    @GetUser() user:User,
    @Param('id', ParseUUIDPipe) id:string) {
    return this.appService.createLike(id, user);
  }
  
  @Auth()
  @Get('count/:id')
  countTweetLikes(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.countTweetLikes(id);
  }
  
  @Auth()
  @Delete('removelike/:id')
  removeLike(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.removeLike(id);
  }

  // * ENDS LIKE'S MS REGION

  //* Comments MS REGION
  
  @Auth()
  @Post('createcomment/:id')
  createComment(
    @GetUser() user:User,
    @Body() createCommentDto: CreateCommentDto,
    @Param('id', ParseUUIDPipe) id: string //ESTE ES EL ID DEL TWEET
  ) {
    return this.appService.createComment(id,createCommentDto, user);
  }

  @Auth()
  @Patch('updatecomment/:id')
  updateComment(
    @GetUser() user:User,
    @Body() updateCommentDto: UpdateCommentDto,
    @Param('id', ParseUUIDPipe) id: string //ESTO ES EL ID DEL COMENTARIO QUE VOY A EDITAR
  ){
    return this.appService.updateComment(id, updateCommentDto,user);
  }

  @Auth()
  @Get('publication/:id')
  findPublicationComments( //OBTIENE LOS COMENTARIOS DE LA PUBLICACION QUE LE MANDEN ID
    @Param('id') id: string
  ): Promise<UserComments[]>
  {
    return this.appService.findPublicationComments(id);
  }

  @Auth()
  @Delete('deletecomment/:id')
  removeComment(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.removeComment(id);
  }

  // * ENDS Comment'S MS REGION


  //* RETWEET MS REGION
  @Auth()
  @Post('makeretweet/:id')
  createRetweet(
    @GetUser() user:User,
    @Param('id', ParseUUIDPipe) id:string) {
    return this.appService.createRetweet(id, user);
  }
  
  @Auth()
  @Get('countretweet/:id')
  countRetweets(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.countRetweets(id);
  }

  @Get('alluserretweets/:id')
  findUserRetweets(
    @Param('id') id: string //ESTE ES EL ID DEL USUARIO, VAMOS A TRAER LOS RETWEETS DE ESTE
  ){
    return this.appService.findUserRetweets(id);
  }
  
  @Auth()
  @Delete('removeretweet/:id')
  removeRetweets(@Param('id', ParseUUIDPipe) id: string) {
    return this.appService.removeRetweets(id);
  }

  // * ENDSRETWEET'S MS REGION

  
  //* EXAMPLE FOR POST METHODS

  //* [example] MS REGION
  // * ENDS [example]'S MS REGION


  @Get('private3')
  @Auth(ValidRoles.admin)
  privateRoute2(
    @GetUser() user:User
  ){
    return{
      ok:true,
      user
    }
  }
  //*END OF EXAMPLE FOR POST METHODS
}
