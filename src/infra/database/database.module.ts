import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaUsersRepository } from "./prisma/repositories/prisma-users-repository";
import { PrismaEmailsRepository } from "./prisma/repositories/prisma-emails-repository";

@Module({
  providers: [
    PrismaService,
    PrismaUsersRepository,
    PrismaEmailsRepository
  ],
  exports: [
    PrismaService,
    PrismaUsersRepository,
    PrismaEmailsRepository
  ],
})
export class DataBaseModule { }