import { Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Controller('/login')
@UseGuards(AuthGuard('jwt'))
export class AuthenticateUserController {
  constructor() { }

  @Post()
  async handle() {
    return 'ok'
  }
}
