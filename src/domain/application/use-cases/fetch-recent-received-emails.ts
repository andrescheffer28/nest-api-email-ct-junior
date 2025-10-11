import { Either, right } from "@/core/either"
import { Email } from "@/domain/enterprise/entities/email"
import { EmailsRepository } from "../repositories/emails-repository"

interface FetchRecentReceivedEmailsUseCaseRequest {
    receiverId: string
}

type FetchRecentReceivedEmailsUseCaseResponse = Either<
    null,
    {
        emails: Email[]
    }
>

export class FetchRecentReceivedEmailsUseCase {
    constructor(
        private emailsRepository: EmailsRepository,
    ) {}

    async execute({
        receiverId,
    }: FetchRecentReceivedEmailsUseCaseRequest): Promise<FetchRecentReceivedEmailsUseCaseResponse> {

        const emails = await this.emailsRepository.findManyByReceiverId(receiverId)
        
        return right({
            emails,
        })
    }
}