import { Body, Controller, Post } from '@nestjs/common';
import { BookingObjectService } from './booking-object.service';
import { CreateBookingObjectDto } from './dto/create-booking-object.dto';

@Controller('booking-object')
export class BookingObjectController {
  constructor(private readonly bookingObjectService: BookingObjectService) {}

  @Post()
  create(@Body() createBookingObjectDto: CreateBookingObjectDto) {
    return this.bookingObjectService.create(createBookingObjectDto);
  }
}
