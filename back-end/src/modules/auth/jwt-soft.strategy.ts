import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { Request } from 'express';

@Injectable()
export class JwtSoftStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  authenticate(req: Request, options?: any) {
    if (req.user) {
      this.success(req.user);
      return;
    }
    if (req.headers.authorization) {
      console.log('auth', req.headers, options);
      super.authenticate(req, options);
      return;
    }
    this.pass();
    return;
  }

  async validate(payload: any) {
    return await this.authService.getUserById(payload.sub);
  }
}
