import z from "zod"
import { ZodValidationPipe } from "../pipes/zod-validation-pipe"
import { BadRequestException, Body, Controller, HttpCode, Patch } from "@nestjs/common"
import { UpdateUserNameUseCase } from "@/domain/application/use-cases/update-user-name"
import { CurrentUser } from "@/infra/auth/current-user-decorator"
import type { TokenSchema } from "@/infra/auth/jwt.strategy"

const editUserNameBodySchema = z.object({
  userName: z.string(),
})

const bodyValidationPipe = new ZodValidationPipe(editUserNameBodySchema)

type EditUserNameBodySchema = z.infer<typeof editUserNameBodySchema>

@Controller('/my-name')
export class EditUserNameController {
  constructor(private editUserName: UpdateUserNameUseCase) { }

  @Patch()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditUserNameBodySchema,
    @CurrentUser() user: TokenSchema,
  ) {
    const { userName } = body
    const userId = user.sub
    const result = await this.editUserName.execute({
      userId,
      name: userName,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}