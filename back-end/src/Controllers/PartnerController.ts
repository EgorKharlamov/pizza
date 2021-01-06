import {
  Body,
  Controller,
  Post,
  Put,
  UseFilters,
  UseGuards,
  Request,
  Get,
  Param,
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
import CreatePartnerRequest from '../Domain/Requests/CreatePartnerRequest';
import GetGoodByIdRequest from '../Domain/Requests/GetGoodByIdRequest';

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
    const request = new CreatePartnerRequest(
      body.email,
      body.pass,
      body.passRepeat,
      body.phone
    );
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

  @Get('goods')
  async getGoods(@Request() req: ExpressRequest) {
    const usecase = this.partnerService.getGoodsUseCase();
    const goods = usecase.do();
    return goods;
  }

  @Get('goods/:id')
  async getGoodById(@Param('id') id: number, @Request() req: ExpressRequest) {
    const request = new GetGoodByIdRequest(id);
    const usecase = this.partnerService.getGoodByIdUseCase();
    const goods = usecase.do(request);
    return goods;
  }
}
