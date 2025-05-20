import { IsEnum, IsOptional } from "class-validator";
import { PaginatioDto } from "src/common";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class OrderPaginationDto extends PaginatioDto {

    @IsOptional()
    @IsEnum( OrderStatusList, {
        message: `status must be one of the following values: ${Object.values(OrderStatusList).join(', ')}`,
    })
    status: OrderStatus
}