import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';
import { PaginatioDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject( NATS_SERVICE ) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Get()
  findAll( @Query() orderPaginatioDto: OrderPaginationDto ) {

    return this.ordersClient.send( 'findAllOrders', orderPaginatioDto );
  }

  @Get('id/:id')
  async findOne(@Param('id', ParseUUIDPipe ) id: string) {

    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id }),

      )
      return order;

    } catch (error) {
      throw new RpcException(error);
    }
  }



  @Get(':status')
  async findAllByStatus(
    @Param() statusDto: StatusDto,
    @Query() paginationDto: PaginatioDto
  ) {

    try {

      return this.ordersClient.send( 'findAllOrders', {
        ...paginationDto,
        status: statusDto.status
      })

    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe ) id: string,
    @Body() statusDto: StatusDto,
  ) {
    
    try {

      return this.ordersClient.send('changeOrderStatus', {id, status: statusDto.status})
      
    } catch (error) {
      throw new RpcException(error);
    }

  }



}
