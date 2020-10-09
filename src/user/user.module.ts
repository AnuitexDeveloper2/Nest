import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from 'src/admin/printingEditions/admin.books.service';
import { AuthorEntity } from 'src/entities/author.entity';
import { BookEntity } from 'src/entities/book.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { OrderItemEntity } from 'src/entities/orderItem.entity';
import { UserEntity } from 'src/entities/user.entity';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { UserOrderController } from './order/user.order.controller';
import { UserOrderService } from './order/user.order.service';
import { UserController } from './profile/user.controller';
import { UserService } from './profile/user.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([BookEntity,UserEntity,AuthorEntity, OrderEntity, OrderItemEntity]),
    LoggerModule],
  controllers: [UserController,UserOrderController],
  providers: [UserService, BookService, UserOrderService]
})
export class UserModule {}
