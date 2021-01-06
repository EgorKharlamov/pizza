import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import PartnerEntity from '../../Domain/Entities/PartnerEntity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<PartnerEntity | undefined> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const domainUser = user;
      if (domainUser.validatePassword(pass)) {
        return domainUser;
      }
    }
    return undefined;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserById(id: number): Promise<PartnerEntity | undefined> {
    return this.usersService.findById(id);
  }

  async getUserByToken(token: any) {
    return this.jwtService.decode(token);
  }
}
