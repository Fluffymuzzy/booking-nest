/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from "class-validator";
import { IsCorrectDateFormat } from "../decorators/isCorrectDateFormat.decorator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty({
    description: 'The ID of the booking object',
    example: 1,
  })
  readonly bookingObjectId: number;

  @IsNotEmpty()
  @IsCorrectDateFormat()
  @ApiProperty({
    description: 'Start date of the booking in YYYY-MM-DD format',
    example: '2024-01-10',
  })
  readonly startDate: string;

  @IsNotEmpty()
  @IsCorrectDateFormat()
  @ApiProperty({
    description: 'End date of the booking in YYYY-MM-DD format',
    example: '2024-01-15',
  })
  readonly endDate: string;
}
