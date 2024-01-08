/* eslint-disable prettier/prettier */
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";
enum BookingObjectType {
  HOTEL_ROOM = "HOTEL_ROOM",
  APARTMENT = "APARTMENT",
  CAR = "CAR",
}

export class CreateBookingObjectDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly availableUnits: number;

  @IsNotEmpty()
  readonly price: number;

  @IsEnum(BookingObjectType)
  readonly type: BookingObjectType;
}
