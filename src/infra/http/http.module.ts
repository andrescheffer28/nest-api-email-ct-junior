import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { DataBaseModule } from "../database/database.module";
import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { AuthenticateUserUseCase } from "@/domain/application/use-cases/authenticate-user";

@Module({
  imports: [
    DataBaseModule,
    CryptographyModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
  ]
})
export class HTTPModule { }