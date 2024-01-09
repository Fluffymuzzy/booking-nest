/* eslint-disable prettier/prettier */

import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsCorrectDateFormat(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsCorrectDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any): boolean {
          return typeof value === 'string' && /^\d{4}-[01]\d-[0-3]\d$/.test(value);
        },
        defaultMessage(): string {
          return `${propertyName} must be in YYYY-MM-DD format`;
        },
      },
    });
  };
}
