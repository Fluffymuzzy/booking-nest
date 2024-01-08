import { Module } from '@nestjs/common';
import { BookingObjectController } from './booking-object.controller';
import { BookingObjectService } from './booking-object.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { BookingObject } from './model/booking-object.model';

@Module({
  imports: [SequelizeModule.forFeature([BookingObject])],
  controllers: [BookingObjectController],
  providers: [BookingObjectService],
})
export class BookingObjectModule {}
