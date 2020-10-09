import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/entities/author.entity';
import { BookEntity } from 'src/entities/book.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { UserEntity } from 'src/entities/user.entity';
import { LoggerModule } from 'src/shared/logger/logger.module';
import { AuthorService } from './author/admin.author..service';
import { AuthorController } from './author/admin.author.controller';
import { AdminOrderController } from './order/admin.order.controller';
import { AdminOrderService } from './order/admin.order.service';
import { AdminBooksController as BooksController } from './printingEditions/admin.books.controller';
import { BookService } from './printingEditions/admin.books.service';
import { AdminUserController } from './users/admin.user.controller';
import { AdminUserService } from './users/admin.user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity,AuthorEntity,UserEntity,OrderEntity]),
    LoggerModule
  ],
  controllers: [AdminUserController, BooksController, AuthorController, AdminOrderController],
  providers: [AdminUserService, BookService, AuthorService, AdminOrderService]
})
export class AdminModule {}
