import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { DataBaseModule } from "../database/database.module";
import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { AuthenticateUserUseCase } from "@/domain/application/use-cases/authenticate-user";
import { EditProfileImageController } from "./controllers/edit-profileImage.controller";
import { UpdateProfileImageUseCase } from "@/domain/application/use-cases/update-profile-image";

@Module({
  imports: [
    DataBaseModule,
    CryptographyModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    EditProfileImageController,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    UpdateProfileImageUseCase,
  ]
})
export class HTTPModule { }