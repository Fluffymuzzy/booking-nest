/* eslint-disable prettier/prettier */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { Booking } from "./model/bookings.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { BookingObject } from "src/booking-object/model/booking-object.model";

@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking)
    private readonly bookingModel: typeof Booking,
    @InjectModel(BookingObject)
    private readonly bookingObject: typeof BookingObject
  ) {}
  // -----------------------------------------------------------------------------------------
  async isBookingAvailable(
    bookingObjectId: number,
    startDate: Date,
    endDate: Date,
    excludeBookingId?: number
  ): Promise<boolean> {
    const bookingObject = await this.bookingObject.findByPk(bookingObjectId);
    if (!bookingObject) {
      throw new NotFoundException("Booking object not found.");
    }
    const overlappingBookings = await this.bookingModel.count({
      where: {
        bookingObjectId,
        id: { [Op.ne]: excludeBookingId },
        [Op.or]: [
          {
            startDate: {
              [Op.lt]: endDate,
              [Op.ne]: startDate,
            },
            endDate: {
              [Op.gt]: startDate,
              [Op.ne]: endDate,
            },
          },
        ],
      },
    });

    return overlappingBookings === 0 || bookingObject.availableUnits > 0;
  }
  // -----------------------------------------------------------------------------------------
  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    try {
      const { bookingObjectId, startDate, endDate } = createBookingDto;
      const start = this.parseDateString(startDate);
      const end = this.parseDateString(endDate);

      const bookingObject = await this.bookingObject.findByPk(bookingObjectId);
      if (!bookingObject) {
        throw new NotFoundException(
          `Booking object with ID "${bookingObjectId}" not found.`
        );
      }

      if (bookingObject.availableUnits <= 0) {
        throw new ConflictException("No available units for this booking object.");
      }

      if (!(await this.isBookingAvailable(bookingObjectId, start, end))) {
        throw new ConflictException(
          "This booking object is already booked for the given dates."
        );
      }

      if (new Date(createBookingDto.startDate) >= new Date(createBookingDto.endDate)) {
        throw new ConflictException('The end date must be later than the start date.');
      }
      
      const booking = await this.bookingModel.create({
        bookingObjectId,
        startDate: start,
        endDate: end,
      });
      await bookingObject.decrement("availableUnits");

      return this.bookingModel.findByPk(booking.id, {
        include: [BookingObject],
      });
    } catch (e) {
      throw new InternalServerErrorException(
        "Booking creation failed. " + e.message
      );
    }
  }
  // -----------------------------------------------------------------------------------------
  async findAll(): Promise<Booking[]> {
    try {
      return await this.bookingModel.findAll({ include: { all: true } });
    } catch (e) {
      throw new InternalServerErrorException(
        "Error when retrieving the list of bookings. " + e.message
      );
    }
  }
  // -----------------------------------------------------------------------------------------
  async findOne(id: number): Promise<Booking> {
    try {
      const booking = await this.bookingModel.findByPk(id, {
        include: [BookingObject],
      });
      if (!booking) {
        throw new NotFoundException(
          `No booking with the identifier "${id}" was found.`
        );
      }
      return booking;
    } catch (e) {
      throw new InternalServerErrorException(
        `Error when searching for a booking with ID "${id}". ` + e.message
      );
    }
  }
  // -----------------------------------------------------------------------------------------
  async update(id: number, updateBookingDto: UpdateBookingDto): Promise<Booking> {
    try {
      const currentBooking = await this.bookingModel.findByPk(id, {
        include: [BookingObject],
      });
      if (!currentBooking) {
        throw new NotFoundException(`Booking with ID "${id}" not found.`);
      }
  
      const start = this.parseDateString(updateBookingDto.startDate);
      const end = this.parseDateString(updateBookingDto.endDate);
  
      if (!(await this.isBookingAvailable(currentBooking.bookingObjectId, start, end, id))) {
        throw new ConflictException("This object is already booked for the given dates.");
      }
  
      if (new Date(updateBookingDto.startDate) >= new Date(updateBookingDto.endDate)) {
        throw new ConflictException('The end date must be later than the start date.');
      }

      await currentBooking.update({ startDate: start, endDate: end });

      return currentBooking;
    } catch (e) {
      throw new InternalServerErrorException(`Error updating booking with ID "${id}". ` + e.message);
    }
  }
  // -----------------------------------------------------------------------------------------
  async remove(id: number): Promise<void> {
    try {
      const booking = await this.findOne(id);
      if (!booking) {
        throw new NotFoundException(`Booking with ID "${id}" not found.`);
      }
      await booking.bookingObject.increment('availableUnits');
      await booking.destroy();
    } catch (e) {
      throw new InternalServerErrorException(
        `Error when deleting a booking with ID "${id}". ` + e.message
      );
    }
  }
  // -----------------------------------------------------------------------------------------
  private parseDateString(dateString: string): Date {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  }
}
