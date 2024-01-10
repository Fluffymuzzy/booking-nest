/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateBookingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "2024-01-10",
    description: "Start date of the booking",
  })
  readonly startDate: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: "2024-01-15",
    description: "End date of the booking",
  })
  readonly endDate: string;
}
