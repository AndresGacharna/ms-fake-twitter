import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrae JWT del Header
      ignoreExpiration: false, // NO ignorar expiración
      secretOrKey: configService.get('JWT_SECRET','Est3EsMISE3Dsecreto32s')
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }
    return { id: payload.id, fullName: payload.fullName, roles: payload.roles };
  }
}
