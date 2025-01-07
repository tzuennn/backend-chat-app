import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jkashd1238asdasuiyiu#*7687as8dhasjkdhas87', 
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; 
  }
}