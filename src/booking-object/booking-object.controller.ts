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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('booking-object')
export class BookingObjectController {
  constructor(private readonly bookingObjectService: BookingObjectService) {}
  // -----------------------------------------------------------------------------------------
  @Post()
  @ApiOperation({ summary: 'Create a new booking object' })
  @ApiResponse({ status: 201, description: 'Booking object created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createBookingObjectDto: CreateBookingObjectDto) {
    return this.bookingObjectService.create(createBookingObjectDto);
  }
  // -----------------------------------------------------------------------------------------
  @Get()
  @ApiOperation({ summary: 'Get all booking objects' })
  @ApiResponse({ status: 200, description: 'Booking objects retrieved' })
  findAll() {
    return this.bookingObjectService.findAll();
  }
  // -----------------------------------------------------------------------------------------
  @Get(':id')
  @ApiOperation({ summary: 'Get a booking object by id' })
  @ApiResponse({ status: 200, description: 'Booking object retrieved' })
  @ApiResponse({ status: 404, description: 'Booking object not found' })
  findOne(@Param('id') id: number) {
    return this.bookingObjectService.findOne(id);
  }
  // -----------------------------------------------------------------------------------------
  @Patch(':id')
  @ApiOperation({ summary: 'Update a booking object' })
  @ApiResponse({ status: 200, description: 'Booking object updated' })
  @ApiResponse({ status: 404, description: 'Booking object not found' })
  update(
    @Param('id') id: number,
    @Body() updateBookingObjectDto: UpdateBookingObjectDto,
  ) {
    return this.bookingObjectService.update(id, updateBookingObjectDto);
  }
  // -----------------------------------------------------------------------------------------
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking object' })
  @ApiResponse({ status: 200, description: 'Booking object deleted' })
  @ApiResponse({ status: 404, description: 'Booking object not found' })
  remove(@Param('id') id: number) {
    return this.bookingObjectService.remove(id);
  }
}
