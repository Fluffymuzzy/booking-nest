/* eslint-disable prettier/prettier */
import { Column, Model, Table, DataType } from "sequelize-typescript";

export enum BookingObjectType {
  HOTEL_ROOM = "HOTEL_ROOM",
  APARTMENT = "APARTMENT",
  CAR = "CAR",
}

@Table
export class BookingObject extends Model<BookingObject> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  availableUnits: number;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(BookingObjectType),
    allowNull: false,
  })
  type: BookingObjectType;
}
