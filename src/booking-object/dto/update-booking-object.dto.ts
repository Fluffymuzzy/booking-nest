/* eslint-disable prettier/prettier */
import { PartialType } from "@nestjs/swagger";
import { CreateBookingObjectDto } from "./create-booking-object.dto";

export class UpdateBookingObjectDto extends PartialType(CreateBookingObjectDto) {}