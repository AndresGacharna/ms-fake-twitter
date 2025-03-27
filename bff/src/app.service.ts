import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Commentaries, Retweet, Tweet, User, UserComments, UserRetweets, UserTweet } from './models/user-tweet.model';
import { CreateTwittDto } from './dto/create-twitt.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateTwittDto } from './dto/update-twitt.dto';

@Injectable()
export class AppService {
  constructor(

    private readonly httpService: HttpService,
  ) {}

  // * AUTH MS REGION

  async register(createUserDto: CreateUserDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-ms:3000/api/auth/register', createUserDto)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async login(loginUserDto: LoginUserDto){
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-ms:3000/api/auth/login', loginUserDto)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }
  // * ENDS AUTH'S MS REGION


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
        user: users.find((u) => u.id === tweet.id)!,
      }));

      return userTweets;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async create(createTwittDto:CreateTwittDto, user:User){
    try {
      const myPost = {
        ...createTwittDto,
        id:user.id
      }
      const response = await firstValueFrom(
        this.httpService.post('http://twitts-ms:3001/api/twitts', myPost)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async updatetweets(id: string, updateTwittDto: UpdateTwittDto){
    
    try {
      const response = await firstValueFrom(
        this.httpService.patch(`http://twitts-ms:3001/api/twitts/${id}`, updateTwittDto)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async findOne(term){
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://twitts-ms:3001/api/twitts/${term}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async removeTweet(id){
    try {
      
      const response = await firstValueFrom(
        this.httpService.delete(`http://twitts-ms:3001/api/twitts/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }
  // * ENDS TWEET'S MS REGION

  //* LIKES MS REGION
  async createLike(id, user){
    try {
      const myLike = {
        idTwitt:id,
        id: user.id
      }
      const response = await firstValueFrom(
        this.httpService.post('http://likescomments:3002/api/likes', myLike)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async countTweetLikes(id: string){
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://likescomments:3002/api/likes/count/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async removeLike (id: string){
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`http://likescomments:3002/api/likes/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  //* ENDS LIKES'S MS REGION

  //* COMMENTS MS REGION
  async createComment(id,createCommentDto, user){
    try {
      const myPost = {
        content:createCommentDto.content,
        idTwitt: id,
        id:user.id
        
      }
      console.log("Estesmipost",myPost)
      const response = await firstValueFrom(
        this.httpService.post('http://likescomments:3002/api/commentaries', myPost)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }

  }
  async updateComment(id,updateCommentDto, user){
    try {
      const myPost = {
        content:updateCommentDto.content,
        id:user.id
        
      }
      const response = await firstValueFrom(
        this.httpService.patch(`http://likescomments:3002/api/commentaries/${id}`, myPost)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }

  }

  async findPublicationComments(id){
    try {
      // Hacemos las peticiones con Axios y obtenemos los datos
      const usersResponse = await firstValueFrom(
        this.httpService.get<User[]>('http://auth-ms:3000/api/auth/users')
      );
      const commentsResponse = await firstValueFrom(
        this.httpService.get<Commentaries[]>(`http://likescomments:3002/api/commentaries/publication/${id}`)
      );

      const users = usersResponse.data;
      const comments = commentsResponse.data;

      const userComments: UserComments[] = comments.map((comment) => ({
        content: comment.content,
        user: users.find((u) => u.id === comment.id)!,
      }));

      console.log("Esto es usercomments",userComments)
      return userComments;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }

  }
  
  async removeComment(id){
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`http://likescomments:3002/api/commentaries/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }

  }

  //* ENDS COMMENT'S MS REGION


  //* RETWEET MS REGION
  async createRetweet(id, user){
    try {
      const myLike = {
        idTwitt:id,
        id: user.id
      }
      const response = await firstValueFrom(
        this.httpService.post('http://likescomments:3002/api/retweets', myLike)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async countRetweets(id: string){
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://likescomments:3002/api/retweets/count/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }

  async findUserRetweets(id) {
    try {
        // Hacemos las peticiones con Axios y obtenemos los datos
        const usersResponse = await firstValueFrom(
            this.httpService.get<User[]>('http://auth-ms:3000/api/auth/users')
        );
        const retweetsResponse = await firstValueFrom(
            this.httpService.get<Retweet[]>('http://likescomments:3002/api/retweets')
        );
        const tweetsResponse = await firstValueFrom(
            this.httpService.get<Tweet[]>('http://twitts-ms:3001/api/twitts')
        );

        const users = usersResponse.data;
        const retweets = retweetsResponse.data;
        const tweets = tweetsResponse.data;

        // Mapeamos los retweets con su respectivo usuario y el tweet original
        const userRetweets: UserRetweets[] = retweets.map((retweet) => {
            const user = users.find((u) => u.id === retweet.id)!;
            const tweet = tweets.find((t) => t.twitt_id === retweet.idTwitt);

            return {
                tweet, // Tweet completo
                user
            };
        });

        return userRetweets;
    } catch (error) {
        console.error('Error creando UserRetweets:', error?.response?.data || error.message);

        if (error.response) {
            throw new HttpException(error.response.data, error.response.status);
        }

        throw new HttpException(
            {
                statusCode: 500,
                message: 'Error al comunicarse con los servicios',
            },
            500
        );
    }
}



  async removeRetweets (id: string){
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`http://likescomments:3002/api/retweets/${id}`)
      );
      return response.data;
    } catch (error) {
      console.error('Error creating User:', error?.response?.data || error.message);

      // Si el `auth-ms` responde con un error, lo propagamos con el código correcto
      if (error.response) {
        throw new HttpException(error.response.data, error.response.status);
      }

      // Si no hay respuesta (problema de red o `auth-ms` caído), lanzar un error 500
      throw new HttpException(
        {
          statusCode: 500,
          message: 'Error al comunicarse con el servicio de autenticación',
        },
        500
      );
    }
  }
  
  //* ENDS RETWEET'S MS REGION
}
