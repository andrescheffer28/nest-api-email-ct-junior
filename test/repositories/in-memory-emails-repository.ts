import { EmailsRepository } from '@/domain/application/repositories/emails-repository'
import { Email } from '@/domain/enterprise/entities/email'
import { EmailWithSenderReceiverNames } from '@/domain/enterprise/entities/value-objects/email-with-sender-receiver-names'
import { InMemoryUsersRepository } from './in-memory-users-repository'

export class InMemoryEmailsRepository implements EmailsRepository {
  public items: Email[] = []

  constructor(private usersRepository: InMemoryUsersRepository) { }

  async findById(id: string): Promise<Email | null> {
    const email = this.items.find((item) => item.id.toString() === id)

    if (!email) {
      return null
    }

    return email
  }

  async findManyByReceiverId(receiverId: string): Promise<EmailWithSenderReceiverNames[]> {
    const emails = this.items
      .filter((item) => item.receiverId.toString() === receiverId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return this.mapEmailsToDetails(emails)
  }

  async findManyBySenderId(senderId: string): Promise<EmailWithSenderReceiverNames[]> {
    const emails = this.items
      .filter((item) => item.senderId.toString() === senderId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return this.mapEmailsToDetails(emails)
  }

  async create(email: Email): Promise<void> {
    this.items.push(email)
  }

  async delete(email: Email): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === email.id)

    this.items.splice(itemIndex, 1)
  }

  private mapEmailsToDetails(emails: Email[]): EmailWithSenderReceiverNames[] {
    return emails.map((email) => {
      const sender = this.usersRepository.items.find((user) => user.id.equals(email.senderId))
      const receiver = this.usersRepository.items.find((user) => user.id.equals(email.receiverId))

      if (!sender || !receiver) {
        throw new Error('User not found in memory repository during mapping.')
      }

      return EmailWithSenderReceiverNames.create({
        emailId: email.id,
        title: email.title,
        content: email.content,
        createdAt: email.createdAt,
        isSeen: email.isSeen,
        senderId: email.senderId,
        senderName: sender.name,
        receiverId: email.receiverId,
        receiverName: receiver.name,
      })
    })
  }
}
