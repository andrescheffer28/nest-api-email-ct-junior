import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { DataBaseModule } from "../database/database.module";
import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";
import { CryptographyModule } from "../cryptography/cryptography.module";

@Module({
  imports: [
    DataBaseModule,
    CryptographyModule,
  ],
  controllers: [
    CreateAccountController,
  ],
  providers: [
    RegisterUserUseCase,
  ]
})
export class HTTPModule { }