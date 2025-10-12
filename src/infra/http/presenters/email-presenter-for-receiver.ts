import { Email } from "@/domain/enterprise/entities/email";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailDetailsPresenter {
  constructor(private prisma: PrismaService) { }

  async toHTTP(email: Email) {

    const user = await this.prisma.user.findUnique({
      where: {
        id: email.id.toString(),
      }
    })

    return {
      title: email.title,
      enviado_para: user?.name,
      jaVisto: email.isSeen,
      email_id: email.id.toString(),
    }
  }
}