import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookingObject } from './model/booking-object.model';
import { CreateBookingObjectDto } from './dto/create-booking-object.dto';

@Injectable()
export class BookingObjectService {
  constructor(
    @InjectModel(BookingObject)
    private readonly bookingObjectModel: typeof BookingObject,
  ) {}

  async create(
    createBookingObjectDto: CreateBookingObjectDto,
  ): Promise<BookingObject> {
    const bookingObject = new BookingObject({
      ...createBookingObjectDto,
    });
    return bookingObject.save();
  }
}
