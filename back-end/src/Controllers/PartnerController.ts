import {
  Body,
  Controller,
  Post,
  Put,
  UseFilters,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import SignUpDto from '../Dtos/Requests/SignUpDto';
import PartnerDto from '../Dtos/Objects/PartnerDto';
import PartnerMapper from '../Mappers/PartnerMapper';
import { DomainValidationErrorExceptionFilter } from '../domain-validation-error-exception.filter';
import { LocalAuthGuard } from '../modules/auth/local-auth.guard';
import SignInDto from '../Dtos/Requests/SignInDto';
import { AuthService } from '../modules/auth/auth.service';
import { PartnerService } from '../modules/partner/partner.service';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';

@Controller('user')
@ApiTags('User')
@UseFilters(new DomainValidationErrorExceptionFilter())
export class PartnerController {
  constructor(
    public partnerService: PartnerService,
    public authService: AuthService
  ) {}

  @Put('signUp')
  @ApiBody({ type: SignUpDto })
  @ApiResponse({ type: PartnerDto })
  async signUp(@Body() body: SignUpDto) {
    const request = body;
    const useCase = this.partnerService.getSignUpUseCase();
    const user = await useCase.do(request);
    return PartnerMapper.domainToDto(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  @ApiBody({ type: SignInDto })
  @ApiResponse({ type: PartnerDto })
  async signIn(@Request() req: ExpressRequest) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({ type: PartnerDto })
  getUser(@Request() req: ExpressRequest) {
    return PartnerMapper.domainToDto(req.user!);
  }
}
