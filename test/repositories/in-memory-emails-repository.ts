import { PaginationParams } from "@/core/repositories/pagination-params";
import { EmailsRepository } from "@/domain/application/repositories/emails-repository";
import { Email } from "@/domain/enterprise/entities/email";

export class InMemoryEmailsRepository implements EmailsRepository {
    public items: Email[] = []

    async findById(id: string): Promise<Email | null> {
        const email = this.items.find((item) => item.id.toString() === id)

        if (!email){
            return null
        }

        return email
    }

    async findManyByReceiverId(receiverId: string) {
        const emails = this.items
            .filter((item) => item.receiverId.toString() === receiverId)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        return emails
    }

    async findManyBySenderId(senderId: string): Promise<Email[]> {
        const emails = this.items
            .filter((item) => item.senderId.toString() === senderId)
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

        return emails
    }

    async create(email: Email): Promise<void> {
        this.items.push(email)
    }

    async delete(email: Email): Promise<void> {
        const itemIndex = this.items.findIndex((item) => item.id === email.id)

        this.items.splice(itemIndex, 1)
    }
}