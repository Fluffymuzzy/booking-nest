import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookingObjectService } from './booking-object.service';
import { CreateBookingObjectDto } from './dto/create-booking-object.dto';
import { UpdateBookingObjectDto } from './dto/update-booking-object.dto';

@Controller('booking-object')
export class BookingObjectController {
  constructor(private readonly bookingObjectService: BookingObjectService) {}
  // -----------------------------------------------------------------------------------------
  @Post()
  create(@Body() createBookingObjectDto: CreateBookingObjectDto) {
    return this.bookingObjectService.create(createBookingObjectDto);
  }
  // -----------------------------------------------------------------------------------------
  @Get()
  findAll() {
    return this.bookingObjectService.findAll();
  }
  // -----------------------------------------------------------------------------------------
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.bookingObjectService.findOne(id);
  }
  // -----------------------------------------------------------------------------------------
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateBookingObjectDto: UpdateBookingObjectDto,
  ) {
    return this.bookingObjectService.update(id, updateBookingObjectDto);
  }
  // -----------------------------------------------------------------------------------------
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.bookingObjectService.remove(id);
  }
}
