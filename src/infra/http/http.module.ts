import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { PrismaService } from "../database/prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "../env";
import { DataBaseModule } from "../database/database.module";

@Module({
  imports: [
    DataBaseModule,
    ConfigModule.forRoot({
      validate: env => envSchema.parse(env),
      isGlobal: true,
    })],
  controllers: [
    CreateAccountController,
  ]
})
export class HTTPModule { }