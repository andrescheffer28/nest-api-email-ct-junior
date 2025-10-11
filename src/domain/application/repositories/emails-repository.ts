import { Email } from '@/domain/enterprise/entities/email'

export abstract class EmailsRepository {
  abstract findById(id: string): Promise<Email | null>
  abstract findManyByReceiverId(receiverId: string): Promise<Email[]>
  abstract findManyBySenderId(senderId: string): Promise<Email[]>
  abstract create(email: Email): Promise<void>
  abstract delete(email: Email): Promise<void>
}
