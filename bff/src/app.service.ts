import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Tweet, User, UserTweet } from './models/user-tweet.model';
import { CreateTwittDto } from './dto/create-twitt.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AppService {
  constructor(

    private readonly httpService: HttpService,
  ) {}

  // * AUTH MS REGION

  async register(createUserDto: CreateUserDto){
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-ms:3000/api/auth/register', createUserDto)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating tweet:', error);
      throw new Error('Error creating tweet');
    }
  }

  async login(loginUserDto: LoginUserDto){
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-ms:3000/api/auth/login', loginUserDto)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating tweet:', error);
      throw new Error('Error creating tweet');
    }
  }

  // * TWEETS MS REGION
  async getAllTweets(): Promise<UserTweet[]> {
    try {
      // Hacemos las peticiones con Axios y obtenemos los datos
      const usersResponse = await firstValueFrom(
        this.httpService.get<User[]>('http://auth-ms:3000/api/auth/users')
      );
      const tweetsResponse = await firstValueFrom(
        this.httpService.get<Tweet[]>('http://twitts-ms:3001/api/twitts')
      );

      const users = usersResponse.data;
      const tweets = tweetsResponse.data;

      // Mapeamos los tweets con su respectivo usuario
      const userTweets: UserTweet[] = tweets.map((tweet) => ({
        content: tweet.content,
        user: users.find((u) => u.fullName === tweet.fullName)!,
      }));

      return userTweets;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Error('Error retrieving tweets');
    }
  }

  async create(createTwittDto:CreateTwittDto){
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://twitts-ms:3001/api/twitts', createTwittDto)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating tweet:', error);
      throw new Error('Error creating tweet');
    }
  }
  // * END     TWEETS MS REGION

  //* EXAMPLE FOR POST METHODS
  async sayHello(object:any){
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://twitts-ms:3001/api/twitts/pa', object)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating tweet:', error);
      throw new Error('Error creating tweet');
    }
  }

  // * END     EXAMPLE FOR POST METHODS
}
