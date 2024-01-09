/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from "class-validator";
import { IsCorrectDateFormat } from "../decorators/isCorrectDateFormat.decorator";

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  readonly bookingObjectId: number;

  @IsNotEmpty()
  @IsCorrectDateFormat()
  readonly startDate: string;

  @IsNotEmpty()
  @IsCorrectDateFormat()
  readonly endDate: string;
}
