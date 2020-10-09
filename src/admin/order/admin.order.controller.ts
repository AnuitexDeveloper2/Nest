import { Body, Controller, Post } from "@nestjs/common";
import { BaseFilter } from "src/interfaces/filters/baseFilter";
import { AdminOrderService } from "./admin.order.service";

@Controller('admin/order')
export class AdminOrderController {
    constructor(private readonly service: AdminOrderService) {}

    @Post()
    async GetOrders(@Body() filter: BaseFilter) {
        const result = await this.service.GetOrders(filter)
        return result
    }
}