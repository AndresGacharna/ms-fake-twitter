import { Module } from '@nestjs/common';
import { User } from '../models/user-tweet.model';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [],
  providers: [JwtStrategy],
  imports: [
    ConfigModule,
    HttpModule,

    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService) =>{

        return{
          secret: configService.get('JWT_SECRET'),
          signOptions:{
          expiresIn: '2h'
          }
        }
      }
    })
    ],

  exports:[JwtStrategy, PassportModule, JwtModule]
})
export class AuthModule {}
