/* eslint-disable prettier/prettier */
import { Sequelize } from "sequelize-typescript";
import { ConfigService } from "@nestjs/config";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: configService.get<string>("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get<string>("DATABASE_USERNAME"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
      });
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
