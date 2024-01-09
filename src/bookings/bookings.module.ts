import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './model/bookings.model';
import { BookingObject } from 'src/booking-object/model/booking-object.model';

@Module({
  imports: [SequelizeModule.forFeature([Booking, BookingObject])],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [SequelizeModule],
})
export class BookingsModule {}
