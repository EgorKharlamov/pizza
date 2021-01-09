import {
  Body,
  Controller,
  Put,
  UseFilters,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DomainValidationErrorExceptionFilter } from '../domain-validation-error-exception.filter';
import { AuthService } from '../modules/auth/auth.service';
import { JwtAuthGuard } from '../modules/auth/jwt-auth.guard';
import { OrdersService } from '../modules/orders/orders.service';
import CreateOrderDto from '../Dtos/Requests/CreateOrderDto';
import OrderDto from '../Dtos/Objects/OrderDto';
import OrderMapper from '../Mappers/OrderMapper';
import GetOrdersListDto from '../Dtos/Requests/GetOrdersListDto';
import GetOrdersListRequest from '../Domain/Requests/GetOrdersListRequest';
import { JwtSoftAuthGuard } from '../modules/auth/jwt-soft-auth.guard';

@Controller('order')
@ApiTags('Order')
@UseFilters(new DomainValidationErrorExceptionFilter())
export class OrderController {
  constructor(
    public orderService: OrdersService,
    public authService: AuthService
  ) {}

  @UseGuards(JwtSoftAuthGuard)
  @ApiBearerAuth()
  @Put()
  @ApiBody({ type: CreateOrderDto })
  @ApiResponse({ type: OrderDto })
  async createOrder(
    @Request() req: ExpressRequest,
    @Body() body: CreateOrderDto
  ) {
    const request = body;
    const useCase = this.orderService.getCreateOrderUseCase();
    const order = await useCase.do(request);
    return OrderMapper.domainToDto(order);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  @ApiResponse({ type: [OrderDto] })
  async getOrdersList(
    @Request() req: ExpressRequest,
    @Query() query: GetOrdersListDto
  ) {
    const request = new GetOrdersListRequest(
      query.page,
      query.limit,
      query.sort,
      query.filter
    );
    const useCase = this.orderService.getGetOrdersListUseCase();
    const order = await useCase.do(request);
    return OrderMapper.domainsListToDto(order);
  }
}
