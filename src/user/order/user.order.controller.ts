import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderEntity } from "src/entities/order.entity";
import { UserOrderService } from "./user.order.service";

@Controller('order')
export class UserOrderController {
    constructor(private readonly service: UserOrderService) { }
    @Post()
    async CreateOrder(@Body() order: OrderEntity) {
        const result = await this.service.CreateOrder(order)
        return result
    }

    @Get(':id')
    async GetUserOrders(@Param('id') id: number) {
        const result = await this.service.GetUserOrders(id)
        return result
    }
}