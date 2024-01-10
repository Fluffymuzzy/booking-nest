/* eslint-disable prettier/prettier */
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
enum BookingObjectType {
  HOTEL_ROOM = "HOTEL_ROOM",
  APARTMENT = "APARTMENT",
  CAR = "CAR",
}

export class CreateBookingObjectDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Сar', description: 'Name of booking unit' })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Сar Info', description: 'Description of booking unit' })
  readonly description: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @ApiProperty({ example: 5, description: 'Number of available booking units' })
  readonly availableUnits: number;

  @IsNotEmpty()
  @ApiProperty({ example: 299, description: 'Price of booking unit' })
  readonly price: number;

  @IsEnum(BookingObjectType)
  @ApiProperty({
    example: BookingObjectType.CAR,
    description: 'The type of the booking object',
    enum: BookingObjectType,
  })
  readonly type: BookingObjectType;
}
