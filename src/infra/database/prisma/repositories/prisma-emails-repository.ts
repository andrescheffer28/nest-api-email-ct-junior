import { EmailsRepository } from "@/domain/application/repositories/emails-repository";
import { Email } from "@/domain/enterprise/entities/email";
import { Injectable } from "@nestjs/common";
import { PrismaEmailMapper } from "../mappers/prisma-email-mapper";
import { PrismaService } from "../prisma.service";

@Injectable()
export class PrismaEmailsRepository implements EmailsRepository {
  constructor(private prisma: PrismaService) { }

  async findById(id: string): Promise<Email | null> {
    const email = await this.prisma.email.findUnique({
      where: {
        id,
      }
    })

    if (!email) {
      return null
    }

    return PrismaEmailMapper.toDomain(email)
  }

  async findManyByReceiverId(receiverId: string): Promise<Email[]> {
    const emails = await this.prisma.email.findMany({
      where: {
        receiverId,
      }
    })

    return emails.map(PrismaEmailMapper.toDomain)
  }

  async findManyBySenderId(senderId: string): Promise<Email[]> {
    const emails = await this.prisma.email.findMany({
      where: {
        senderId,
      }
    })

    return emails.map(PrismaEmailMapper.toDomain)
  }

  async create(email: Email): Promise<void> {
    const data = PrismaEmailMapper.toPrisma(email)

    await this.prisma.email.create({
      data,
    })
  }

  async delete(email: Email): Promise<void> {
    const data = PrismaEmailMapper.toPrisma(email)

    await this.prisma.email.delete({
      where: {
        id: data.id,
      }
    })
  }

}