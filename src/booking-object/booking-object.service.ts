import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookingObject } from './model/booking-object.model';
import { CreateBookingObjectDto } from './dto/create-booking-object.dto';
import { UpdateBookingObjectDto } from './dto/update-booking-object.dto';

@Injectable()
export class BookingObjectService {
  constructor(
    @InjectModel(BookingObject)
    private readonly bookingObjectModel: typeof BookingObject,
  ) {}
  // -----------------------------------------------------------------------------------------
  async create(
    createBookingObjectDto: CreateBookingObjectDto,
  ): Promise<BookingObject> {
    try {
      const bookingObject = new BookingObject({
        ...createBookingObjectDto,
      });
      return bookingObject.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  // -----------------------------------------------------------------------------------------
  async findAll(): Promise<BookingObject[]> {
    try {
      return await this.bookingObjectModel.findAll();
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
  // -----------------------------------------------------------------------------------------
  async findOne(id: number): Promise<BookingObject> {
    try {
      const bookingObject = await this.bookingObjectModel.findByPk(id);
      if (!bookingObject) {
        throw new NotFoundException();
      }
      return bookingObject;
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
  // -----------------------------------------------------------------------------------------
  async update(
    id: number,
    updateBookingObjectDto: UpdateBookingObjectDto,
  ): Promise<BookingObject> {
    try {
      const bookingObject = await this.findOne(id);
      return bookingObject.update({ ...updateBookingObjectDto });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
  // -----------------------------------------------------------------------------------------
  async remove(id: number): Promise<void> {
    try {
      const bookingObject = await this.findOne(id);
      await bookingObject.destroy();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
