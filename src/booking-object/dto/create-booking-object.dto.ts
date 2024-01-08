/* eslint-disable prettier/prettier */
enum BookingObjectType {
  HOTEL_ROOM = 'HOTEL_ROOM',
  APARTMENT = 'APARTMENT',
  CAR = 'CAR',
}

export class CreateBookingObjectDto {
    readonly name: string;
    readonly description: string;
    readonly availableUnits: number;
    readonly price: number;
    readonly type: BookingObjectType;
  }
