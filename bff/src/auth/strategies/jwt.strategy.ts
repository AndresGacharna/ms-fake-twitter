import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/models/user-tweet.model";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(

        configService: ConfigService,
        private readonly httpService: HttpService,
    ){


    super({
      secretOrKey: configService.get('JWT_SECRET', 'Est3EsMISE3Dsecreto32s'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
    }

    async validate(payload: JwtPayload): Promise<User> {
      
      const { id } = payload;
  
      if (!id) {
          throw new UnauthorizedException('Invalid token: missing user ID');
      }
  
      try {
          const response = await lastValueFrom(
              this.httpService.get(`http://auth-ms:3000/api/auth/oneuser/${id}`)
          );
  
          const user = response?.data; // Extraer datos de la respuesta
  
          if (!user) {
              throw new UnauthorizedException('Token not valid');
          }
  
          if (!user.isActive) {
              throw new UnauthorizedException('User is inactive, talk with an admin');
          }
  
          return user;
        } catch (error) {
          console.error('Error validating token:', error?.response?.data || error.message);
      
          if (error instanceof UnauthorizedException) {
              throw error; // Re-lanza el mismo error sin modificarlo
          }
      
          throw new UnauthorizedException(
              error?.response?.data?.message || 'Error validating token'
          );
      }
      
  }
  
}