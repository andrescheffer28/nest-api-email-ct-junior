import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { DataBaseModule } from "../database/database.module";
import { RegisterUserUseCase } from "@/domain/application/use-cases/register-user";
import { CryptographyModule } from "../cryptography/cryptography.module";
import { AuthenticateController } from "./controllers/authenticate.controller";
import { AuthenticateUserUseCase } from "@/domain/application/use-cases/authenticate-user";
import { EditProfileImageController } from "./controllers/edit-profileImage.controller";
import { UpdateProfileImageUseCase } from "@/domain/application/use-cases/update-profile-image";
import { EditUserNameController } from "./controllers/edit-userName.controller";
import { UpdateUserNameUseCase } from "@/domain/application/use-cases/update-user-name";
import { SendEmailController } from "./controllers/send-email.controller";
import { SendEmailUseCase } from "@/domain/application/use-cases/send-email";
import { DeleteEmailController } from "./controllers/delete-email.controller";
import { DeleteEmailUseCase } from "@/domain/application/use-cases/delete-email";
import { FetchRecenteReceivedEmailsController } from "./controllers/fetch-recent-received-emails.controller";
import { EmailDetailsPresenter } from "./presenters/email-presenter-for-receiver";

@Module({
  imports: [
    DataBaseModule,
    CryptographyModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    EditProfileImageController,
    EditUserNameController,
    SendEmailController,
    DeleteEmailController,
    FetchRecenteReceivedEmailsController,
    EmailDetailsPresenter,
  ],
  providers: [
    RegisterUserUseCase,
    AuthenticateUserUseCase,
    UpdateProfileImageUseCase,
    UpdateUserNameUseCase,
    SendEmailUseCase,
    DeleteEmailUseCase,
  ]
})
export class HTTPModule { }