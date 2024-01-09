/* eslint-disable prettier/prettier */
import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  BelongsTo,
} from 'sequelize-typescript';
import { BookingObject } from 'src/booking-object/model/booking-object.model';

@Table
export class Booking extends Model<Booking> {
  @ForeignKey(() => BookingObject)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bookingObjectId: number;

  @BelongsTo(() => BookingObject)
  bookingObject: BookingObject;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  endDate: Date;
}
