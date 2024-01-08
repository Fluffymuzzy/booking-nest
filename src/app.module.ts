import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './database/providers/database.providers';
import { BookingObjectModule } from './booking-object/booking-object.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BookingObjectModule,
  ],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
