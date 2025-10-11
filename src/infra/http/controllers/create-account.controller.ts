import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  Body,
  ConflictException,
  Controller,
  Post,
  UsePipes,
} from '@nestjs/common'
import z from 'zod'
import { RegisterUserUseCase } from '@/domain/application/use-cases/register-user'

export const createAccountSchema = z
  .object({
    name: z.string(),
    profileImage: z.string(),
    email: z.email(),
    password: z.string(),
  })
  .required()

type CreateAccount = z.infer<typeof createAccountSchema>

@Controller('/login')
export class CreateAccountController {
  constructor(
    private createUser: RegisterUserUseCase,
  ) { }

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountSchema))
  async handle(@Body() body: CreateAccount) {
    const { name, profileImage, email, password } = body

    const result = await this.createUser.execute({
      name,
      email,
      profileImage: profileImage,
      password,
    })

    if (result.isLeft()) {
      throw new ConflictException(
        'User with same e-mail address already exists.'
      )
    }
  }
}
